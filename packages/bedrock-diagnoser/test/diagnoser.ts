import { TextDocument } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { MCProject } from "bc-minecraft-project";
import {
  DiagnosticsBuilderContent,
  DiagnosticSeverity,
  DocumentDiagnosticsBuilder,
  ManagedDiagnosticsBuilder,
} from "../src/types";
import { TestProjectData } from "./testprojectdata";

export interface Error {
  position: Types.DocumentLocation;
  message: string;
  severity: DiagnosticSeverity;
  code: string | number;
}

export class TestDiagnoser<T extends TextDocument = TextDocument> implements ManagedDiagnosticsBuilder<T> {
  public items: Error[];

  public context: DiagnosticsBuilderContent<T>;
  public project: MCProject;
  public doneMark: boolean;

  constructor(
    context: DiagnosticsBuilderContent<T> | undefined = undefined,
    project: MCProject | undefined = undefined
  ) {
    this.doneMark = false;
    this.context = context ?? TestProjectData.createContext();
    this.project = project ?? MCProject.createEmpty();
    this.items = [];
  }

  done(): void {
    this.doneMark = true;
  }

  /**
   *
   * @param position
   * @param message
   * @param severity
   * @param code
   */
  add(position: Types.DocumentLocation, message: string, severity: DiagnosticSeverity, code: string | number): void {
    this.items.push({
      code: code,
      message: message,
      position: position,
      severity: severity,
    });
  }

  expectDone(): void {
    expect(this.doneMark).toBeDefined();
  }

  /**
   *
   */
  expectEmpty(): void {
    expect(this.items).toHaveLength(0);
  }

  expectAny(): void {
    expect(this.items).not.toHaveLength(0);
  }

  /**
   *
   * @param number
   */
  expectAmount(number: number): void {
    expect(this.items).toHaveLength(number);
  }

  /**
   *
   * @param number
   */
  expectGreaterThan(number: number): void {
    expect(this.items.length).toBeGreaterThan(number);
  }

  /**
   *
   * @param number
   */
  expectGreaterThanOrEqual(number: number): void {
    expect(this.items.length).toBeGreaterThanOrEqual(number);
  }

  writeItemsMessage(): string {
    let out = "";

    this.items.forEach((item) => {
      out += `\t\t[${DiagnosticSeverity[item.severity]}: ${item.position}] ${item.message} (${item.code})\n`;
    });

    return out;
  }

  /**Gets the first matching message
   * @param message
   * @returns*/
  getMessage(message: string): Error | undefined {
    for (let I = 0; I < this.items.length; I++) {
      const elem = this.items[I];

      if (elem.message === message) return elem;
    }

    return undefined;
  }

  /**Gets the first matching position
   * @param message
   * @returns*/
  getPosition(position: Types.DocumentLocation): Error | undefined {
    for (let I = 0; I < this.items.length; I++) {
      const elem = this.items[I];

      if (elem.position === position) return elem;
    }

    return undefined;
  }

  /**Gets the first matching severity
   * @param message
   * @returns*/
  getSeverity(severity: DiagnosticSeverity): Error | undefined {
    for (let I = 0; I < this.items.length; I++) {
      const elem = this.items[I];

      if (elem.severity === severity) return elem;
    }

    return undefined;
  }

  /**Gets the first matching code
   * @param message
   * @returns*/
  getCode(code: string | number): Error | undefined {
    for (let I = 0; I < this.items.length; I++) {
      const elem = this.items[I];

      if (elem.code === code) return elem;
    }

    return undefined;
  }

  /**Checks if the message is inside the internal list
   * @param message
   * @returns
   */
  hasMessage(message: string): boolean {
    return this.getMessage(message) !== undefined;
  }

  /**Checks if the position is inside the internal list
   * @param position
   * @returns
   */
  hasPosition(position: Types.DocumentLocation): boolean {
    return this.getPosition(position) !== undefined;
  }

  /**Checks if the severity is inside the internal list
   * @param message
   * @returns
   */
  hasSeverity(severity: DiagnosticSeverity): boolean {
    return this.getSeverity(severity) !== undefined;
  }

  /**Checks if the code is inside the internal list
   * @param message
   * @returns
   */
  hasCode(code: string | number): boolean {
    return this.getCode(code) !== undefined;
  }
}

export class TestDocumentDiagnoser<T extends TextDocument = TextDocument>
  extends TestDiagnoser<T>
  implements DocumentDiagnosticsBuilder<T>
{
  public document: T;

  constructor(
    document: T,
    context: DiagnosticsBuilderContent<T> | undefined = undefined,
    project: MCProject | undefined = undefined
  ) {
    super(context, project);
    this.document = document;
  }
}

export namespace TestDiagnoser {
  export function create(files: Map<string, string> | undefined = undefined): TestDiagnoser {
    const context = TestProjectData.createContext(files);

    return new TestDiagnoser(context, undefined);
  }

  export function createDocument(
    files: Map<string, string> | undefined,
    document: TextDocument
  ): TestDocumentDiagnoser {
    const context = TestProjectData.createContext(files);

    return new TestDocumentDiagnoser(document, context, undefined);
  }

  export function emptyContext(files: Map<string, string> | undefined = undefined): DiagnosticsBuilderContent {
    return TestProjectData.createContext(files);
  }
}
