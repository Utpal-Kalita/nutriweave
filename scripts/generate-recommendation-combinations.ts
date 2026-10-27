import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  CANDIDATE_INCLUDE_NUTRITIONAL_STRATEGY,
  calculateRiceRecommendation,
  generateFiveQuestionCombinations,
} from '../src/lib/recommendation';

const combinations = generateFiveQuestionCombinations();
const currentCounts = { 1: 0, 2: 0, 3: 0 };
const candidateCounts = { 1: 0, 2: 0, 3: 0 };
let changedResults = 0;

const rows = combinations.map((answers) => {
  const current = calculateRiceRecommendation(answers);
  const candidate = calculateRiceRecommendation(answers, CANDIDATE_INCLUDE_NUTRITIONAL_STRATEGY);
  const changed = current.level !== candidate.level;

  currentCounts[current.level] += 1;
  candidateCounts[candidate.level] += 1;
  if (changed) changedResults += 1;

  return [
    answers.protein,
    answers.minerals,
    answers.gi,
    answers.taste,
    answers.overallNutrition,
    current.nutritionPriority,
    current.level,
    current.polishingPercentage,
    candidate.nutritionPriority,
    candidate.level,
    candidate.polishingPercentage,
    changed ? 'Yes' : 'No',
  ].join(',');
});

const header = [
  'Protein',
  'Minerals',
  'GI',
  'Taste',
  'Nutritional',
  'Current Nutrition Priority',
  'Current Level',
  'Current Polishing Percentage',
  'Candidate Nutrition Priority',
  'Candidate Level',
  'Candidate Polishing Percentage',
  'Candidate Changes Result',
].join(',');

const outputPath = resolve('docs/recommendation-combinations-243.csv');
writeFileSync(outputPath, `${header}\n${rows.join('\n')}\n`, 'utf8');

console.log(`Generated ${combinations.length} combinations at ${outputPath}`);
console.log(`Current workbook strategy: ${JSON.stringify(currentCounts)}`);
console.log(`Candidate include-Nutritional strategy: ${JSON.stringify(candidateCounts)}`);
console.log(`Changed recommendations: ${changedResults}`);
