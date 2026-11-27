import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const BASELINE_PATH = path.resolve(process.cwd(), 'i18n-baseline.json');

const ALLOWED_VISIBLE_LITERALS = new Set([
  'Kanarii',
  'KanariiLab',
  'Kanarii / Tawăzawazt',
  'S3',
  'WhatsApp',
  'Telegram',
  'Tawăzawazt',
  'Tawazawazt',
  'ℹ️',
  '→',
  '←',
  '×',
  'OK',
  'FAQ',
  'ID',
  'UID',
  '•',
  '—',
  '–',
  'v',
  '🎯',
  '📖',
  '✕',
  '🔮',
  '🌱',
  '✨',
  '❤️',
  '🌴',
  '⚡',
  '🤝',
  '✓',
  '★',
]);

const IGNORED_PROPS = new Set([
  'className',
  'id',
  'key',
  'type',
  'role',
  'aria-hidden',
  'style',
  'src',
  'href',
  'to',
  'target',
  'rel',
  'name',
  'method',
  'action',
  'autoComplete',
  'viewBox',
  'xmlns',
  'strokeWidth',
  'strokeLinecap',
  'strokeLinejoin',
  'fill',
  'd',
]);

const VISIBLE_PROPS = new Set(['title', 'placeholder', 'aria-label', 'alt', 'label']);

interface Finding {
  filePath: string;
  line: number;
  column: number;
  type: 'JSX_TEXT' | 'VISIBLE_PROP' | 'STRING_LITERAL';
  literal: string;
  allowed: boolean;
}

interface BaselineEntry {
  count: number;
  literals: string[];
}

interface BaselineData {
  generatedAt: string;
  totalViolations: number;
  totalFilesWithViolations: number;
  files: Record<string, BaselineEntry>;
}

function isNumericOrSymbolic(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return true;
  // Solo números, signos de puntuación o emojis aislados
  if (/^[\d\s.,:;+\-*/%()#@!&<>='"]+$/.test(trimmed)) return true;
  // URLs técnicas
  if (/^https?:\/\//i.test(trimmed)) return true;
  return false;
}

function scanFile(filePath: string): Finding[] {
  const findings: Finding[] = [];
  const content = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  function visit(node: ts.Node) {
    // 1. JsxText
    if (ts.isJsxText(node)) {
      const rawText = node.getText();
      const trimmed = rawText.trim().replace(/\s+/g, ' ');
      if (trimmed && !isNumericOrSymbolic(trimmed)) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        const allowed = ALLOWED_VISIBLE_LITERALS.has(trimmed);
        findings.push({
          filePath,
          line: line + 1,
          column: character + 1,
          type: 'JSX_TEXT',
          literal: trimmed,
          allowed,
        });
      }
    }

    // 2. JsxAttribute (title, placeholder, aria-label, alt, etc.)
    if (ts.isJsxAttribute(node)) {
      const propName = node.name.getText();
      if (VISIBLE_PROPS.has(propName) && node.initializer) {
        let valueText = '';
        const startPos = node.initializer.getStart();

        if (ts.isStringLiteral(node.initializer)) {
          valueText = node.initializer.text;
        } else if (
          ts.isJsxExpression(node.initializer) &&
          node.initializer.expression &&
          ts.isStringLiteral(node.initializer.expression)
        ) {
          valueText = node.initializer.expression.text;
        }

        const trimmed = valueText.trim().replace(/\s+/g, ' ');
        if (trimmed && !isNumericOrSymbolic(trimmed)) {
          const { line, character } = sourceFile.getLineAndCharacterOfPosition(startPos);
          const allowed = ALLOWED_VISIBLE_LITERALS.has(trimmed);
          findings.push({
            filePath,
            line: line + 1,
            column: character + 1,
            type: 'VISIBLE_PROP',
            literal: trimmed,
            allowed,
          });
        }
      }
    }

    // 3. StringLiteral dentro de JsxExpression simple en hijos de JSX
    if (
      ts.isJsxExpression(node) &&
      node.expression &&
      ts.isStringLiteral(node.expression) &&
      node.parent &&
      ts.isJsxElement(node.parent)
    ) {
      const trimmed = node.expression.text.trim().replace(/\s+/g, ' ');
      if (trimmed && !isNumericOrSymbolic(trimmed)) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        const allowed = ALLOWED_VISIBLE_LITERALS.has(trimmed);
        findings.push({
          filePath,
          line: line + 1,
          column: character + 1,
          type: 'STRING_LITERAL',
          literal: trimmed,
          allowed,
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return findings;
}

function getTsxFilesRecursively(dirOrFile: string): string[] {
  if (!fs.existsSync(dirOrFile)) return [];
  const stat = fs.statSync(dirOrFile);
  if (stat.isFile()) {
    if (dirOrFile.endsWith('.tsx') || dirOrFile.endsWith('.jsx')) {
      return [dirOrFile];
    }
    return [];
  }

  let results: string[] = [];
  const list = fs.readdirSync(dirOrFile);
  for (const file of list) {
    if (
      file === 'node_modules' ||
      file === 'dist' ||
      file === 'build' ||
      file === '.git' ||
      file === '.tmp' ||
      file === '_archived'
    ) {
      continue;
    }
    const fullPath = path.join(dirOrFile, file);
    results = results.concat(getTsxFilesRecursively(fullPath));
  }
  return results;
}

function runCLI() {
  const rawArgs = process.argv.slice(2);
  const flags = new Set(rawArgs.filter((a) => a.startsWith('--')));
  const targetPaths = rawArgs.filter((a) => !a.startsWith('--'));

  const isGenerateBaseline = flags.has('--generate-baseline');
  const isCheckBaseline = flags.has('--check-baseline') || flags.has('--ratchet');
  const isQuiet = flags.has('--quiet');
  const isSummaryOnly = flags.has('--summary');

  // Si no se pasaron rutas, usar por defecto src/pages y src/components
  const effectivePaths =
    targetPaths.length > 0 ? targetPaths : ['src/pages', 'src/components'];

  let filesToScan: string[] = [];
  for (const target of effectivePaths) {
    const fullPath = path.resolve(process.cwd(), target);
    filesToScan = filesToScan.concat(getTsxFilesRecursively(fullPath));
  }

  // Eliminar duplicados y ordenar deterministamente
  filesToScan = Array.from(new Set(filesToScan)).sort();

  const currentViolationsByFile: Record<string, { count: number; literals: string[]; items: Finding[] }> = {};
  let totalCandidates = 0;
  let totalAllowed = 0;
  let totalViolations = 0;

  for (const file of filesToScan) {
    const relativePath = path.relative(process.cwd(), file);
    const findings = scanFile(file);
    const violations = findings.filter((f) => !f.allowed);

    totalCandidates += findings.length;
    totalAllowed += findings.length - violations.length;

    if (violations.length > 0) {
      totalViolations += violations.length;
      currentViolationsByFile[relativePath] = {
        count: violations.length,
        literals: violations.map((v) => v.literal),
        items: violations,
      };
    }
  }

  const filesWithViolationsCount = Object.keys(currentViolationsByFile).length;

  // CASO 1: Generar Baseline
  if (isGenerateBaseline) {
    const baselineData: BaselineData = {
      generatedAt: new Date().toISOString(),
      totalViolations,
      totalFilesWithViolations: filesWithViolationsCount,
      files: {},
    };

    for (const [file, data] of Object.entries(currentViolationsByFile)) {
      baselineData.files[file] = {
        count: data.count,
        literals: data.literals,
      };
    }

    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baselineData, null, 2) + '\n', 'utf8');
    console.log(`\n✅ Baseline i18n generado exitosamente en ${BASELINE_PATH}`);
    console.log(`   - Archivos auditados: ${filesToScan.length}`);
    console.log(`   - Archivos con violaciones: ${filesWithViolationsCount}`);
    console.log(`   - Violaciones totales congeladas: ${totalViolations}\n`);
    process.exit(0);
  }

  // CASO 2: Verificar contra Baseline (Quality Gate Trinquete / Ratchet)
  if (isCheckBaseline) {
    if (!fs.existsSync(BASELINE_PATH)) {
      console.error(`\n❌ ERROR: No se encontró el archivo de baseline i18n en: ${BASELINE_PATH}`);
      console.error(`   Ejecuta: npx tsx scripts/check-i18n-visible-literals.ts --generate-baseline\n`);
      process.exit(1);
    }

    const baseline: BaselineData = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
    const regressions: string[] = [];

    // 1. Archivos con más violaciones de las permitidas en baseline o archivos nuevos con violaciones
    for (const [file, current] of Object.entries(currentViolationsByFile)) {
      const baseEntry = baseline.files[file];
      if (!baseEntry) {
        regressions.push(
          `❌ [ARCHIVO NUEVO CON VIOLACIONES] ${file}: ${current.count} violaciones detectadas (no existía en baseline).`
        );
      } else if (current.count > baseEntry.count) {
        const delta = current.count - baseEntry.count;
        regressions.push(
          `❌ [REGRESIÓN] ${file}: ${current.count} violaciones (baseline tenía ${baseEntry.count}, +${delta} nuevas).`
        );
      }
    }

    // 2. Comprobación global de total
    const totalDiff = totalViolations - baseline.totalViolations;

    if (regressions.length > 0 || totalDiff > 0) {
      console.error(`\n🚨 FALLO DE CONTROL DE CALIDAD i18n (TRINQUETE / RATCHET DETECTÓ REGRESIONES):`);
      console.error(`----------------------------------------------------------------------`);
      for (const reg of regressions) {
        console.error(reg);
      }
      if (totalDiff > 0) {
        console.error(`❌ Total global de violaciones aumentó: ${totalViolations} vs ${baseline.totalViolations} (+${totalDiff}).`);
      }
      console.error(`----------------------------------------------------------------------`);
      console.error(`Regla: Está estrictamente prohibido introducir nuevo copy hardcodeado en JSX.`);
      console.error(`Por favor extrae los textos a los archivos en src/locales/{es,en} y usa t().\n`);
      process.exit(1);
    }

    // Si no hay regresiones
    console.log(`\n🛡️  VALIDACIÓN DE TRINQUETE i18n: ✅ SUPERADA (Cero regresiones)`);
    console.log(`   - Violaciones actuales : ${totalViolations}`);
    console.log(`   - Baseline registrado  : ${baseline.totalViolations}`);

    if (totalViolations < baseline.totalViolations) {
      const reduced = baseline.totalViolations - totalViolations;
      console.log(`   🎉 ¡PROGRESO! Se han erradicado ${reduced} violaciones (de ${baseline.totalViolations} a ${totalViolations}).`);
      console.log(`   💡 Recuerda ejecutar con --generate-baseline al finalizar para sellar la nueva línea base.`);
    } else if (totalViolations === 0) {
      console.log(`   🎉 ¡PERFECCIÓN! El proyecto tiene 0 literales hardcodeados pendientes.`);
    }
    console.log();
    process.exit(0);
  }

  // CASO 3: Modo Auditoría / Reporte Clásico
  console.log(`\n🔍 Auditando copy visible hardcodeado en ${filesToScan.length} archivo(s) TSX/JSX...\n`);

  if (!isSummaryOnly) {
    for (const [file, data] of Object.entries(currentViolationsByFile)) {
      for (const f of data.items) {
        if (!isQuiet) {
          console.warn(`⚠️ [WARNING] ${file}:${f.line}:${f.column} (${f.type}) → "${f.literal}"`);
        }
      }
    }
  } else {
    const sorted = Object.entries(currentViolationsByFile).sort((a, b) => b[1].count - a[1].count);
    for (const [file, data] of sorted) {
      console.log(`  ${data.count.toString().padStart(3)} violaciones: ${file}`);
    }
  }

  console.log('--------------------------------------------------');
  console.log(`📊 Totales de Auditoría:`);
  console.log(`  - Archivos inspeccionados : ${filesToScan.length}`);
  console.log(`  - Archivos con warnings   : ${filesWithViolationsCount}`);
  console.log(`  - Candidatos detectados   : ${totalCandidates}`);
  console.log(`  - Excepciones permitidas  : ${totalAllowed}`);
  console.log(`  - Warnings reportados     : ${totalViolations}`);
  console.log('--------------------------------------------------\n');

  process.exit(0);
}

runCLI();
