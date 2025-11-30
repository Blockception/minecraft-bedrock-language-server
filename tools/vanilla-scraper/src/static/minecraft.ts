import * as fs from 'fs';
import * as path from 'path';

/**
 * Get Minecraft installation folder (Windows only)
 */
export function installationFolder(): string | null {
  const windowsApps = 'C:\\Program Files\\WindowsApps\\';
  if (!fs.existsSync(windowsApps)) {
    return null;
  }

  try {
    const directories = fs.readdirSync(windowsApps).filter((dir) => dir.startsWith('Microsoft.Minecraft'));

    if (directories.length >= 1) {
      return path.join(windowsApps, directories[0]);
    }
  } catch {
    // Ignore permission errors
  }

  return null;
}

/**
 * Get Minecraft Education Edition installation folder (Windows only)
 */
export function eduInstallationFolder(): string | null {
  const eduFolder = 'C:\\Program Files (x86)\\Microsoft Studios\\Minecraft Education Edition\\';
  if (fs.existsSync(eduFolder)) {
    return eduFolder;
  }
  return null;
}
