import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  MEDICAL_SAFETY_DISCLAIMER,
  BANGLADESH_HOTLINES,
  KHULNA_PRIMARY_HOSPITALS,
  CORE_PLATFORM_FEATURES,
  getPainSeverityInfo,
} from '../src/constants/medical.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendRoot = path.resolve(__dirname, '..');

describe('MedNex Frontend Day 1 Unit & Verification Suite', () => {
  test('FR-02 & NFR-15: Persistent medical disclaimer is defined and contains statutory caution', () => {
    assert.ok(MEDICAL_SAFETY_DISCLAIMER, 'Disclaimer must not be empty');
    assert.match(
      MEDICAL_SAFETY_DISCLAIMER,
      /MedNex serves as an initial assistance and informational tool/i,
      'Must contain standard MedNex advisory'
    );
    assert.match(
      MEDICAL_SAFETY_DISCLAIMER,
      /not replace professional medical consultation/i,
      'Must explicitly state it does not replace medical consultation'
    );
    assert.match(
      MEDICAL_SAFETY_DISCLAIMER,
      /999/i,
      'Must contain emergency 999 escalation instruction'
    );
  });

  test('FR-24 & NFR-13: Bangladesh Emergency Hotline constants are configured', () => {
    assert.equal(BANGLADESH_HOTLINES.NATIONAL_EMERGENCY, '999');
    assert.equal(BANGLADESH_HOTLINES.HEALTH_CALL_CENTER, '16263');
  });

  test('Khulna regional medical infrastructure includes verified primary hospitals', () => {
    assert.ok(Array.isArray(KHULNA_PRIMARY_HOSPITALS));
    assert.equal(KHULNA_PRIMARY_HOSPITALS.length, 4);

    const kmch = KHULNA_PRIMARY_HOSPITALS.find((h) => h.id === 'hosp-kmch');
    assert.ok(kmch, 'KMCH hospital record must exist');
    assert.equal(kmch.hasIcu, true);
    assert.equal(kmch.hasEmergencyWard, true);

    const abuNaser = KHULNA_PRIMARY_HOSPITALS.find((h) => h.id === 'hosp-sannsh');
    assert.ok(abuNaser, 'Shahid Sheikh Abu Naser Specialized Hospital record must exist');
  });

  test('Core platform features array covers all 7 proposed SRS capabilities', () => {
    assert.equal(CORE_PLATFORM_FEATURES.length, 7);
    const featureIds = CORE_PLATFORM_FEATURES.map((f) => f.id);

    assert.ok(featureIds.includes('symptom-checker'));
    assert.ok(featureIds.includes('doctor-directory'));
    assert.ok(featureIds.includes('emergency-ambulance'));
    assert.ok(featureIds.includes('first-aid'));
    assert.ok(featureIds.includes('report-analyzer'));
    assert.ok(featureIds.includes('medicine-safety'));
    assert.ok(featureIds.includes('fitness-vitals'));
  });

  test('NFR-05 & NFR-06: Production build generates valid HTML and bundle assets', () => {
    const distIndex = path.join(frontendRoot, 'dist', 'index.html');
    assert.ok(fs.existsSync(distIndex), 'dist/index.html must exist after vite build');

    const htmlContent = fs.readFileSync(distIndex, 'utf-8');
    assert.match(htmlContent, /<meta name="viewport"/i, 'Must contain responsive viewport meta');
    assert.match(htmlContent, /MedNex/i, 'Must contain MedNex title/branding');
  });
});

describe('MedNex Frontend Day 2 Design System & Component Library Suite', () => {
  test('FR-09: getPainSeverityInfo accurately classifies subjective pain levels', () => {
    const mild = getPainSeverityInfo(2);
    assert.equal(mild.label, 'Mild Pain');

    const moderate = getPainSeverityInfo(5);
    assert.equal(moderate.label, 'Moderate Pain');

    const severe = getPainSeverityInfo(8);
    assert.equal(severe.label, 'Severe Pain');

    const critical = getPainSeverityInfo(10);
    assert.equal(critical.label, 'Critical / Excruciating');
  });

  test('Common UI components exist in src/components/common', () => {
    const commonDir = path.join(frontendRoot, 'src', 'components', 'common');
    const expectedComponents = [
      'Badge.jsx',
      'Button.jsx',
      'Alert.jsx',
      'Modal.jsx',
      'Card.jsx',
      'Input.jsx',
      'Select.jsx',
      'Textarea.jsx',
      'RangeSlider.jsx',
      'Skeleton.jsx',
      'index.js',
    ];

    for (const file of expectedComponents) {
      assert.ok(
        fs.existsSync(path.join(commonDir, file)),
        `Component file ${file} must exist in common directory`
      );
    }
  });

  test('Design system page exists and is routed', () => {
    const pageFile = path.join(frontendRoot, 'src', 'pages', 'DesignSystemPage.jsx');
    assert.ok(fs.existsSync(pageFile), 'DesignSystemPage.jsx must exist');
  });
});
