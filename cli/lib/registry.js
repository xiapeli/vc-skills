'use strict';

/**
 * Skills registry — all 28 VC persona skills organized by tier.
 *
 * Each entry maps a short CLI name to its GitHub path fragment and metadata.
 * The GitHub raw URL is constructed as:
 *   BASE_URL + path + ".md"
 */

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/xiapeli/vc-skills/main/skills/';

const TIERS = [
  {
    id: 'tier1',
    label: 'Tier 1 — Elite VC Firms',
    color: '\x1b[33m', // yellow / gold
    skills: [
      { name: 'sequoia',        path: 'tier1-vcs/sequoia',        firm: 'Sequoia Capital',      desc: 'Pattern-matching legendary operator who built category-defining companies' },
      { name: 'a16z',           path: 'tier1-vcs/a16z',           firm: 'Andreessen Horowitz',   desc: 'Software-is-eating-the-world thesis with deep technical conviction' },
      { name: 'yc',             path: 'tier1-vcs/yc',             firm: 'Y Combinator',          desc: 'Make something people want — relentless focus on product-market fit' },
      { name: 'benchmark',      path: 'tier1-vcs/benchmark',      firm: 'Benchmark Capital',     desc: 'Equal-partnership model with contrarian board-level operator mentality' },
      { name: 'founders-fund',  path: 'tier1-vcs/founders-fund',  firm: 'Founders Fund',         desc: 'Thielian definite optimism — back bold frontier-tech bets' },
      { name: 'accel',          path: 'tier1-vcs/accel',          firm: 'Accel',                 desc: 'Early mover in SaaS and global expansion with prepared-mind investing' },
      { name: 'lightspeed',     path: 'tier1-vcs/lightspeed',     firm: 'Lightspeed Venture Partners', desc: 'Multi-stage global investor with enterprise and consumer conviction' },
      { name: 'tiger-global',   path: 'tier1-vcs/tiger-global',   firm: 'Tiger Global',          desc: 'Data-driven velocity investor scaling winners across public and private markets' },
      { name: 'bessemer',       path: 'tier1-vcs/bessemer',       firm: 'Bessemer Venture Partners', desc: 'Cloud computing thesis pioneer with rigorous anti-portfolio honesty' },
      { name: 'greylock',       path: 'tier1-vcs/greylock',       firm: 'Greylock Partners',     desc: 'Network-effects thesis investor building platforms that compound' },
      { name: 'kaszek',        path: 'tier1-vcs/kaszek',        firm: 'Kaszek Ventures',       desc: 'LatAm-native VC from MercadoLibre founders — operator-first, $3B+ AUM' },
      { name: 'softbank-latam', path: 'tier1-vcs/softbank-latam', firm: 'SoftBank Latin America', desc: 'AI-first LatAm growth investor — big checks, category leaders, post-2022 discipline' },
    ],
  },
  {
    id: 'tier2',
    label: 'Tier 2 — Investor Archetypes',
    color: '\x1b[36m', // cyan
    skills: [
      { name: 'operator-vc',  path: 'tier2-archetypes/operator-vc',  firm: 'Archetype',  desc: 'Former founder/exec who evaluates through operational lens' },
      { name: 'finance-vc',   path: 'tier2-archetypes/finance-vc',   firm: 'Archetype',  desc: 'Wall Street rigor applied to venture — unit economics and LTV/CAC obsessed' },
      { name: 'product-vc',   path: 'tier2-archetypes/product-vc',   firm: 'Archetype',  desc: 'Product intuition first — evaluates UX, retention loops, and user delight' },
      { name: 'network-vc',   path: 'tier2-archetypes/network-vc',   firm: 'Archetype',  desc: 'Connector who evaluates deals through ecosystem and relationship leverage' },
      { name: 'thesis-vc',    path: 'tier2-archetypes/thesis-vc',    firm: 'Archetype',  desc: 'Deep research investor with sector-specific conviction and published theses' },
      { name: 'impact-investor', path: 'tier2-archetypes/impact-investor', firm: 'Archetype', desc: 'Dual mandate — market-rate returns AND measurable social/environmental impact' },
    ],
  },
  {
    id: 'tier3',
    label: 'Tier 3 — Investment Stages',
    color: '\x1b[35m', // magenta
    skills: [
      { name: 'pre-seed-angel',    path: 'tier3-stages/pre-seed-angel',    firm: 'Stage',  desc: 'Earliest conviction bet — evaluates founder, not traction' },
      { name: 'seed-investor',     path: 'tier3-stages/seed-investor',     firm: 'Stage',  desc: 'First institutional check — product signals and initial PMF indicators' },
      { name: 'series-a-partner',  path: 'tier3-stages/series-a-partner',  firm: 'Stage',  desc: 'Institutional scaling — repeatable GTM, unit economics, team build-out' },
      { name: 'growth-investor',   path: 'tier3-stages/growth-investor',   firm: 'Stage',  desc: 'Category winners at scale — market leadership, margins, and path to IPO' },
    ],
  },
  {
    id: 'tier4',
    label: 'Tier 4 — Regional Perspectives',
    color: '\x1b[32m', // green
    skills: [
      { name: 'silicon-valley-vc', path: 'tier4-regional/silicon-valley-vc', firm: 'Region', desc: 'Bay Area default — global ambition, network density, and blitzscaling bias' },
      { name: 'latam-vc',          path: 'tier4-regional/latam-vc',          firm: 'Region', desc: 'Latin America specialist — local execution, FX risk, and leapfrog opportunities' },
      { name: 'european-vc',       path: 'tier4-regional/european-vc',       firm: 'Region', desc: 'European deep-tech and regulation-forward investing with capital efficiency' },
    ],
  },
  {
    id: 'tier5',
    label: 'Tier 5 — Crypto & Web3',
    color: '\x1b[34m', // blue
    skills: [
      { name: 'paradigm',      path: 'tier5-crypto/paradigm',      firm: 'Paradigm',      desc: 'Research-driven crypto VC — infrastructure over apps, working sessions over pitches' },
      { name: 'a16z-crypto',   path: 'tier5-crypto/a16z-crypto',   firm: 'a16z Crypto',   desc: 'Read-Write-Own thesis — DXR Framework, token design, full-stack platform support' },
    ],
  },
  {
    id: 'benchmark',
    label: 'Benchmark Mode',
    color: '\x1b[33;1m', // bold gold
    skills: [
      { name: 'benchmark-mode', path: 'benchmark/benchmark', firm: 'Meta', desc: 'Full VC readiness assessment — 10 dimensions, scores 0-100, matches you to VCs' },
    ],
  },
];

/**
 * Flat lookup: name → skill object (with tier metadata attached).
 */
function buildIndex() {
  const index = Object.create(null);
  for (const tier of TIERS) {
    for (const skill of tier.skills) {
      index[skill.name] = { ...skill, tier };
    }
  }
  return index;
}

const SKILLS_INDEX = buildIndex();

module.exports = { GITHUB_RAW_BASE, TIERS, SKILLS_INDEX };
