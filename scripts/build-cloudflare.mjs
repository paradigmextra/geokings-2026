import fs from 'node:fs';
import path from 'node:path';
import { syncBuiltinESMExports } from 'node:module';
import { fileURLToPath } from 'node:url';

// OpenNext copies Next's directory links as ordinary symlinks. On Windows,
// junctions keep generated builds usable without administrator/developer mode.
if (process.platform === 'win32') {
  const original = fs.symlinkSync;
  const workspace = process.cwd();
  const generated = ['.open-next', '.next'].map(folder => path.join(workspace, folder) + path.sep);
  fs.symlinkSync = (target, destination, type) => {
    const resolvedDestination = path.resolve(String(destination));
    const resolvedTarget = path.resolve(path.dirname(resolvedDestination), String(target));
    if (generated.some(root => resolvedDestination.startsWith(root)) && fs.existsSync(resolvedTarget)) {
      if (fs.statSync(resolvedTarget).isDirectory()) return original(resolvedTarget, destination, 'junction');
      return fs.copyFileSync(resolvedTarget, destination, fs.constants.COPYFILE_EXCL);
    }
    return original(target, destination, type);
  };
  syncBuiltinESMExports();
}
const cli = new URL('../node_modules/@opennextjs/cloudflare/dist/cli/index.js', import.meta.url);
process.argv = [process.execPath, fileURLToPath(cli), 'build', ...process.argv.slice(2)];
await import(cli.href);
