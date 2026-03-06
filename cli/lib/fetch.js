'use strict';

const https = require('https');
const http = require('http');

/**
 * Fetch a URL and return the response body as a string.
 * Follows redirects (up to 5). Zero dependencies.
 *
 * @param {string} url
 * @param {number} [maxRedirects=5]
 * @returns {Promise<string>}
 */
function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects < 0) {
      return reject(new Error('Too many redirects'));
    }

    const lib = url.startsWith('https') ? https : http;

    const req = lib.get(url, { timeout: 15000 }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).toString();
        return fetchUrl(redirectUrl, maxRedirects - 1).then(resolve, reject);
      }

      if (res.statusCode === 404) {
        return reject(new Error('Skill not found on GitHub (404). Check if the skill name is correct.'));
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} from GitHub`));
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      res.on('error', reject);
    });

    req.on('error', (err) => {
      if (err.code === 'ENOTFOUND') {
        reject(new Error('Network error: cannot reach GitHub. Check your internet connection.'));
      } else if (err.code === 'ETIMEDOUT' || err.code === 'ESOCKETTIMEDOUT') {
        reject(new Error('Request timed out trying to reach GitHub.'));
      } else {
        reject(err);
      }
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out after 15 seconds.'));
    });
  });
}

module.exports = { fetchUrl };
