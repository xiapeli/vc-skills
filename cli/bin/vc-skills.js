#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const { GITHUB_RAW_BASE, TIERS, SKILLS_INDEX } = require('../lib/registry');
const { fetchUrl } = require('../lib/fetch');
const { copyToClipboard } = require('../lib/clipboard');
const { renderSkillsTable } = require('../lib/table');
const c = require('../lib/colors');

// ─── Parse CLI args ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const flags = new Set();
const positional = [];

for (const arg of args) {
  if (arg.startsWith('--')) {
    flags.add(arg.slice(2));
  } else if (arg.startsWith('-') && arg.length > 1) {
    flags.add(arg.slice(1));
  } else {
    positional.push(arg.toLowerCase());
  }
}

// ─── Help ────────────────────────────────────────────────────────────────────

if (flags.has('help') || flags.has('h')) {
  printHelp();
  process.exit(0);
}

// ─── Version ─────────────────────────────────────────────────────────────────

if (flags.has('version') || flags.has('v')) {
  const pkg = require('../package.json');
  console.log(`vc-skills v${pkg.version}`);
  process.exit(0);
}

// ─── Router ──────────────────────────────────────────────────────────────────

const command = positional[0] || 'list';

(async () => {
  try {
    if (command === 'list') {
      cmdList();
    } else if (command === 'benchmark') {
      await cmdFetchSkill('benchmark');
    } else if (SKILLS_INDEX[command]) {
      await cmdFetchSkill(command);
    } else {
      // Fuzzy suggestion
      const suggestion = findClosest(command);
      console.error('');
      console.error(`  ${c.red('Error:')} Unknown skill ${c.bold(`"${command}"`)}`);
      if (suggestion) {
        console.error(`  ${c.dim('Did you mean')} ${c.cyan(suggestion)}${c.dim('?')}`);
      }
      console.error(`  ${c.dim('Run')} ${c.cyan('npx vc-skills list')} ${c.dim('to see all available skills.')}`);
      console.error('');
      process.exit(1);
    }
  } catch (err) {
    console.error('');
    console.error(`  ${c.red('Error:')} ${err.message}`);
    console.error('');
    process.exit(1);
  }
})();

// ─── Commands ────────────────────────────────────────────────────────────────

function cmdList() {
  console.log(renderSkillsTable(TIERS));
}

async function cmdFetchSkill(name) {
  const skill = SKILLS_INDEX[name];
  if (!skill) {
    throw new Error(`Unknown skill: "${name}". Run "npx vc-skills list" to see available skills.`);
  }

  const url = `${GITHUB_RAW_BASE}${skill.path}.md`;

  console.log('');
  console.log(`  ${c.dim('Fetching')} ${skill.tier.color}${c.BOLD}${skill.name}${c.RESET} ${c.dim('from GitHub...')}`);

  const content = await fetchUrl(url);

  if (!content || content.trim().length === 0) {
    throw new Error('Received empty content from GitHub.');
  }

  const sizeKb = (Buffer.byteLength(content, 'utf-8') / 1024).toFixed(1);

  // --claude-code: install as Claude Code custom command
  if (flags.has('claude-code')) {
    const cmdDir = path.join(os.homedir(), '.claude', 'commands');
    const cmdFile = path.join(cmdDir, `vc-${name}.md`);

    fs.mkdirSync(cmdDir, { recursive: true });
    fs.writeFileSync(cmdFile, content, 'utf-8');

    console.log(`  ${c.green('Installed')} as Claude Code command`);
    console.log(`  ${c.dim('File:')} ${cmdFile}`);
    console.log(`  ${c.dim('Use:')}  ${c.cyan(`/vc-${name}`)} ${c.dim('in Claude Code')}`);
    console.log(`  ${c.dim('Size:')} ${sizeKb} KB`);
    console.log('');
    return;
  }

  // --cursor: save to .cursor/rules/
  if (flags.has('cursor')) {
    const cursorDir = path.join(process.cwd(), '.cursor', 'rules');
    const cursorFile = path.join(cursorDir, `vc-${name}.md`);

    fs.mkdirSync(cursorDir, { recursive: true });
    fs.writeFileSync(cursorFile, content, 'utf-8');

    console.log(`  ${c.green('Saved')} to Cursor rules`);
    console.log(`  ${c.dim('File:')} ${cursorFile}`);
    console.log(`  ${c.dim('Size:')} ${sizeKb} KB`);
    console.log('');
    return;
  }

  // --save: save as local .md file
  if (flags.has('save')) {
    const fileName = `vc-${name}.md`;
    const filePath = path.join(process.cwd(), fileName);

    fs.writeFileSync(filePath, content, 'utf-8');

    console.log(`  ${c.green('Saved')} ${fileName}`);
    console.log(`  ${c.dim('File:')} ${filePath}`);
    console.log(`  ${c.dim('Size:')} ${sizeKb} KB`);
    console.log('');
    return;
  }

  // Default: copy to clipboard
  try {
    copyToClipboard(content);
    console.log(`  ${c.green('Copied to clipboard')} ${c.dim(`(${sizeKb} KB)`)}`);
    console.log(`  ${c.dim('Paste into your AI assistant, system prompt, or editor.')}`);
    console.log('');
  } catch (clipErr) {
    // Fallback: if clipboard fails, save to file and inform user
    const fallbackFile = path.join(process.cwd(), `vc-${name}.md`);
    fs.writeFileSync(fallbackFile, content, 'utf-8');
    console.error(`  ${c.yellow('Warning:')} ${clipErr.message}`);
    console.log(`  ${c.green('Saved')} to ${fallbackFile} instead.`);
    console.log('');
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function printHelp() {
  console.log(`
  ${c.bold('vc-skills')} ${c.dim('— VC investor personas for AI coding assistants')}

  ${c.bold('USAGE')}

    ${c.cyan('npx vc-skills')}                       List all available skills
    ${c.cyan('npx vc-skills <name>')}                 Copy skill to clipboard
    ${c.cyan('npx vc-skills <name> --save')}          Save as vc-<name>.md file
    ${c.cyan('npx vc-skills <name> --claude-code')}   Install as Claude Code command
    ${c.cyan('npx vc-skills <name> --cursor')}        Save to .cursor/rules/

  ${c.bold('EXAMPLES')}

    ${c.dim('$')} npx vc-skills sequoia             ${c.dim('# Copy Sequoia persona to clipboard')}
    ${c.dim('$')} npx vc-skills yc --claude-code    ${c.dim('# Install as /vc-yc command')}
    ${c.dim('$')} npx vc-skills latam-vc --cursor   ${c.dim('# Add to Cursor rules')}
    ${c.dim('$')} npx vc-skills benchmark           ${c.dim('# Benchmark/meta-evaluation skill')}

  ${c.bold('OPTIONS')}

    --save          Save skill as a local .md file
    --claude-code   Install to ~/.claude/commands/vc-<name>.md
    --cursor        Save to .cursor/rules/vc-<name>.md
    -h, --help      Show this help
    -v, --version   Show version

  ${c.bold('SKILLS')}

    Run ${c.cyan('npx vc-skills list')} to see all 22 available skills.
`);
}

/**
 * Simple Levenshtein-based closest match for typo correction.
 */
function findClosest(input) {
  const allNames = Object.keys(SKILLS_INDEX);
  let best = null;
  let bestDist = Infinity;

  for (const name of allNames) {
    const d = levenshtein(input, name);
    if (d < bestDist) {
      bestDist = d;
      best = name;
    }
  }

  // Only suggest if within 3 edits
  return bestDist <= 3 ? best : null;
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
}
