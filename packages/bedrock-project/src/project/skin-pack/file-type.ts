import path from "path";

/** */
export enum FileType {
  /** */
  manifest,
  /** */
  skins,
  /** */
  texture,
  /** */
  unknown,
}

/** */
export namespace FileType {
  /**Detects resource pack resource, already assumed the path belongs to a resource pack
   * @param uri the decoded uri, expects slashes to be '/'*/
  export function detect(uri: string): FileType {
    //Folders
    if (uri.endsWith(".png")) return FileType.texture;

    const filename = path.basename(uri);

    switch (filename) {
      case "manifest.json":
        return FileType.manifest;

      case "skins.json":
        return FileType.skins;
    }

    return FileType.unknown;
  }
}
