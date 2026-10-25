import { useMemo, useState, type CSSProperties } from 'react';
import { resumeTemplates, type ResumeTemplate, type ResumeTemplateCategory, type ResumeTemplateDefinition } from '../lib/resume';

const categories: { id: ResumeTemplateCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'bold', label: 'Bold' },
];

function TemplateSample({ template }: { template: ResumeTemplateDefinition }) {
  return <span className={`template-sample template-sample-${template.id}`} style={{ '--template-accent': `#${template.accent}` } as CSSProperties} aria-hidden="true">
    <i className="sample-name"/><i className="sample-line sample-line-long"/><i className="sample-line"/>
    <i className="sample-heading"/><i className="sample-line sample-line-long"/><i className="sample-line"/>
  </span>;
}

export default function TemplatePicker({ selected, onSelect }: { selected: ResumeTemplate; onSelect: (template: ResumeTemplate) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ResumeTemplateCategory | 'all'>('all');
  const current = resumeTemplates.find(template => template.id === selected) ?? resumeTemplates[0];
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return resumeTemplates.filter(template =>
      (category === 'all' || template.category === category) &&
      (!term || `${template.name} ${template.description} ${template.category}`.toLowerCase().includes(term))
    );
  }, [query, category]);

  return <section className="template-picker" aria-labelledby="template-picker-title">
    <div className="template-picker-heading">
      <div><h3 id="template-picker-title">Resume design</h3><p>Choose a style for your preview and downloads.</p></div>
      <span>{resumeTemplates.length} designs</span>
    </div>
    <div className="template-current">
      <TemplateSample template={current}/>
      <div className="template-current-copy"><span>SELECTED DESIGN</span><strong>{current.name}</strong><small>{current.description}</small></div>
      <button type="button" className="template-browse" aria-expanded={open} aria-controls="template-gallery" onClick={() => setOpen(value => !value)}>{open ? 'Close gallery' : 'Browse designs'}</button>
    </div>
    {open && <div className="template-gallery" id="template-gallery">
      <label className="template-search"><span className="visually-hidden">Search resume designs</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search designs"/></label>
      <div className="template-categories" role="group" aria-label="Design categories">
        {categories.map(item => <button type="button" key={item.id} className={category === item.id ? 'active' : ''} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}
      </div>
      <div className="template-results" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'design' : 'designs'}</div>
      <div className="template-grid" role="group" aria-label="Resume designs">
        {filtered.map(template => <button type="button" key={template.id} className={`template-card ${selected === template.id ? 'selected' : ''}`} aria-pressed={selected === template.id} onClick={() => onSelect(template.id)}>
          <TemplateSample template={template}/>
          <span className="template-card-copy"><strong>{template.name}</strong><span>{template.description}</span></span>
          {selected === template.id && <span className="template-selected">Selected</span>}
        </button>)}
      </div>
      {!filtered.length && <p className="template-empty">No designs match. Try another name or category.</p>}
    </div>}
  </section>;
}
