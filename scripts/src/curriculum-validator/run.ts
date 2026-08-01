import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { renderReport } from "./report-generator";
import { validatePack } from "./runner";

const run = await validatePack();
const reportPath = resolve(import.meta.dirname, "../../../.curriculum-validation-report.md");
await writeFile(reportPath, renderReport(run), "utf8");
console.log(`Curriculum validation report written to ${reportPath}`);
console.log(`Records: ${run.statistics.vocabularyRecords}; errors: ${run.errorCount}; warnings: ${run.warningCount}; quality: ${run.quality.overallQuality}/100`);
if (run.errorCount > 0) {
  console.error(`Curriculum validation failed with ${run.errorCount} error(s). Review the generated report before accepting the curriculum.`);
  process.exitCode = 1;
}
