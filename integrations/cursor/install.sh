#!/bin/bash
# VC Skills — Cursor AI Installer
# Installs VC simulation skills as Cursor rules
#
# Usage: curl -fsSL https://raw.githubusercontent.com/xiapeli/vc-skills/main/integrations/cursor/install.sh | bash

set -e

RULES_DIR=".cursor/rules"
REPO_BASE="https://raw.githubusercontent.com/xiapeli/vc-skills/main/skills"
GREEN='\033[0;32m'
GOLD='\033[0;33m'
BLUE='\033[0;34m'
RESET='\033[0m'
BOLD='\033[1m'

echo ""
echo -e "${GOLD}${BOLD}  VC Skills — Cursor Installer${RESET}"
echo -e "${GOLD}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

mkdir -p "$RULES_DIR"

declare -a SKILLS=(
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
  "tier2-archetypes/operator-vc:vc-operator:Operator VC"
  "tier2-archetypes/finance-vc:vc-finance:Finance VC"
  "tier2-archetypes/product-vc:vc-product:Product VC"
  "tier2-archetypes/network-vc:vc-network:Network VC"
  "tier2-archetypes/thesis-vc:vc-thesis:Thesis VC"
  "tier2-archetypes/impact-investor:vc-impact:Impact Investor"
  "tier3-stages/pre-seed-angel:vc-pre-seed:Pre-seed Angel"
  "tier3-stages/seed-investor:vc-seed:Seed Investor"
  "tier3-stages/series-a-partner:vc-series-a:Series A Partner"
  "tier3-stages/growth-investor:vc-growth:Growth Investor"
  "tier4-regional/silicon-valley-vc:vc-sv:Silicon Valley VC"
  "tier4-regional/latam-vc:vc-latam:LatAm VC"
  "tier4-regional/european-vc:vc-eu:European VC"
  "tier5-crypto/paradigm:vc-paradigm:Paradigm"
  "tier5-crypto/a16z-crypto:vc-a16z-crypto:a16z Crypto"
  "benchmark/benchmark:vc-benchmark-mode:Benchmark Mode"
)

INSTALLED=0

for entry in "${SKILLS[@]}"; do
  IFS=':' read -r path command label <<< "$entry"
  TARGET="$RULES_DIR/${command}.md"

  if curl -fsSL "$REPO_BASE/$path.md" -o "$TARGET" 2>/dev/null; then
    echo -e "  ${GREEN}✓${RESET} ${command}.md — ${label}"
    INSTALLED=$((INSTALLED + 1))
  else
    echo -e "  ✗ ${command} — failed"
  fi
done

echo ""
echo -e "  ${GREEN}${BOLD}Installed: ${INSTALLED} skills to ${RULES_DIR}/${RESET}"
echo ""
echo -e "  ${BLUE}Usage:${RESET} Open Cursor in this directory. Rules auto-load."
echo -e "  ${BLUE}Pick one:${RESET} Keep only the VC you want to pitch to."
echo ""
