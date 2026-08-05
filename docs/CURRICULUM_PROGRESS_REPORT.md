# Lingolali Curriculum Progress Report

**Project:** Lingolali — Multilingual Language Learning Platform  
**Repository:** `feratpizza-creator/Legacy-Code-Update`  
**Report Date:** July 23, 2026  
**Generated At:** 2026-07-23 (session time)  
**GitHub Pages URL:** https://feratpizza-creator.github.io/Legacy-Code-Update/

---

## 1. Executive Summary

### Current enrichment phase — B1, B2, and C1

The current phase enriches existing English units only; it does not create new units. The reference library under `words-reference-5000/` remains analysis-only, while reviewed additions are kept in separate enrichment banks and merged into the runtime English pack through `curriculum-en.ts`.

The latest completed batch adds **24 reviewed C1 vocabulary entries** to the existing units:

| Existing unit | Topic | Added entries |
|---|---|---:|
| `C1/u44` | Institutions and Reform | 8 |
| `C1/u45` | Memory and Identity | 8 |
| `C1/u46` | Ethics and Technology | 8 |

Quality checks for this batch: **61 C1 units / 61 unique IDs**, **16 vocabulary items per target unit after merge**, no exact duplicate words within `u44`, `u45`, or `u46`, application typecheck passed, scripts typecheck passed, and curriculum validation passed with **0 errors**, **12 warnings**, and **94/100 quality**.


Today the Lingolali language-learning curriculum was significantly expanded. A total of **24 additional units per CEFR level** were added to both the Finnish and English language packs (units `u4` through `u27`). The existing curriculum files were also audited, and duplicate `u12`/`u13` entries were cleaned. All changes passed TypeScript type-checking and Vite production builds, and were pushed to the `main` branch.

| Metric | Finnish (`curriculum-data-more.ts`) | English (`curriculum-en-more.ts`) |
|---|---|---|
| Levels | A0, A1, A2, B1, B2, C1, C2 | A0, A1, A2, B1, B2, C1, C2 |
| Units per level | 24 | 24 |
| Total vocabulary words | 1,190 | 1,190 |
| Total useful phrases | 574 | 574 |
| Total dialogue lines | 644 | 644 |

---

## 2. What Was Done Today

### 2.1 Curriculum Expansion

A series of curriculum units were appended to the two additional-curriculum TypeScript files used by the Lingolali `LearnCenter`.

| Unit Range | Scope |
|---|---|
| `u4` – `u11` | Original additional units (food/drink, colors/clothes, places, verbs, time, home, emotions, school, numbers, days/months, weather, family, colors, animals, etc.) |
| `u12` – `u13` | Emotions, school, food/drink, body/health, city/transport (added in earlier steps, then audited and deduplicated today) |
| `u14` – `u15` | Weather/family, hobbies/celebrations, sports/fitness, digital life, travel/food culture, media/entrepreneurship, philosophy/global challenges, linguistics/postmodern culture |
| `u16` – `u17` | Weather/family, holidays/work, culture/communication, education/workplace, science/globalization, justice/ethics, consciousness/utopia |
| `u18` – `u19` | Emotions/relationships, daily routines/habits, city life/housing, work/careers, travel/tourism, health/wellbeing, nature/environment, science/discovery, law/society, art/creativity |
| `u20` – `u21` | Animals/nature, professions/work, hobbies/free time, celebrations/traditions, communication/media, environment/society, future/technology, literature/storytelling, global issues, philosophy of mind |
| `u22` – `u23` | Transportation/directions, shopping/money, hotel, traveling, health/doctor, work/career, education/learning, law/society, social change, anthropology, linguistics, metaphysics, civilization/history |
| `u24` – `u25` | Sports/games, continents/countries, health/body, traveling/directions, work/workplace, culture/society, media/news, nature/environment, economy/money, technology/ethics, political philosophy, aesthetics/art criticism, epistemology, philosophy of science |
| `u26` – `u27` | Music/instruments, art/drawing, phone/communication, appointments, nature/environment, planning, relationships, daily routine, urbanization, migration, power/human rights, hermeneutics, deconstruction, phenomenology |

### 2.2 Content Quality Rules Applied

Every unit includes:

- **8 target-language vocabulary words** with part of speech, example sentence, and translation.
- **4 useful phrases** in the target language with translations.
- **4-line dialogue** in the target language with translations.
- **1 reading passage** (title, text, and translation).
- Original educational content written from scratch; no copying from Duolingo, Babbel, Busuu, Memrise, LingQ, or textbooks.
- Progressive difficulty matching CEFR A0 → C2.

### 2.3 Audit and Cleanup

An audit of the additional curriculum files revealed **duplicate `u12` and `u13` units** in every CEFR level of both Finnish and English files. A cleanup script kept the first occurrence of each unit id and removed duplicates. The cleanup was committed separately.

| Operation | Commit |
|---|---|
| Remove duplicate `u12`/`u13` units | `68d9d77` — `fix: remove duplicate u12 and u13 units from curriculum files` |

---

## 3. Methodology and Workflow

### 3.1 Development Workflow

1. **Audit** — Python scripts parsed the TypeScript curriculum objects and checked for duplicate ids and missing/empty fields.
2. **Clean** — Duplicate units were removed programmatically; the first occurrence of each unit id was retained.
3. **Generate** — A Python generator script was created for each new unit pair (`u14/u15`, `u16/u17`, `u18/u19`, `u20/u21`, `u22/u23`, `u24/u25`, `u26/u27`). Each script:
   - Defines level-specific topics in Finnish and English.
   - Defines word banks, phrases, dialogues, and reading passages.
   - Appends the generated units to `curriculum-data-more.ts` and `curriculum-en-more.ts`.
   - Uses `json.dumps` to guarantee valid TypeScript/JSON output.
4. **Verify** — After each append, unit ids were checked, and `pnpm run typecheck` and `pnpm run build` were run.
5. **Commit & Push** — Each batch of units was committed with a descriptive message and pushed to `origin/main` using Freebuff-managed Git credentials.

### 3.2 Code and Data Flow

- `App.tsx` loads curriculum data asynchronously via `loadLanguagePacks()` from `learn-data.ts`.
- Curriculum files are split into separate Vite chunks, so the initial bundle stays around **310 kB** while curriculum chunks grow.
- `LearnCenter.tsx` consumes the resolved language packs.

---

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| **Vite** | Frontend build tool and bundler |
| **React + TypeScript** | UI framework and language |
| **Tailwind CSS** | Styling |
| **pnpm** | Package manager and monorepo tooling |
| **Python 3** | Curriculum generation and audit scripts |
| **JSON** | Intermediate curriculum data format |
| **Git / GitHub** | Version control and remote repository |
| **GitHub Pages** | Static site hosting |

### Build Commands Used

```bash
# TypeScript type check
pnpm run typecheck

# Production build (GitHub Pages base path)
BASE_PATH=/Legacy-Code-Update/ PORT=3000 pnpm run build
```

---

## 5. Current Curriculum Overview by CEFR Level

Each level now contains **24 units** covering a wide range of everyday, professional, academic, and philosophical topics.

### A0 (Absolute Beginner)
Sample topics: Food & Drink, Colors & Clothes, Places, Verbs, Time, Home, Emotions, School, Animals/Nature, Professions, Sports/Games, Continents/Countries, Music, Art.

### A1 (Beginner)
Sample topics: Eating Out, Weather/Seasons, Family, Body/Health, City/Transport, Shopping, Restaurant, Hobbies, Celebrations, Health/Body, Travel/Directions, Phone/Communication, Appointments.

### A2 (Elementary)
Sample topics: Shopping/Prices, Hobbies, Restaurant, Hotel, Communication, Celebrations, Travel, Health/Doctor, Culture, Media, Environment/Society, Work/Workplace, Planning.

### B1 (Intermediate)
Sample topics: Culture/Lifestyles, Technology/Daily Life, Work, Media, Banks, Transport, Travel, Food Culture, Nature/Environment, Future/Technology, Literature, News, Relationships, Daily Routine.

### B2 (Upper-Intermediate)
Sample topics: Politics/Society, Science/Future, Education, Healthcare, Economy, Psychology, Entrepreneurship, Art/Culture, Global Issues, Philosophy of Mind, Law/Society, Social Change, Economy/Money, Technology/Ethics.

### C1 (Advanced)
Sample topics: Global Economy, Media Ethics, Globalization, Journalism Ethics, Epistemology, Aesthetics, Philosophy/Ethics, Advanced Rhetoric, Identity/Memory, Political Philosophy, Power/Human Rights, Hermeneutics.

### C2 (Proficiency)
Sample topics: Rhetoric/Influence, Translation/Culture, Linguistics, Postmodern Culture, Metaphysics, Civilization/History, Ontology, Existentialism, Deconstruction, Phenomenology, Epistemology, Philosophy of Science.

---

## 6. Build and Deployment Status

| Check | Status |
|---|---|
| TypeScript typecheck | ✅ Pass |
| Production build | ✅ Pass (dist/ generated) |
| Duplicate unit ids | ✅ Cleaned |
| GitHub push | ✅ Pushed to `origin/main` |

### Latest Git Commits (today)

- `753db1f` — `feat: append rich u26 and u27 units to all CEFR levels`
- `68d9d77` — `fix: remove duplicate u12 and u13 units from curriculum files`
- `06b9441` — `feat: append rich u24 and u25 units to all CEFR levels`
- `9c85d69` — `feat: append rich u22 and u23 units to all CEFR levels`
- (and earlier unit-append commits)

### Production Bundle Sizes (after u26/u27)

| Asset | Size | Gzipped |
|---|---|---|
| `index-*.js` | 310.48 kB | 96.48 kB |
| `curriculum-data-*.js` | 438.06 kB | 112.40 kB |
| `curriculum-en-*.js` | 444.28 kB | 119.65 kB |

---

## 7. Latest English Enrichment Batch (u57)

The English runtime curriculum now includes the reviewed `u57` continuation in `artifacts/lengoali/src/curriculum-en-part18.ts`. It adds one focused unit per CEFR level without changing the Finnish curriculum or replacing existing English entries:

| Level | Unit focus |
|---|---|
| A0 | Playground language, movement, and safety |
| A1 | Public transport, tickets, platforms, and routes |
| A2 | Making plans, alternatives, and changed arrangements |
| B1 | Problem solving, priorities, resources, and solutions |
| B2 | Climate policy, emissions, trade-offs, and equity |
| C1 | Digital ethics, accountability, transparency, and safeguards |
| C2 | Pragmatics, politeness, indirectness, and implication |

Each level contributes eight new lexical entries with part of speech, IPA, definition, examples, translations, synonyms, antonyms, collocations, word families, tags, and category metadata, plus four useful phrases, a four-line dialogue, and an original reading passage. The new part is imported by `curriculum-en.ts` and is therefore available through the existing lazy-loaded `ENGLISH_PACK` pipeline.

The reference library remains analysis-only. This batch was written as a reviewed curriculum addition and does not import or runtime-load any reference PDF.

## 8. Latest English Enrichment Batch (u58)

The English runtime curriculum now also includes the reviewed `u58` continuation in `artifacts/lengoali/src/curriculum-en-part19.ts`. It adds one focused unit per CEFR level while preserving the existing English and Finnish entries:

| Level | Unit focus |
|---|---|
| A0 | Home routines, hygiene, and tidying |
| A1 | Shopping for clothes, payment, receipts, and refunds |
| A2 | Clinic visits, symptoms, treatment, and recovery |
| B1 | Teamwork, delegation, feedback, and deadlines |
| B2 | Urban planning, housing, transport, and infrastructure |
| C1 | Research integrity, evidence, citations, and reproducibility |
| C2 | Discourse analysis, context, register, stance, and interaction |

Each level contributes eight new lexical entries with part of speech, IPA, definition, examples, translations, synonyms, antonyms, collocations, word families, tags, and category metadata, plus four useful phrases, a four-line dialogue, and an original reading passage. The new part is imported by `curriculum-en.ts` and is available through the existing `ENGLISH_PACK` pipeline.

The reference library remains analysis-only. This batch was written as a reviewed curriculum addition and does not import or runtime-load any reference PDF.

## 9. Latest English Enrichment Batch (u59)

The English runtime curriculum now also includes the reviewed `u59` continuation in `artifacts/lengoali/src/curriculum-en-part20.ts`. This batch was selected after a read-only review of the uploaded Oxford 5000 reference-library inventory, its comparison rules, and the existing runtime curriculum. The environment did not provide a PDF text-extraction utility, so no reference PDF content was imported or treated as automatically authoritative; the reference files remain analysis-only and did not overwrite curriculum entries.

| Level | Unit focus |
|---|---|
| A0 | Classroom objects, art materials, and learning instructions |
| A1 | Post office, letters, parcels, postage, and delivery |
| A2 | Emergencies, accidents, first aid, and rescue |
| B1 | Community volunteering, charity, outreach, and support |
| B2 | Personal finance, borrowing, investment, liquidity, and solvency |
| C1 | Cognitive bias, framing, correlation, causation, and judgement |
| C2 | Implicature, entailment, intertextuality, paratext, and multimodality |

Each level contributes eight new lexical entries with part of speech, IPA, definition, examples, translations, synonyms, antonyms, collocations, word families, tags, and category metadata, plus four useful phrases, a four-line dialogue, and an original reading passage. The new part is imported by `curriculum-en.ts` and is available through the existing `ENGLISH_PACK` pipeline.

The batch preserves the project’s lexical comparison rule: repeated spellings were treated as possible contextual, grammatical, or CEFR distinctions rather than being copied blindly. Existing Finnish content and unrelated working-tree changes were left untouched.

## 10. Latest English Enrichment Batch (u60)

The English runtime curriculum now also includes the reviewed `u60` continuation in `artifacts/lengoali/src/curriculum-en-part21.ts`. This batch was selected after a read-only review of the uploaded Oxford 5000 reference-library structure and the existing runtime curriculum. The local environment did not provide `pdftotext`, so the PDFs were not extracted or imported; the reference library remains analysis-only.

| Level | Unit focus |
|---|---|
| A0 | Playground equipment, movement, and safety |
| A1 | Library membership, borrowing, catalogues, and due dates |
| A2 | Household tools, leaks, electrical safety, and repairs |
| B1 | Meeting facilitation, mediation, alignment, and collaboration |
| B2 | Media literacy, fact-checking, algorithms, and misleading content |
| C1 | Policy implementation, legislation, enforcement, and feasibility |
| C2 | Translation choices, idioms, equivalence, and cultural meaning |

Each level contributes eight new lexical entries with part of speech, IPA, definition, examples, translations, synonyms, antonyms, collocations, word families, tags, and category metadata, plus four useful phrases, a four-line dialogue, and an original reading passage. The new part is imported by `curriculum-en.ts` and is available through the existing `ENGLISH_PACK` pipeline.

Candidate selection followed the project’s comparison rule of lemma + part of speech + meaning + CEFR/context. Commonly repeated spellings were avoided or replaced with more specific entries where the existing curriculum already covered the same sense. Existing Finnish content and unrelated working-tree changes were left untouched.

## 11. Latest English Enrichment Batch (u61)

The English runtime curriculum now includes the reviewed `u61` continuation in `artifacts/lengoali/src/curriculum-en-part22.ts`. This batch was selected after a read-only review of the uploaded Oxford 5000 reference-library inventory, the project comparison rules, and the existing English vocabulary declarations. The local environment does not provide `pdftotext`, so the PDFs were not extracted or imported; the reference library remains analysis-only.

| Level | Unit focus |
|---|---|
| A0 | Colors, shapes, patterns, and picture description |
| A1 | Everyday symptoms, basic care, and medicine |
| A2 | Cooking actions, kitchen tools, and recipes |
| B1 | Respectful disagreement, assumptions, and reframing |
| B2 | Climate adaptation, resilience, habitats, and biodiversity |
| C1 | Research design, measurement, confounders, and generalizability |
| C2 | Speech acts, indexicality, homonymy, connotation, and cultural meaning |

Each level contributes eight reviewed lexical entries with part of speech, IPA, definition, examples, translations, synonyms, antonyms, collocations, word families, tags, and category metadata, plus four useful phrases, a four-line dialogue, and an original reading passage. The new part is imported by `curriculum-en.ts` and is available through the existing lazy-loaded `ENGLISH_PACK` pipeline.

Candidate selection followed the project’s comparison rule of lemma + part of speech + meaning + CEFR/context. Exact declaration collisions were removed or replaced before implementation; repeated spellings in surrounding content were treated as contextual review rather than automatic deletion. Existing Finnish content and unrelated working-tree changes were left untouched.

## 12. Focused B1/B2/C1 Enrichment (existing units only)

This phase focused on enriching the existing B1, B2, and C1 units `u57`–`u61`; no unit was created, renamed, removed, or duplicated. The uploaded Oxford 5000 PDFs in `words-reference-5000/B1`, `B2`, and `C1` were treated as analysis-only reference material, consistent with the repository rules. No PDF was imported into runtime code.

| Level | Existing unit topics enriched | Added reviewed vocabulary |
|---|---|---:|
| B1 | Problem solving; teamwork; community volunteering; meetings and collaboration; respectful disagreement | 40 |
| B2 | Climate policy; planning better cities; personal finance; reading the media; climate adaptation | 40 |
| C1 | Digital ethics; research integrity; cognitive bias and decisions; policy implementation; research design and evidence | 40 |

Each added entry includes Arabic translation metadata, IPA, definition, contextual example with Arabic translation, part of speech, category, tags, synonyms, antonyms, collocations, and word-family metadata. At runtime, every target unit now has 16 vocabulary records across its two existing lessons (previously 8), while each level still contains exactly 61 units and has no duplicate unit IDs.

Validation completed for this phase:

- Curriculum validator: **0 errors**, 12 warnings, quality **93.9/100** across 3,926 records.
- Lengoali TypeScript check: **passed** (`pnpm --dir artifacts/lengoali run typecheck`).
- Validator TypeScript check: **passed** (`pnpm --dir scripts run typecheck`).
- Runtime audit: B1/B2/C1 each has 61 units; `u57`–`u61` each has 16 vocabulary records.

The reviewed data remains isolated in `artifacts/lengoali/src/curriculum-en-enrichment-reviewed.ts` and is appended through the existing merge in `curriculum-en.ts`; the core unit declarations were not replaced.

## 13. Files Modified

- `artifacts/lengoali/src/curriculum-en-enrichment-reviewed.ts` — reviewed B1/B2/C1 enrichment entries.
- `docs/CURRICULUM_PROGRESS_REPORT.md` — this report.
- `.curriculum-validation-report.md` — generated validator output.

Pre-existing working-tree changes in `curriculum-en.ts`, the legacy enrichment bank, and the numbered curriculum part files were preserved and were not rewritten as part of this phase.

---

## 14. Continued B1/B2/C1 Enrichment (existing units only)

The next enrichment pass continued within the existing B1, B2, and C1 units. No unit, lesson, title, or identifier was created, renamed, removed, or duplicated. The Oxford reference PDFs in `words-reference-5000/B1`, `B2`, and `C1` remained analysis-only sources and were not imported into runtime code.

| Level | Existing units enriched | New reviewed entries | Main topic gaps addressed |
|---|---|---:|---|
| B1 | `u52`, `u53`, `u56` | 24 | newsroom practice, source checking, accountability, mentoring, role clarity, cohesion, constructive teamwork |
| B2 | `u52`, `u53`, `u54` | 24 | legislation, regulatory oversight, evidence interpretation, cultural trends, social mobility |
| C1 | `u56` | 8 | disinformation, astroturfing, deepfakes, media ownership, platform moderation, information disorder |

All additions are reviewed Arabic-supported entries with IPA, definitions, contextual examples and Arabic translations, part of speech, category, tags, synonyms, collocations, and word-family metadata through the existing reviewed-entry helper. The runtime merge remains unchanged: entries are appended to the current units rather than replacing core curriculum records.

Validation for this pass:

- Curriculum validator: **0 errors**, 12 warnings, quality **94/100** across 3,974 records.
- Lengoali TypeScript check: **passed** (`pnpm --dir artifacts/lengoali run typecheck`).
- Validator TypeScript check: **passed** (`pnpm --dir scripts run typecheck`).
- Structural audit: B1/B2/C1 each retains **61 unique units**; every newly enriched target unit has **16 vocabulary records** at runtime.
- Repeated words across neighbouring units were retained only where they represent contextual reinforcement or a different lesson context; no duplicate unit IDs were introduced.

## 15. Continued B1/B2/C1 Enrichment (existing units only)

This pass enriched the existing `u47`–`u49` units in B1, B2, and C1. No unit, lesson, title, or identifier was created, renamed, removed, or duplicated. The uploaded Oxford 5000 PDFs under `words-reference-5000/B1`, `B2`, and `C1` were used as analysis-only reference material; no PDF content was imported into runtime code.

| Level | Existing units enriched | New reviewed entries | Main topic gaps addressed |
|---|---|---:|---|
| B1 | `u47`, `u48`, `u49` | 24 | cultural travel, food and wellbeing, community projects |
| B2 | `u47`, `u48`, `u49` | 24 | business strategy, climate policy, psychology and behaviour |
| C1 | `u47`, `u48`, `u49` | 24 | academic writing, law and rights, media and public trust |

All 72 additions include Arabic translation metadata, IPA, definition, contextual example with Arabic translation, part of speech, category, tags, synonyms, antonyms, collocations, and word-family metadata through the reviewed-entry helper. The existing merge path in `curriculum-en.ts` appends them to the current units; it does not replace core curriculum records.

Validation for this pass:

- Curriculum validator: **0 errors**, 12 warnings, quality **94.1/100** across 4,092 records.
- Lengoali TypeScript check: **passed** (`pnpm --dir artifacts/lengoali run typecheck`).
- Validator TypeScript check: **passed** (`pnpm --dir scripts run typecheck`).
- Structural/runtime audit: B1/B2/C1 each retains **61 unique units**; every target unit `u47`–`u49` now has **16 vocabulary records**.
- Duplicate audit: no exact declaration collisions with other English curriculum files and no duplicate words inside any of the nine target units.

The new bank is isolated in `artifacts/lengoali/src/curriculum-en-b1-b2-c1-focused-enrichment.ts`; unrelated working-tree changes were preserved.

## 16. Next Steps / Recommendations

1. **Continue Curriculum Expansion** — Add the next reviewed English unit batch only after checking lexical identity, CEFR fit, topic coverage, and duplication risk.
2. **Split Large Curriculum Files** — Keep new English batches in numbered part files to reduce the size of individual source modules and curriculum chunks.
3. **Add Interactive Elements** — Extend the existing lesson builder with richer exercises only when the schema and UI are updated together.
4. **Browser Verification** — Run the app in the browser to ensure the Learn center loads all new units correctly.
5. **Deploy to GitHub Pages** — Verify the latest build is deployed and the live URL loads without errors.

---


## 17. Repository and Deployment Links

- **GitHub Repository:** https://github.com/feratpizza-creator/Legacy-Code-Update
- **GitHub Pages URL:** https://feratpizza-creator.github.io/Legacy-Code-Update/
- **Report Location:** `docs/CURRICULUM_PROGRESS_REPORT.md`

---

*Report updated as part of the continued Lengoali B1/B2/C1 enrichment session on August 5, 2026.*
