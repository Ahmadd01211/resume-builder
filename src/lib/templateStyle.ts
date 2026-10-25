import { resumeTemplates, type ResumeTemplate } from './resume';

const leftAligned = new Set<ResumeTemplate>(['modern', 'minimal', 'professional', 'bold', 'editorial', 'ocean', 'graphite', 'scholarly', 'ledger', 'columnist', 'skyline', 'evergreen', 'cobalt', 'spruce', 'whisper', 'ivory', 'quiet', 'ember', 'aubergine', 'crimson', 'midnight', 'citrus']);
const serif = new Set<ResumeTemplate>(['classic', 'traditional', 'elegant', 'editorial', 'copper', 'scholarly', 'heritage', 'ledger', 'formal', 'columnist', 'linen', 'ivory']);
const naturalNameCase = new Set<ResumeTemplate>(['minimal', 'elegant', 'editorial', 'copper', 'airy', 'scholarly', 'heritage', 'ledger', 'columnist', 'whisper', 'linen', 'balanced', 'ivory', 'quiet']);
const naturalSectionCase = new Set<ResumeTemplate>(['classic', 'minimal', 'elegant', 'editorial', 'copper', 'airy', 'scholarly', 'heritage', 'ledger', 'formal', 'columnist', 'spruce', 'whisper', 'linen', 'balanced', 'ivory', 'citrus']);
const openSpacing = new Set<ResumeTemplate>(['editorial', 'copper', 'airy', 'heritage', 'columnist', 'horizon', 'whisper', 'linen', 'balanced', 'ivory', 'quiet']);

export function getTemplateStyle(id: ResumeTemplate = 'simple') {
  const template = resumeTemplates.find(item => item.id === id) ?? resumeTemplates[0];
  return {
    ...template,
    alignment: leftAligned.has(template.id) ? 'left' as const : 'center' as const,
    headingFont: serif.has(template.id) ? 'Times New Roman' as const : 'Arial' as const,
    naturalNameCase: naturalNameCase.has(template.id),
    naturalSectionCase: naturalSectionCase.has(template.id),
    openSpacing: openSpacing.has(template.id),
    nameSize: template.category === 'bold' ? 36 : template.category === 'minimal' ? 32 : 34,
    sectionSize: template.category === 'bold' ? 23 : 22,
    ruleSize: template.category === 'bold' ? 12 : template.category === 'minimal' ? 3 : 6,
  };
}
