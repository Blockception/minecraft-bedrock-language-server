import { ExtensionContext } from 'vscode';
import * as Create from './create-templates';
import * as Errors from './open-lastest';
import * as ExportPack from './export-pack';
import * as Language from './languages';
import * as ShowVanillaFile from './show-vanilla-file';
import * as ShowDocs from './show-docs';
import * as FillIdByName from './fill-id-by-name';

export function setupCommands(context: ExtensionContext): void {
  Create.activate(context);
  Errors.activate(context);
  ExportPack.activate(context);
  Language.activate(context);
  ShowVanillaFile.activate(context);
  ShowDocs.activate(context);
  FillIdByName.activate(context);
}
