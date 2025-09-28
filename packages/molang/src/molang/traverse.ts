import { isMolangType, MolangType } from "./functions";

/**
 * Traverses the object and returns all the molang strings
 * @param obj The object to traverse
 * @param callbackfn The callback to call when a molang string is found
 */
export function traverse(
  obj: any,
  callbackfn: (molang: string, type: MolangType, path: string) => void,
  path: string = "$"
): void {
  if (!path.endsWith("/")) path += "/";

  switch (typeof obj) {
    default:
      return;

    case "string":
      return StringCheck(obj, callbackfn, path);

    case "object":
      if (Array.isArray(obj)) {
        for (let I = 0; I < obj.length; I++) {
          traverse(obj[I], callbackfn, path + I);
        }
      } else {
        const keys = Object.getOwnPropertyNames(obj);

        for (let I = 0; I < keys.length; I++) {
          const k = keys[I];
          traverse(obj[k], callbackfn, path + k);
        }
      }
  }
}

/** */
function StringCheck(
  data: string,
  callbackfn: (molang: string, type: MolangType, path: string) => void,
  path: string = ""
): void {
  const type = isMolangType(data);

  if (type !== MolangType.unknown) callbackfn(data, type, path);
}
