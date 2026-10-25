export type Entry = Record<string, string> & { id: string };
export type ResumeSection = { id: string; title: string; kind: string; visible: boolean; entries: Entry[] };
export type ResumeTemplateCategory = 'classic' | 'modern' | 'minimal' | 'bold';
export type ResumeTemplate = 'simple' | 'classic' | 'compact' | 'modern' | 'minimal' | 'traditional' | 'professional' | 'student' | 'elegant' | 'bold' | 'editorial' | 'ocean' | 'copper' | 'graphite' | 'airy' | 'scholarly' | 'heritage' | 'ledger' | 'formal' | 'columnist' | 'skyline' | 'evergreen' | 'cobalt' | 'spruce' | 'horizon' | 'whisper' | 'linen' | 'balanced' | 'ivory' | 'quiet' | 'ember' | 'aubergine' | 'crimson' | 'midnight' | 'citrus';
export type ResumeTemplateDefinition = { id: ResumeTemplate; name: string; description: string; category: ResumeTemplateCategory; accent: string };
export const resumeTemplates: ResumeTemplateDefinition[] = [
  { id: 'simple', name: 'Simple', description: 'Clean and balanced', category: 'minimal', accent: '4B6855' },
  { id: 'classic', name: 'Classic', description: 'Traditional serif headings', category: 'classic', accent: '78654E' },
  { id: 'compact', name: 'Compact', description: 'More content per page', category: 'minimal', accent: '52665B' },
  { id: 'modern', name: 'Modern', description: 'Left-aligned with a subtle accent', category: 'modern', accent: '286A50' },
  { id: 'minimal', name: 'Minimal', description: 'Open spacing and light dividers', category: 'minimal', accent: '7A8980' },
  { id: 'traditional', name: 'Traditional', description: 'Formal, centered header', category: 'classic', accent: '707A72' },
  { id: 'professional', name: 'Professional', description: 'Structured with a cool blue accent', category: 'modern', accent: '315B83' },
  { id: 'student', name: 'Student', description: 'Friendly and clear', category: 'modern', accent: '286A50' },
  { id: 'elegant', name: 'Elegant', description: 'Refined serif and warm details', category: 'classic', accent: '6C5944' },
  { id: 'bold', name: 'Bold', description: 'Strong contrast', category: 'bold', accent: '263B5A' },
  { id: 'editorial', name: 'Editorial', description: 'Literary serif and crisp rules', category: 'classic', accent: '292F2C' },
  { id: 'ocean', name: 'Ocean', description: 'Fresh teal and open spacing', category: 'modern', accent: '17636A' },
  { id: 'copper', name: 'Copper', description: 'Warm accents and classic type', category: 'classic', accent: '9A5135' },
  { id: 'graphite', name: 'Graphite', description: 'Sharp monochrome structure', category: 'bold', accent: '30383E' },
  { id: 'airy', name: 'Airy', description: 'Soft lines and generous space', category: 'minimal', accent: '486970' },
  { id: 'scholarly', name: 'Scholarly', description: 'Academic serif with fine rules', category: 'classic', accent: '3F5366' },
  { id: 'heritage', name: 'Heritage', description: 'Timeless centered masthead', category: 'classic', accent: '6A463B' },
  { id: 'ledger', name: 'Ledger', description: 'Orderly dates and dividers', category: 'classic', accent: '52654D' },
  { id: 'formal', name: 'Formal', description: 'Conservative and precise', category: 'classic', accent: '33404D' },
  { id: 'columnist', name: 'Columnist', description: 'Editorial name and section lines', category: 'classic', accent: '755543' },
  { id: 'skyline', name: 'Skyline', description: 'Urban blue geometry', category: 'modern', accent: '315D84' },
  { id: 'evergreen', name: 'Evergreen', description: 'Deep green and clean lines', category: 'modern', accent: '245D4B' },
  { id: 'cobalt', name: 'Cobalt', description: 'Bright blue professional look', category: 'modern', accent: '2A5FA8' },
  { id: 'spruce', name: 'Spruce', description: 'Cool green with quiet detail', category: 'modern', accent: '36716C' },
  { id: 'horizon', name: 'Horizon', description: 'Open blue header and spacing', category: 'modern', accent: '477C9B' },
  { id: 'whisper', name: 'Whisper', description: 'Light rules and gentle rhythm', category: 'minimal', accent: '6B807B' },
  { id: 'linen', name: 'Linen', description: 'Warm neutral and soft serif', category: 'minimal', accent: '867260' },
  { id: 'balanced', name: 'Balanced', description: 'Symmetrical and understated', category: 'minimal', accent: '596876' },
  { id: 'ivory', name: 'Ivory', description: 'Graceful type with open margins', category: 'minimal', accent: '917C65' },
  { id: 'quiet', name: 'Quiet', description: 'Small details, ample white space', category: 'minimal', accent: '6C7970' },
  { id: 'ember', name: 'Ember', description: 'Terracotta with bold rules', category: 'bold', accent: 'A35039' },
  { id: 'aubergine', name: 'Aubergine', description: 'Rich plum and strong headings', category: 'bold', accent: '624765' },
  { id: 'crimson', name: 'Crimson', description: 'Confident red accents', category: 'bold', accent: '9A3F49' },
  { id: 'midnight', name: 'Midnight', description: 'Deep navy and crisp contrast', category: 'bold', accent: '243A56' },
  { id: 'citrus', name: 'Citrus', description: 'Fresh olive and dark type', category: 'bold', accent: '677536' },
];
export type Resume = { id: string; name: string; updatedAt: number; template?: ResumeTemplate; sample?: boolean; sections: ResumeSection[] };
export const sectionDefinitions: Record<string, { title: string; fields: { key: string; label: string; multiline?: boolean; placeholder?: string }[] }> = {
  contact: { title: 'Personal details', fields: [] },
  summary: { title: 'Professional summary', fields: [{ key: 'text', label: 'Short introduction', multiline: true, placeholder: 'A few lines about your strengths and target role.' }] },
  education: { title: 'Education', fields: [{ key: 'school', label: 'School or institution', placeholder: 'University or school name' }, { key: 'qualification', label: 'Degree / qualification', placeholder: 'Degree, diploma, or program' }, { key: 'location', label: 'Location', placeholder: 'City, country' }, { key: 'dates', label: 'Dates', placeholder: 'Aug 2022 – May 2026' }, { key: 'details', label: 'Details', multiline: true, placeholder: 'Coursework, honors, GPA, or relevant details' }] },
  skills: { title: 'Skills', fields: [{ key: 'name', label: 'Skill', placeholder: 'Excel, customer service, writing…' }, { key: 'group', label: 'Group (optional)', placeholder: 'Tools, Languages…' }] },
  projects: { title: 'Projects', fields: [{ key: 'name', label: 'Project name', placeholder: 'Project or portfolio piece' }, { key: 'organization', label: 'Organization / course', placeholder: 'Where you completed it' }, { key: 'dates', label: 'Dates', placeholder: 'Jan–Mar 2025' }, { key: 'link', label: 'Project link', placeholder: 'https://' }, { key: 'details', label: 'What you did and achieved', multiline: true, placeholder: 'Describe your contribution and result. One idea per line.' }] },
  experience: { title: 'Experience', fields: [{ key: 'role', label: 'Role / title', placeholder: 'Role or position' }, { key: 'organization', label: 'Employer / organization', placeholder: 'Company or organization' }, { key: 'location', label: 'Location', placeholder: 'City, country' }, { key: 'dates', label: 'Dates', placeholder: 'Jun–Aug 2025' }, { key: 'details', label: 'Achievements and responsibilities', multiline: true, placeholder: 'What you did, how you did it, and the result.' }] },
  certificates: { title: 'Certificates', fields: [{ key: 'name', label: 'Certificate', placeholder: 'Certificate name' }, { key: 'issuer', label: 'Issuer', placeholder: 'Organization' }, { key: 'dates', label: 'Date', placeholder: '2025' }, { key: 'link', label: 'Credential link (optional)', placeholder: 'https://' }] },
  volunteering: { title: 'Volunteering', fields: [{ key: 'role', label: 'Role', placeholder: 'Volunteer role' }, { key: 'organization', label: 'Organization', placeholder: 'Organization name' }, { key: 'dates', label: 'Dates', placeholder: '2024–2025' }, { key: 'details', label: 'Contribution', multiline: true, placeholder: 'Describe your contribution and results.' }] },
  awards: { title: 'Awards & activities', fields: [{ key: 'name', label: 'Award or activity', placeholder: 'Name' }, { key: 'organization', label: 'Organization', placeholder: 'Awarding organization or group' }, { key: 'dates', label: 'Date', placeholder: '2025' }, { key: 'details', label: 'Details (optional)', multiline: true, placeholder: 'Add brief context.' }] },
  languages: { title: 'Languages', fields: [{ key: 'name', label: 'Language', placeholder: 'Language' }, { key: 'level', label: 'Proficiency', placeholder: 'Native, fluent, conversational…' }] },
  references: { title: 'References', fields: [{ key: 'name', label: 'Name', placeholder: 'Reference name' }, { key: 'role', label: 'Title and organization', placeholder: 'Title, organization' }, { key: 'email', label: 'Email', placeholder: 'name@example.com' }, { key: 'phone', label: 'Phone', placeholder: 'Phone number' }, { key: 'relationship', label: 'Relationship', placeholder: 'Supervisor, instructor…' }] },
  custom: { title: 'Custom section', fields: [{ key: 'text', label: 'Details', multiline: true, placeholder: 'Add information for this section.' }] },
};
const uid = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const newEntry = (): Entry => ({ id: uid() });
export const newSection = (kind: string): ResumeSection => ({ id: uid(), kind, title: sectionDefinitions[kind]?.title ?? 'Custom section', visible: true, entries: [] });
export const createResume = (name = 'My resume'): Resume => ({ id: uid(), name, updatedAt: Date.now(), template: 'simple', sections: ['contact','summary','education','skills','projects','experience','certificates'].map((kind) => newSection(kind)) });
export function starterResume(): Resume {
 const resume = createResume('My first resume'); const contact = resume.sections[0]; contact.entries = [{ ...newEntry(), name:'Your Name', role:'', email:'', phone:'', location:'City, country', link:'' }];
 const summary = resume.sections.find(s=>s.kind==='summary')!; summary.entries=[{...newEntry(),text:'A motivated student ready to contribute strong communication, organization, and problem-solving skills in an entry-level role.'}];
 const edu=resume.sections.find(s=>s.kind==='education')!; edu.entries=[{...newEntry(),school:'Your school or college',qualification:'Degree or qualification',location:'City, country',dates:'Expected graduation: 2026',details:'Relevant coursework, honors, or academic achievements'}];
 resume.sections.find(s=>s.kind==='skills')!.entries=['Communication','Organization','Google Workspace'].map(name=>({...newEntry(),name,group:''}));
 resume.sections.find(s=>s.kind==='projects')!.entries=[{...newEntry(),name:'Class or personal project',organization:'Course or organization',dates:'2025',details:'Describe what you created, the skills you used, and the outcome.'}]; return resume;
}
/** A fictional, complete student CV users can browse and copy as a guide. */
export function exampleResume(): Resume {
 const resume = createResume('Example CV — Maya Chen'); resume.sample = true; resume.template = 'student';
 const put = (kind: string, rows: Record<string,string>[]) => { const section=resume.sections.find(s=>s.kind===kind)!; section.entries=rows.map(row=>({...newEntry(),...row})); };
 put('contact',[{name:'Maya Chen',role:'Student | Entry-level marketing assistant',email:'maya.chen@example.com',phone:'+1 555 010 2026',location:'Austin, TX',link:'linkedin.com/in/maya-chen'}]);
 put('summary',[{text:'Organized communications student with experience creating social content for campus events and supporting customer needs in a busy retail setting. Brings clear writing, attention to detail, and practical Canva and Excel skills. Seeking an entry-level marketing or communications role.'}]);
 put('education',[{school:'Austin Community College',qualification:'A.A. in Communication Studies',location:'Austin, TX',dates:'Expected May 2027',details:'Relevant coursework: Digital Media, Public Speaking, Business Writing'}]);
 put('skills',[{name:'Content writing',group:'Communication'},{name:'Canva',group:'Tools'},{name:'Microsoft Excel',group:'Tools'},{name:'Customer service',group:'Professional'}]);
 put('projects',[{name:'Campus Welcome Week Campaign',organization:'Student Activities Club',dates:'Aug 2025',link:'',details:'Created 8 social media graphics in Canva for a student welcome campaign.\nCoordinated a posting calendar with 4 club volunteers and helped increase event sign-ups by 20% compared with the prior semester.'}]);
 put('experience',[{role:'Sales Associate',organization:'Greenway Market',location:'Austin, TX',dates:'Jun 2025 – Present',details:'Assist 30+ customers per shift with product questions and checkout.\nRestock featured products and keep displays organized, helping the team maintain a welcoming store.'}]);
 put('certificates',[{name:'Google Digital Marketing & E-commerce Certificate',issuer:'Google / Coursera',dates:'2025',link:''}]);
 return resume;
}

export function cleanResume(data: unknown): Resume | null {
 if(!data||typeof data!=='object')return null; const c=data as Partial<Resume>; if(typeof c.name!=='string'||!Array.isArray(c.sections))return null;
 const sections=c.sections.filter(s=>s&&typeof s==='object'&&typeof s.title==='string'&&Array.isArray(s.entries)).map(s=>({id:typeof s.id==='string'?s.id:uid(),kind:typeof s.kind==='string'?s.kind:'custom',title:s.title,visible:s.visible!==false,entries:s.entries.filter(e=>e&&typeof e==='object').map(e=>{const row=e as Record<string,unknown>;const safe:Entry={id:typeof row.id==='string'?row.id:uid()};for(const [key,value] of Object.entries(row))if(key!=='id'&&typeof value==='string')safe[key]=value;return safe;})}));
 const template = resumeTemplates.find(item => item.id === c.template)?.id ?? 'simple';
 return {id:typeof c.id==='string'?c.id:uid(),name:c.name,updatedAt:typeof c.updatedAt==='number'?c.updatedAt:Date.now(),template,sample:c.sample===true,sections};
}


