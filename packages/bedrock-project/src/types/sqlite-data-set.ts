import { Identifiable, Locatable } from 'bc-minecraft-bedrock-shared';
import initSqlJs, { Database } from 'sql.js';
import { DataSetBase } from './data-set';
import { IDataSet } from './i-data-set';

/**
 * A drop-in replacement for `DataSet<T>` backed by an in-memory SQLite database
 * (sql.js, SQLite compiled to WASM). Works on all platforms including vscode.dev
 * (browser/web extension) with no native binaries.
 *
 * Schema (one table per dataset):
 * ```sql
 * CREATE TABLE <tableName> (
 *   id   TEXT PRIMARY KEY,
 *   uri  TEXT NOT NULL,
 *   data TEXT NOT NULL
 * );
 * CREATE INDEX idx_<tableName>_uri ON <tableName>(uri);
 * ```
 *
 * The full typed object is serialised as JSON in the `data` column.
 * The `id` and `uri` columns are stored separately so that `deleteFile`
 * and `deleteFolder` can use efficient SQL `WHERE` clauses instead of
 * iterating every row.
 */
export class SqliteDataSet<T extends Identifiable & Locatable> implements DataSetBase, IDataSet<T> {
  private _db: Database;
  private _table: string;

  /** Use {@link SqliteDataSet.create} instead of calling this directly. */
  private constructor(db: Database, table: string) {
    this._db = db;
    this._table = table;
  }

  /**
   * Async factory — creates (or reuses) a table in the given SQLite database
   * and returns a ready-to-use `SqliteDataSet<T>`.
   *
   * @param tableName  Name for the SQLite table (e.g. `'bp_entities'`).
   * @param db         Optional: share a single `Database` instance across
   *                   multiple datasets.  If omitted a new in-memory DB is
   *                   created for this dataset.
   *
   * @example
   * ```ts
   * const entities = await SqliteDataSet.create<BpEntity>('bp_entities');
   * ```
   */
  static async create<T extends Identifiable & Locatable>(
    tableName: string,
    db?: Database,
  ): Promise<SqliteDataSet<T>> {
    if (!db) {
      // Initialise sql.js — no `locateFile` override needed for Node.js / Jest;
      // the default loader resolves the WASM binary from node_modules automatically.
      const SQL = await initSqlJs();
      db = new SQL.Database();
    }

    // Create the table and URI index if they don't exist yet.
    db.run(`
      CREATE TABLE IF NOT EXISTS "${tableName}" (
        id   TEXT PRIMARY KEY,
        uri  TEXT NOT NULL,
        data TEXT NOT NULL
      )
    `);
    db.run(`
      CREATE INDEX IF NOT EXISTS "idx_${tableName}_uri"
      ON "${tableName}"(uri)
    `);

    return new SqliteDataSet<T>(db, tableName);
  }

  // ── DataSetBase ─────────────────────────────────────────────────────────────

  /** Removes every row from the table. */
  clear(): void {
    this._db.run(`DELETE FROM "${this._table}"`);
  }

  /**
   * Removes the item with the given id.
   * @returns `true` if a row was deleted, `false` if the id was not found.
   */
  delete(key: string | Identifiable): boolean {
    const id = Identifiable.getId(key);
    this._db.run(`DELETE FROM "${this._table}" WHERE id = ?`, [id]);
    // `getRowsModified()` returns the number of rows changed by the last statement.
    return this._db.getRowsModified() > 0;
  }

  /**
   * Removes all items that were loaded from the given file URI.
   * Equivalent to `DELETE WHERE uri = ?`.
   * @returns `true` if at least one row was deleted.
   */
  deleteFile(uri: string): boolean {
    this._db.run(`DELETE FROM "${this._table}" WHERE uri = ?`, [uri]);
    return this._db.getRowsModified() > 0;
  }

  /**
   * Removes all items whose `location.uri` starts with the given folder URI.
   * Implemented as `DELETE WHERE uri LIKE ? || '%'`.
   *
   * This mirrors the behaviour of `DataSet.deleteFolder` and is safe for file
   * URIs because they don't contain SQL wildcard characters (`%` or `_`).
   * @returns `true` if at least one row was deleted.
   */
  deleteFolder(uri: string): boolean {
    this._db.run(`DELETE FROM "${this._table}" WHERE uri LIKE ? || '%'`, [uri]);
    return this._db.getRowsModified() > 0;
  }

  /** Returns `true` if an item with the given id exists in the dataset. */
  has(key: string | Identifiable): boolean {
    const id = Identifiable.getId(key);
    const result = this._db.exec(`SELECT 1 FROM "${this._table}" WHERE id = ? LIMIT 1`, [id]);
    return result.length > 0 && result[0].values.length > 0;
  }

  // ── IDataSet<T> ─────────────────────────────────────────────────────────────

  /**
   * Retrieves the item with the given id, deserialised from JSON.
   * Returns `undefined` if no matching row exists.
   */
  get(key: string | Identifiable): T | undefined {
    const id = Identifiable.getId(key);
    const result = this._db.exec(`SELECT data FROM "${this._table}" WHERE id = ? LIMIT 1`, [id]);
    if (result.length === 0 || result[0].values.length === 0) return undefined;
    return JSON.parse(result[0].values[0][0] as string) as T;
  }

  /**
   * Iterates over every item in the dataset.
   * @param callbackfn Called for each deserialised item.
   * @param thisArg    Optional `this` context for the callback.
   */
  forEach(callbackfn: (value: T) => void, thisArg?: any): void {
    const result = this._db.exec(`SELECT data FROM "${this._table}"`);
    if (result.length === 0) return;
    for (const row of result[0].values) {
      callbackfn.call(thisArg, JSON.parse(row[0] as string) as T);
    }
  }

  /**
   * Returns the first item for which `predicate` returns `true`, or `undefined`.
   * @param predicate Receives each deserialised item and its id string.
   */
  find(predicate: (value: T, key: string) => boolean): T | undefined {
    const result = this._db.exec(`SELECT id, data FROM "${this._table}"`);
    if (result.length === 0) return undefined;
    for (const row of result[0].values) {
      const id = row[0] as string;
      const item = JSON.parse(row[1] as string) as T;
      if (predicate(item, id)) return item;
    }
    return undefined;
  }

  // ── Extra (matches DataSet<T>) ───────────────────────────────────────────────

  /**
   * Inserts or replaces one or more items.
   * Uses `INSERT OR REPLACE` so duplicate ids overwrite the previous value (upsert).
   *
   * @param value A single item, an array of items, or `undefined` (no-op).
   * @returns `this` for method chaining.
   */
  set(value: T | T[] | undefined): this {
    if (!value) return this;

    const items = Array.isArray(value) ? value : [value];
    for (const item of items) {
      this._db.run(
        `INSERT OR REPLACE INTO "${this._table}" (id, uri, data) VALUES (?, ?, ?)`,
        [item.id, item.location.uri, JSON.stringify(item)],
      );
    }
    return this;
  }

  /** Returns the total number of items currently stored in the dataset. */
  count(): number {
    const result = this._db.exec(`SELECT COUNT(*) FROM "${this._table}"`);
    if (result.length === 0) return 0;
    return result[0].values[0][0] as number;
  }
}
