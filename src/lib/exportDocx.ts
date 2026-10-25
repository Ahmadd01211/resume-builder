import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';
import { resumeTemplates, type Entry, type Resume, type ResumeSection } from './resume';

const BODY_SIZE = 20; // docx uses half-points: 20 = 10 pt
const run = (text: string, options: { bold?: boolean; italics?: boolean; size?: number; style?: string; font?: string; color?: string } = {}) =>
  new TextRun({ text, font: options.font ?? 'Arial', size: BODY_SIZE, ...options });

function safeHref(value: string, kind: 'url' | 'email' | 'phone'): string | undefined {
  if (kind === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? `mailto:${value}` : undefined;
  if (kind === 'phone') {
    const phone = value.replace(/[^\d+]/g, '');
    return phone ? `tel:${phone}` : undefined;
  }
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^(www\.)?[a-z0-9.-]+\.[a-z]{2,}(?::\d+)?(?:\/\S*)?$/i.test(trimmed)) return `https://${trimmed}`;
  return undefined;
}

function linkedText(value: string, kind: 'url' | 'email' | 'phone') {
  const link = safeHref(value, kind);
  return link
    ? new ExternalHyperlink({ link, children: [run(value, { style: 'Hyperlink' })] })
    : run(value);
}

function entryTitle(section: ResumeSection, entry: Entry) {
  if (section.kind === 'references') return entry.name || '';
  return entry.role || entry.name || entry.qualification || entry.school || '';
}

function makeEntry(section: ResumeSection, entry: Entry): Paragraph[] {
  const result: Paragraph[] = [];
  const title = entryTitle(section, entry);
  const date = entry.dates || entry.date || '';
  if (title || date) {
    const children: (TextRun | ExternalHyperlink)[] = [];
    if (title) children.push(run(title, { bold: true }));
    if (title && date) children.push(run('   '));
    if (date) children.push(run(date));
    result.push(new Paragraph({ children, spacing: { before: 40, after: 20 }, keepNext: !!entry.organization || !!entry.issuer || !!entry.details }));
  }

  const secondary = [
    entry.school && entry.qualification ? entry.school : entry.organization || entry.issuer || (section.kind === 'references' ? entry.role : entry.school),
    entry.location,
  ].filter(Boolean).join(' · ');
  if (secondary) result.push(new Paragraph({ children: [run(secondary, { italics: true })], spacing: { after: 20 }, keepNext: !!entry.details }));

  if (section.kind === 'references') {
    const contact: (TextRun | ExternalHyperlink)[] = [];
    if (entry.email) contact.push(linkedText(entry.email, 'email'));
    if (entry.email && entry.phone) contact.push(run(' · '));
    if (entry.phone) contact.push(linkedText(entry.phone, 'phone'));
    if ((entry.email || entry.phone) && entry.relationship) contact.push(run(' · '));
    if (entry.relationship) contact.push(run(entry.relationship));
    if (contact.length) result.push(new Paragraph({ children: contact, spacing: { after: 20 } }));
  }

  if (entry.link) result.push(new Paragraph({ children: [linkedText(entry.link, 'url')], spacing: { after: 20 } }));
  const detail = entry.details || entry.text || '';
  for (const item of detail.split(/\n|•/).map((value) => value.trim()).filter(Boolean)) {
    result.push(new Paragraph({
      children: [run(item)],
      bullet: { level: 0 },
      // Keep the bullet glyph inside the text block and provide enough hanging
      // indent for it to remain distinct in Word and PDF exports.
      indent: { left: 420, hanging: 240 },
      spacing: { after: 20 },
    }));
  }
  if (entry.level) result.push(new Paragraph({ children: [run(entry.level)], spacing: { after: 20 } }));
  return result;
}

export async function buildResumeDocx(resume: Resume): Promise<Blob> {
  const contact = resume.sections.find((section) => section.kind === 'contact')?.entries[0];
  const children: Paragraph[] = [];
  const template = resume.template ?? 'simple';
  const design = resumeTemplates.find(item => item.id === template) ?? resumeTemplates[0];
  const leftAligned = ['modern', 'minimal', 'professional', 'bold', 'editorial', 'ocean', 'graphite', 'scholarly', 'ledger', 'columnist', 'skyline', 'evergreen', 'cobalt', 'spruce', 'whisper', 'ivory', 'quiet', 'ember', 'aubergine', 'crimson', 'midnight', 'citrus'].includes(template);
  const headerAlignment = leftAligned ? AlignmentType.LEFT : AlignmentType.CENTER;
  const serif = ['classic', 'traditional', 'elegant', 'editorial', 'copper', 'scholarly', 'heritage', 'ledger', 'formal', 'columnist', 'linen', 'ivory'].includes(template);
  const headingFont = serif ? 'Times New Roman' : 'Arial';
  const headingColor = design.accent;
  const naturalCase = ['minimal', 'elegant', 'editorial', 'copper', 'airy', 'scholarly', 'heritage', 'ledger', 'columnist', 'whisper', 'linen', 'balanced', 'ivory', 'quiet'].includes(template);
  const openSpacing = ['editorial', 'copper', 'airy', 'heritage', 'columnist', 'horizon', 'whisper', 'linen', 'balanced', 'ivory', 'quiet'].includes(template);
  const headingSize = design.category === 'bold' ? 36 : design.category === 'minimal' ? 32 : 34;
  const sectionRule = { bottom: { style: BorderStyle.SINGLE, color: headingColor, size: design.category === 'bold' ? 12 : design.category === 'minimal' ? 3 : 6, space: 3 } };

  if (resume.sections.find((section) => section.kind === 'contact')?.visible !== false) {
    const name = contact?.name || 'YOUR NAME';
    children.push(new Paragraph({
      alignment: headerAlignment,
      spacing: { after: openSpacing ? 80 : 40 },
      children: [run(naturalCase ? name : name.toUpperCase(), { bold: true, size: headingSize, font: headingFont, color: headingColor })],
    }));
    if (contact?.role) children.push(new Paragraph({ alignment: headerAlignment, spacing: { after: 40 }, children: [run(contact.role, { bold: true, font: headingFont, color: headingColor })] }));
    const details: (TextRun | ExternalHyperlink)[] = [];
    const fields: Array<{ value?: string; kind: 'url' | 'email' | 'phone' | 'text' }> = [
      { value: contact?.location, kind: 'text' }, { value: contact?.phone, kind: 'phone' },
      { value: contact?.email, kind: 'email' }, { value: contact?.link, kind: 'url' },
    ];
    for (const field of fields.filter((item) => item.value?.trim())) {
      if (details.length) details.push(run('  |  '));
      details.push(field.kind === 'text' ? run(field.value!) : linkedText(field.value!, field.kind));
    }
    if (details.length) children.push(new Paragraph({ alignment: headerAlignment, spacing: { after: openSpacing ? 240 : 180 }, children: details }));
  }

  for (const section of resume.sections) {
    if (section.kind === 'contact' || !section.visible) continue;
    const entries = section.entries.filter((entry) => Object.entries(entry).some(([key, value]) => key !== 'id' && value.trim()));
    if (!entries.length) continue;
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      keepNext: true,
      spacing: { before: openSpacing ? 230 : 180, after: 70 },
      border: sectionRule,
      children: [run(naturalCase ? section.title : section.title.toUpperCase(), { bold: true, size: design.category === 'bold' ? 23 : 22, font: headingFont, color: headingColor })],
    }));
    if (section.kind === 'skills') {
      children.push(new Paragraph({
        spacing: { after: 60 },
        children: entries.flatMap((entry, index) => [
          ...(index ? [run('  ·  ')] : []),
          run(`${entry.name || ''}${entry.group ? ` (${entry.group})` : ''}`),
        ]),
      }));
    } else if (section.kind === 'summary') {
      if (entries[0]?.text?.trim()) children.push(new Paragraph({ children: [run(entries[0].text)], spacing: { after: 60 } }));
    } else {
      for (const entry of entries) children.push(...makeEntry(section, entry));
    }
  }

  const document = new Document({
    creator: 'ClearCV',
    title: `${contact?.name || resume.name} resume`,
    sections: [{
      properties: { page: { margin: { top: 720, right: 900, bottom: 720, left: 900 } } },
      children,
    }],
  });
  return Packer.toBlob(document);
}

