#!/bin/bash
# VC Skills — Claude Code Installer
# Installs all VC simulation skills as Claude Code slash commands
#
# Usage: curl -fsSL https://raw.githubusercontent.com/xiapeli/vc-skills/main/integrations/claude-code/install.sh | bash

set -e

COMMANDS_DIR="$HOME/.claude/commands"
REPO_BASE="https://raw.githubusercontent.com/xiapeli/vc-skills/main/skills"
GREEN='\033[0;32m'
GOLD='\033[0;33m'
BLUE='\033[0;34m'
RESET='\033[0m'
BOLD='\033[1m'

echo ""
echo -e "${GOLD}${BOLD}  VC Skills — Claude Code Installer${RESET}"
echo -e "${GOLD}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

# Create commands directory
mkdir -p "$COMMANDS_DIR"

# Skills to install
declare -a SKILLS=(
  # Tier 1 — Real VCs
  "tier1-vcs/sequoia:vc-sequoia:Sequoia Capital"
  "tier1-vcs/a16z:vc-a16z:Andreessen Horowitz"
  "tier1-vcs/yc:vc-yc:Y Combinator"
  "tier1-vcs/benchmark:vc-benchmark:Benchmark Capital"
  "tier1-vcs/founders-fund:vc-founders-fund:Founders Fund"
  "tier1-vcs/accel:vc-accel:Accel Partners"
  "tier1-vcs/lightspeed:vc-lightspeed:Lightspeed"
  "tier1-vcs/tiger-global:vc-tiger-global:Tiger Global"
  "tier1-vcs/bessemer:vc-bessemer:Bessemer VP"
  "tier1-vcs/greylock:vc-greylock:Greylock"
  "tier1-vcs/kaszek:vc-kaszek:Kaszek Ventures"
  "tier1-vcs/softbank-latam:vc-softbank-latam:SoftBank LatAm"
  # Tier 2 — Archetypes
  "tier2-archetypes/operator-vc:vc-operator:Operator VC"
  "tier2-archetypes/finance-vc:vc-finance:Finance VC"
  "tier2-archetypes/product-vc:vc-product:Product VC"
  "tier2-archetypes/network-vc:vc-network:Network VC"
  "tier2-archetypes/thesis-vc:vc-thesis:Thesis VC"
  "tier2-archetypes/impact-investor:vc-impact:Impact Investor"
  # Tier 3 — Stages
  "tier3-stages/pre-seed-angel:vc-pre-seed:Pre-seed Angel"
  "tier3-stages/seed-investor:vc-seed:Seed Investor"
  "tier3-stages/series-a-partner:vc-series-a:Series A Partner"
  "tier3-stages/growth-investor:vc-growth:Growth Investor"
  # Tier 4 — Regional
  "tier4-regional/silicon-valley-vc:vc-sv:Silicon Valley VC"
  "tier4-regional/latam-vc:vc-latam:LatAm VC"
  "tier4-regional/european-vc:vc-eu:European VC"
  # Tier 5 — Crypto
  "tier5-crypto/paradigm:vc-paradigm:Paradigm"
  "tier5-crypto/a16z-crypto:vc-a16z-crypto:a16z Crypto"
  # Benchmark
  "benchmark/benchmark:vc-benchmark-mode:Benchmark Mode"
)

INSTALLED=0
FAILED=0

for entry in "${SKILLS[@]}"; do
  IFS=':' read -r path command label <<< "$entry"
  TARGET="$COMMANDS_DIR/${command}.md"

  if curl -fsSL "$REPO_BASE/$path.md" -o "$TARGET" 2>/dev/null; then
    echo -e "  ${GREEN}✓${RESET} //${command} — ${label}"
    INSTALLED=$((INSTALLED + 1))
  else
    echo -e "  ✗ ${command} — failed to download"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo -e "${GOLD}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "  ${GREEN}${BOLD}Installed: ${INSTALLED} skills${RESET}"
if [ $FAILED -gt 0 ]; then
  echo -e "  Failed: ${FAILED}"
fi
echo ""
echo -e "  ${BLUE}Usage in Claude Code:${RESET}"
echo -e "  Type ${BOLD}/vc-sequoia${RESET} to pitch to Sequoia Capital"
echo -e "  Type ${BOLD}/vc-yc${RESET} for a YC mock interview"
echo -e "  Type ${BOLD}/vc-benchmark-mode${RESET} for full readiness assessment"
echo ""
echo -e "  ${GOLD}Site: https://vc-skills.gogrowth.me${RESET}"
echo -e "  ${GOLD}GitHub: https://github.com/xiapeli/vc-skills${RESET}"
echo ""
