import { percentage, rounded, type ValidatorModule } from "./domain";

const FIELDS = [
  "translation",
  "translationLang",
  "pos",
  "definition",
  "ipa",
  "audioUrl",
  "example",
  "exampleTranslation",
  "synonyms",
  "antonyms",
  "collocations",
  "wordFamily",
  "tags",
  "category",
] as const;

type MetadataField = (typeof FIELDS)[number];

function hasValue(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

export const metadataValidator: ValidatorModule = {
  name: "Metadata Validator",
  run({ records }) {
    const issues = [];
    const completion: Record<string, number> = {};
    for (const field of FIELDS) {
      const present = records.filter((record) => hasValue(record[field])).length;
      completion[field] = rounded(percentage(present, records.length));
      if (field === "translation" || field === "translationLang" || field === "example") {
        for (const record of records) {
          if (!hasValue(record[field])) issues.push({ module: "Metadata", severity: "warning" as const, code: `METADATA_${field.toUpperCase()}_MISSING`, path: record.path, message: `Metadata field '${field}' is missing for '${record.word || "(empty)"}'.` });
        }
      }
    }
    return { module: "Metadata Validator", issues, metrics: Object.fromEntries(FIELDS.map((field) => [`${field}Completion`, completion[field]])), data: { fields: completion, totalRecords: records.length } };
  },
};

export type { MetadataField };
