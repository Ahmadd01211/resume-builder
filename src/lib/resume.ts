export type Entry = Record<string, string> & { id: string };
export type ResumeSection = { id: string; title: string; kind: string; visible: boolean; entries: Entry[] };
export type ResumeTemplate = 'simple' | 'classic' | 'compact' | 'modern' | 'minimal' | 'traditional' | 'professional' | 'student' | 'elegant' | 'bold';
export const resumeTemplates: { id: ResumeTemplate; name: string; description: string }[] = [
  { id: 'simple', name: 'Simple', description: 'Clean and balanced' },
  { id: 'classic', name: 'Classic', description: 'Traditional serif headings' },
  { id: 'compact', name: 'Compact', description: 'More content per page' },
  { id: 'modern', name: 'Modern', description: 'Left-aligned with a subtle accent' },
  { id: 'minimal', name: 'Minimal', description: 'Open spacing and light dividers' },
  { id: 'traditional', name: 'Traditional', description: 'Formal, centered header' },
  { id: 'professional', name: 'Professional', description: 'Structured with a cool blue accent' },
  { id: 'student', name: 'Student', description: 'Friendly, clear, and entry-level focused' },
  { id: 'elegant', name: 'Elegant', description: 'Refined serif typography and warm details' },
  { id: 'bold', name: 'Bold', description: 'Confident headings with strong contrast' },
];
export type Resume = { id: string; name: string; updatedAt: number; template?: ResumeTemplate; sections: ResumeSection[] };
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
export function cleanResume(data: unknown): Resume | null {
 if(!data||typeof data!=='object')return null; const c=data as Partial<Resume>; if(typeof c.name!=='string'||!Array.isArray(c.sections))return null;
 const sections=c.sections.filter(s=>s&&typeof s==='object'&&typeof s.title==='string'&&Array.isArray(s.entries)).map(s=>({id:typeof s.id==='string'?s.id:uid(),kind:typeof s.kind==='string'?s.kind:'custom',title:s.title,visible:s.visible!==false,entries:s.entries.filter(e=>e&&typeof e==='object').map(e=>{const row=e as Record<string,unknown>;const safe:Entry={id:typeof row.id==='string'?row.id:uid()};for(const [key,value] of Object.entries(row))if(key!=='id'&&typeof value==='string')safe[key]=value;return safe;})}));
 const validTemplates: ResumeTemplate[] = ['simple','classic','compact','modern','minimal','traditional','professional','student','elegant','bold'];
 return {id:typeof c.id==='string'?c.id:uid(),name:c.name,updatedAt:typeof c.updatedAt==='number'?c.updatedAt:Date.now(),template:validTemplates.includes(c.template as ResumeTemplate)?c.template as ResumeTemplate:'simple',sections};
}


