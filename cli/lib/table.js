'use strict';

const c = require('./colors');

/**
 * Render a beautiful terminal table of all skills grouped by tier.
 */
function renderSkillsTable(tiers) {
  const lines = [];

  lines.push('');
  lines.push(c.bold('  VC Skills') + c.dim(' — Venture Capital investor personas for AI coding assistants'));
  lines.push(c.dim('  https://github.com/xiapeli/vc-skills'));
  lines.push('');

  // Column widths
  const COL_NAME = 22;
  const COL_FIRM = 30;
  const COL_DESC = 58;

  for (const tier of tiers) {
    // Tier header
    lines.push(`  ${tier.color}${c.BOLD}${tier.label}${c.RESET}`);
    lines.push(`  ${c.GRAY}${'─'.repeat(COL_NAME + COL_FIRM + COL_DESC + 4)}${c.RESET}`);

    // Header row
    lines.push(
      `  ${c.BOLD}${pad('Skill', COL_NAME)}${pad('Firm / Type', COL_FIRM)}${pad('Description', COL_DESC)}${c.RESET}`
    );

    for (const skill of tier.skills) {
      const nameStr = `${tier.color}${skill.name}${c.RESET}`;
      const firmStr = c.dim(skill.firm);
      const descStr = truncate(skill.desc, COL_DESC);

      // We need to account for ANSI codes in padding
      const namePadded = nameStr + ' '.repeat(Math.max(0, COL_NAME - skill.name.length));
      const firmPadded = firmStr + ' '.repeat(Math.max(0, COL_FIRM - skill.firm.length));

      lines.push(`  ${namePadded}${firmPadded}${descStr}`);
    }

    lines.push('');
  }

  // Usage footer
  lines.push(c.dim('  Usage:'));
  lines.push(`    ${c.cyan('npx vc-skills <name>')}              ${c.dim('Copy skill to clipboard')}`);
  lines.push(`    ${c.cyan('npx vc-skills <name> --save')}        ${c.dim('Save as .md file')}`);
  lines.push(`    ${c.cyan('npx vc-skills <name> --claude-code')}  ${c.dim('Install as Claude Code command')}`);
  lines.push(`    ${c.cyan('npx vc-skills <name> --cursor')}      ${c.dim('Save to .cursor/rules/')}`);
  lines.push('');

  return lines.join('\n');
}

function pad(str, width) {
  return str + ' '.repeat(Math.max(0, width - str.length));
}

function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1) + '\u2026';
}

module.exports = { renderSkillsTable };
