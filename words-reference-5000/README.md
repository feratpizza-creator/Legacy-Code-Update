# Lengoali External English Vocabulary Reference Library

This directory is the official reference library for external English vocabulary sources used by Lengoali. It provides a stable, clearly separated place for reference materials organized by CEFR level.

## Purpose

The files in this directory are external English vocabulary reference sources. They are used for:

- comparison with the existing Lengoali curriculum;
- curriculum validation and auditing;
- CEFR coverage analysis;
- detection of missing vocabulary and curriculum gaps;
- topic-coverage analysis;
- metadata and lexical-entry quality checks;
- carefully reviewed curriculum enrichment recommendations.

These files are **reference material only**. They are not application data and are not part of the runtime curriculum.

## Runtime isolation

Reference files must never be loaded directly into the application. They must not be imported by the frontend, included in curriculum bundles, or treated as runtime language packs.

The official Lengoali curriculum remains the single source of truth for the running application. Reference material may inform analysis and recommendations, but it must never overwrite curriculum data automatically.

Any proposed curriculum change must first be:

1. extracted and normalized from the reference source;
2. compared with the official curriculum;
3. analyzed for lexical identity, CEFR fit, meaning, topic coverage, usefulness, and duplication risk;
4. reported with an explanation and recommendation;
5. reviewed and explicitly approved before it is applied.

## Expected reference files

Future uploads should use the following convention:

```text
A1/english-a1.pdf
A2/english-a2.pdf
B1/english-b1.pdf
B2/english-b2.pdf
C1/english-c1.pdf
```

The PDF files are intentionally not included as placeholders. Empty level directories contain `.gitkeep` files only until the corresponding authoritative reference is uploaded.

The current library covers A1 through C1 because those are the planned external reference levels. A0, C2, and other language resources may be added later through an explicit architecture decision without changing the runtime curriculum boundary.

## Reference vocabulary philosophy

The PDFs are authoritative **external references**, not automatic curriculum generators. Their role is to help assess and improve the English curriculum through evidence-based comparison.

A reference entry that is absent from Lengoali must never be added automatically. Before recommending it, evaluate:

- whether it belongs to the proposed CEFR level;
- whether its CEFR classification is supported by the reference;
- whether the topic is already sufficiently covered;
- whether it provides meaningful educational value;
- whether it is useful and high priority for learners;
- whether it introduces unnecessary duplication;
- whether it is another form of an existing lemma;
- whether another lexical entry already represents the same sense;
- whether it should become a curriculum item or remain a future recommendation.

The final decision must be based on educational value, curriculum quality, and curriculum consistency—not on reference presence alone.

## Lexical comparison rules

Vocabulary must never be compared by spelling alone. Every item is treated as a lexical entry, not merely as a string.

The preferred comparison key is:

```text
lemma + part_of_speech + meaning + CEFR_level
```

For example, these are independent lexical entries and must not be treated as automatic duplicates:

- `book` — noun;
- `book` — verb;
- `work` — noun;
- `work` — verb;
- `light` — noun;
- `light` — verb;
- `light` — adjective.

The same lemma may legitimately appear at multiple CEFR levels when it represents a different grammatical role, meaning, educational objective, context, register, advanced usage, or intentional pedagogical repetition.

Where available, comparison tools should preserve and inspect additional fields such as sense, definition, example, domain, register, collocations, word family, and source provenance. A normalized spelling is useful for candidate matching, but it is never sufficient for a final duplicate decision.

## Duplicate classification

A comparison or validation report should classify repeated or related entries using one of the following categories:

- Exact Duplicate
- Different Part of Speech
- Different Meaning
- Different CEFR Progression
- Different Context
- Different Register
- Different Sense
- Intentional Pedagogical Review
- Intentional Vocabulary Reinforcement
- Suspicious Duplicate
- Accidental Duplicate

The validator must explain **why** two entries were classified differently or considered duplicates. It must not simply report that the spelling is the same.

A classification is an analysis result, not permission to modify the curriculum. Even an accidental duplicate requires review before any deletion, merge, or replacement.

## Recommended comparison workflow

Future AI agents and validation tools should follow this workflow:

```text
Reference PDFs
    ↓
Extract lexical entries
    ↓
Normalize lexical data
    ↓
Compare with the official Lengoali curriculum
    ↓
Detect missing vocabulary, possible CEFR mismatches,
duplicate lexical entries, missing metadata, curriculum gaps,
and weak topic coverage
    ↓
Analyze every proposed addition
    ↓
Generate a detailed comparison report
    ↓
Recommend improvements
    ↓
Wait for explicit approval
    ↓
Only then consider a separate curriculum change
```

The extraction and comparison stages should be read-only. Reports should identify source file, CEFR directory, lexical entry, comparison key, evidence, confidence, and recommended action.

## Prohibited automatic actions

Reference processing must never:

- delete an existing curriculum entry because the same spelling appears in a reference;
- automatically replace translations;
- automatically replace examples;
- automatically replace definitions;
- automatically replace IPA;
- automatically replace CEFR levels;
- automatically merge lexical entries;
- automatically import reference entries into the application;
- automatically modify curriculum files;
- treat a PDF as a runtime data source;
- treat a missing reference match as proof that curriculum content is wrong.

Reference files support human-reviewed curriculum improvement. They do not authorize unattended content changes.

## Guidance for future AI agents

Before using a reference file, an agent should:

1. inspect the official curriculum schema and loading pipeline;
2. confirm that the reference is being used in a read-only analysis context;
3. record the source and extraction assumptions;
4. preserve lexical distinctions rather than collapsing entries by spelling;
5. compare meaning, part of speech, CEFR level, context, and register;
6. report uncertainty instead of inventing metadata;
7. keep recommendations separate from implemented curriculum changes;
8. request explicit approval before modifying curriculum data;
9. verify that reference files are not imported into runtime code;
10. preserve all unrelated user changes and avoid destructive repository operations.

The curriculum data always remains authoritative for application behavior. This library exists to make future analysis more disciplined, transparent, and auditable.
