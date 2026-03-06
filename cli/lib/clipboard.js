'use strict';

const { execSync } = require('child_process');
const os = require('os');

/**
 * Copy text to the system clipboard.
 * Uses platform-native commands — zero dependencies.
 *
 * @param {string} text
 * @throws {Error} if clipboard command fails or platform is unsupported
 */
function copyToClipboard(text) {
  const platform = os.platform();

  let cmd;
  if (platform === 'darwin') {
    cmd = 'pbcopy';
  } else if (platform === 'linux') {
    // Try xclip first, fall back to xsel
    try {
      execSync('which xclip', { stdio: 'ignore' });
      cmd = 'xclip -selection clipboard';
    } catch {
      try {
        execSync('which xsel', { stdio: 'ignore' });
        cmd = 'xsel --clipboard --input';
      } catch {
        throw new Error(
          'Clipboard not available. Install xclip or xsel:\n' +
          '  Ubuntu/Debian: sudo apt install xclip\n' +
          '  Fedora: sudo dnf install xclip'
        );
      }
    }
  } else if (platform === 'win32') {
    cmd = 'clip';
  } else {
    throw new Error(`Unsupported platform for clipboard: ${platform}`);
  }

  try {
    execSync(cmd, { input: text, stdio: ['pipe', 'ignore', 'ignore'] });
  } catch (err) {
    throw new Error(`Failed to copy to clipboard: ${err.message}`);
  }
}

module.exports = { copyToClipboard };
