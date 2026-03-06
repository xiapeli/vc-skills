# Contributing to VC Skills

We want this to be the most comprehensive VC simulation library in the world. If you know how a VC firm operates — or you ARE a VC — your contribution makes every founder who uses this better prepared.

## Skills We Want

### High Priority
- **Asian VCs**: Sequoia China/India, GGV Capital, Hillhouse Capital, Temasek, SoftBank Vision Fund (Japan)
- **African VCs**: Partech Africa, TLcom Capital, Norrsken22, Algebra Ventures
- **Middle East VCs**: Mubadala, ADQ Ventures, STV, Global Founders Capital MENA
- **Corporate VCs**: Google Ventures, Intel Capital, Salesforce Ventures, Microsoft M12
- **Crypto**: Polychain Capital, Multicoin Capital, Dragonfly Capital, Pantera Capital
- **Climate**: Breakthrough Energy Ventures, Lowercarbon Capital, Congruent Ventures
- **Healthcare/Bio**: OrbiMed, Flagship Pioneering, ARCH Venture Partners

### Also Welcome
- More regional skills (Southeast Asia, India, ANZ, Canada, Israel)
- Stage-specific variations (bridge rounds, extension rounds, pre-IPO)
- LP perspectives (endowments, family offices, fund-of-funds)
- Specialized archetypes (solo GP, micro-fund, rolling fund, syndicates)

## How to Create a Skill

### 1. Research First

A good skill requires real research. Don't guess — verify.

**Minimum research sources:**
- Firm website (investment thesis, portfolio, team)
- Partner interviews (podcasts, YouTube, conference talks)
- Crunchbase/PitchBook (deal data, check sizes, stages)
- Blog posts or memos from partners
- News coverage (recent deals, fund raises, strategy changes)

### 2. Use the Template

Every skill follows this structure. Copy this and fill it in:

```markdown
# [Firm/Archetype Name] — [Category] Simulation

You are a **[role] at [firm]** based in [location]. Your firm manages [AUM] across [fund types]. You invest in [sectors] at [stages].

---

## YOUR IDENTITY

- Name: Generate a realistic name when the conversation starts
- Background: [Education, career path, notable deals, expertise]
- Style: **[2-3 adjectives].** [Description of communication approach]
- Quote: "[Signature phrase that captures their philosophy]"

---

## [CONTEXT SECTION — e.g., FIRM THESIS, MARKET CONTEXT] (2025-2026)

### Key Facts
- [Relevant market data]
- [Fund size, portfolio size]
- [Recent notable deals or exits]

---

## HOW YOU INVEST

### Stage & Terms
[Check sizes, valuations, instruments by stage]

### What You Look For
1. [Criterion 1 with explanation]
2. [Criterion 2 with explanation]
3. [Continue for 5-7 criteria]

---

## QUESTIONS YOU ASK

### [Category 1 — e.g., Vision, Market]
- "[Question 1]"
- "[Question 2]"
- [5-8 questions per category]

### [Category 2 — e.g., Team, Execution]
- "[Question 1]"
- [Continue]

### [Category 3 — e.g., Economics, Exit]
- "[Question 1]"
- [Continue]

[Include 3-5 question categories with 5-8 questions each]

---

## RED FLAGS

- **[Red flag name]**: [Description of what triggers it]
- [6-10 red flags]

---

## HOW YOU SAY "NO"

- "[Realistic rejection quote 1]"
- "[Realistic rejection quote 2]"
- "[Realistic rejection quote 3]"

---

## HOW YOU SAY "YES"

- "[Realistic acceptance quote 1]"
- "[Realistic acceptance quote 2]"
- "[Realistic acceptance quote 3]"

---

## POST-INVESTMENT

- [Value-add 1]
- [Value-add 2]
- [Continue for 5-7 items]

---

## SIMULATION RULES

1. **[Rule 1].** [Explanation]
2. **[Rule 2].** [Explanation]
3. [5-7 rules]
4. **Give a clear verdict.** PASS, INTERESTED, or INVEST. Include: [specific scoring criteria]
```

### 3. Quality Checklist

Before submitting, verify:

- [ ] **Identity is specific** — not generic "VC partner" but a person with a background
- [ ] **Investment thesis is real** — based on actual firm philosophy, not assumptions
- [ ] **Check sizes are accurate** — sourced from Crunchbase, PitchBook, or firm website
- [ ] **Questions are authentic** — things this VC actually asks, not generic questions
- [ ] **Red flags are specific** — what THIS firm rejects, not generic VC red flags
- [ ] **Rejection language is realistic** — sounds like how this firm actually passes
- [ ] **Deal terms match market** — 2025-2026 calibrated, stage-appropriate
- [ ] **Simulation rules enforce behavior** — the AI stays in character
- [ ] **Verdict format is defined** — specific scoring dimensions included
- [ ] **20+ questions** across 3+ categories
- [ ] **Market context is current** — 2025-2026 data, not outdated

### 4. File Naming

```
# Tier 1 (specific firms)
skills/tier1-vcs/[firm-name].md

# Tier 2 (archetypes)
skills/tier2-archetypes/[archetype-name].md

# Tier 3 (stages)
skills/tier3-stages/[stage-name].md

# Tier 4 (regional)
skills/tier4-regional/[region]-vc.md

# Tier 5 (crypto)
skills/tier5-crypto/[firm-or-type].md
```

Use lowercase, hyphens for spaces. Keep names short and recognizable.

## How to Submit

1. Fork this repo
2. Create a branch: `git checkout -b skill/paradigm`
3. Add your skill file in the correct tier directory
4. Update the skills table in README.md
5. Open a PR with:
   - Skill file
   - Research sources (list the URLs you used)
   - Why this skill matters (1-2 sentences)

## Code of Conduct

- Don't fabricate data. If you can't find real information, say so.
- Don't copy-paste from firm websites without adapting. Skills are simulations, not company profiles.
- Attribute research sources in your PR.
- Be respectful of the firms and people being simulated.

## Questions?

Open an issue. We'll help you build the skill.
