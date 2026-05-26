// Convert the TMX listed-companies XLSX into JSON for the demo.
// Usage: node scripts/parse_tmx.mjs > scripts/tmx_listed.json
import XLSX from "xlsx";

const wb = XLSX.readFile("scripts/tmx_listed.xlsx");
const sheets = wb.SheetNames;
const rowsBySheet = {};
let totalRows = 0;
for (const name of sheets) {
  const ws = wb.Sheets[name];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
  rowsBySheet[name] = rows;
  totalRows += rows.length;
}
process.stderr.write(`sheets: ${sheets.join(", ")}\n`);
process.stderr.write(`total rows: ${totalRows}\n`);
process.stderr.write(`sample first row of first sheet: ${JSON.stringify(rowsBySheet[sheets[0]]?.[0] ?? null).slice(0, 600)}\n`);
process.stdout.write(JSON.stringify(rowsBySheet, null, 0));
