#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const { TIERS } = require(path.join(ROOT, 'cli/lib/registry.js'));

const PLUGINS_DIR = path.join(ROOT, 'plugins');
const MARKETPLACE_FILE = path.join(ROOT, '.claude-plugin/marketplace.json');

const REPO_URL = 'https://github.com/xiapeli/vc-skills';
const VERSION = '1.0.0';

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(file, obj) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n');
}

function writeFile(file, contents) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, contents);
}

function buildSkillBody(skill) {
  const sourceMd = path.join(ROOT, 'skills', skill.path + '.md');
  const raw = fs.readFileSync(sourceMd, 'utf8');
  const frontmatter = [
    '---',
    `name: ${skill.name}`,
    `description: ${skill.desc}`,
    `version: ${VERSION}`,
    '---',
    '',
  ].join('\n');
  return frontmatter + raw;
}

function buildPlugin(skill, tier) {
  const pluginDir = path.join(PLUGINS_DIR, skill.name);
  const skillDir = path.join(pluginDir, 'skills', skill.name);

  writeJson(path.join(pluginDir, '.claude-plugin/plugin.json'), {
    name: skill.name,
    version: VERSION,
    description: `${skill.firm} — ${skill.desc}`,
    author: { name: 'xiapeli', url: REPO_URL },
    homepage: REPO_URL,
    repository: REPO_URL,
    license: 'MIT',
    keywords: ['vc', 'venture-capital', 'investor-simulation', tier.id, skill.name],
  });

  writeFile(path.join(skillDir, 'SKILL.md'), buildSkillBody(skill));
}

function buildMarketplace(allSkills) {
  const plugins = allSkills.map(({ skill, tier }) => ({
    name: skill.name,
    source: `./plugins/${skill.name}`,
    description: `${skill.firm} — ${skill.desc}`,
    version: VERSION,
    category: tier.id,
    tags: ['vc', tier.id, skill.name],
  }));

  writeJson(MARKETPLACE_FILE, {
    name: 'vc-skills',
    description: 'VC investor persona simulators for Claude Code — pitch to AI VCs before you pitch for real.',
    owner: { name: 'xiapeli', url: REPO_URL },
    metadata: {
      version: VERSION,
      homepage: 'https://vc-skills.gogrowth.me',
      repository: REPO_URL,
    },
    plugins,
  });
}

function main() {
  // Wipe and rebuild plugins/ for idempotency
  fs.rmSync(PLUGINS_DIR, { recursive: true, force: true });
  ensureDir(PLUGINS_DIR);

  const all = [];
  for (const tier of TIERS) {
    for (const skill of tier.skills) {
      buildPlugin(skill, tier);
      all.push({ skill, tier });
    }
  }
  buildMarketplace(all);
  console.log(`Built ${all.length} plugins and marketplace.json`);
}

main();
