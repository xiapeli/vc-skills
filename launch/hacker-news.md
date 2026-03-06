# Hacker News — Show HN Post

## Title
Show HN: VC Skills – .md files that make AI assistants simulate real VCs

## Body

I built a library of 27 skills.md files that turn AI coding assistants (Claude Code, Cursor, ChatGPT) into realistic VC partners.

Each skill is a complete simulation — identity, investment thesis, evaluation framework, 20-40 real questions, red flags, deal terms, and communication style. Built from 100+ sources (partner interviews, investment memos, Crunchbase data, portfolio analysis).

Example: the YC skill simulates a 10-minute YC interview. It will interrupt you, demand a one-sentence explanation, and ask how many users you talked to this week. The Benchmark Capital skill requires unanimous 5-partner approval and always takes a board seat. Tiger Global will ask for your P&L before you finish your vision.

There's a Benchmark Mode that evaluates your pitch across 10 dimensions (Vision, Founder Quality, Market, Product/Moat, Traction, Unit Economics, GTM, Team, Capital Efficiency, Exit) and gives a readiness score out of 100.

Usage:

    npx vc-skills sequoia    # copies skill to clipboard
    npx vc-skills --list     # shows all 27 skills

Or just grab the .md files from GitHub and paste into your AI tool.

5 tiers: Real firms (Sequoia, a16z, YC, etc.), Archetypes (Operator VC, Finance VC), Stages (Pre-seed to Growth), Regional (SV, LatAm, EU), Crypto (Paradigm, a16z Crypto).

MIT licensed. Looking for contributions — especially Asian, African, and Middle Eastern VCs.

Site: https://vc-skills.gogrowth.me
GitHub: https://github.com/xiapeli/vc-skills

---

## Tips for HN Submission
- Post on a Tuesday or Wednesday, 9-11am EST (peak HN traffic)
- Title must start with "Show HN:"
- Keep the body factual, technical, no marketing language
- HN audience values: open source, technical depth, novel approach
- Be ready to answer comments within the first 2 hours (critical for ranking)
- Common HN questions to prepare for:
  - "How accurate are these simulations?" → Research methodology
  - "Why not just use a system prompt?" → These ARE system prompts, but deeply researched ones
  - "What makes this different from ChatGPT custom GPTs?" → Depth of research, works across all AI tools, open source
  - "Have real VCs validated these?" → Built from their own public statements, interviews, and writing
