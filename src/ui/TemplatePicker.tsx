import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { resumeTemplates, type Resume, type ResumeTemplate, type ResumeTemplateCategory, type ResumeTemplateDefinition } from '../lib/resume';
import ResumePaper from './ResumePaper';

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

export default function TemplatePicker({ resume, onSelect }: { resume: Resume; onSelect: (template: ResumeTemplate) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ResumeTemplateCategory | 'all'>('all');
  const [preview, setPreview] = useState<ResumeTemplate | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const selected = resume.template ?? 'simple';
  const current = resumeTemplates.find(template => template.id === selected) ?? resumeTemplates[0];
  const previewDesign = preview ? resumeTemplates.find(template => template.id === preview) : null;
  const contact = resume.sections.find(section => section.kind === 'contact')?.entries[0] ?? { id: 'contact' };
  const openPreview = (id: ResumeTemplate) => { returnFocusRef.current = document.activeElement as HTMLElement; setPreview(id); };
  const closePreview = () => { setPreview(null); requestAnimationFrame(() => returnFocusRef.current?.focus()); };
  useEffect(() => {
    if (!preview) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePreview();
      if (event.key !== 'Tab') return;
      const buttons = [...(modalRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? [])];
      if (!buttons.length) return;
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', onKeyDown); };
  }, [preview]);
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
      <div className="template-current-actions"><button type="button" className="template-browse" onClick={() => openPreview(selected)}>Full preview</button><button type="button" className="template-browse" aria-expanded={open} aria-controls="template-gallery" onClick={() => setOpen(value => !value)}>{open ? 'Close gallery' : 'Browse designs'}</button></div>
    </div>
    {open && <div className="template-gallery" id="template-gallery">
      <label className="template-search"><span className="visually-hidden">Search resume designs</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search designs"/></label>
      <div className="template-categories" role="group" aria-label="Design categories">
        {categories.map(item => <button type="button" key={item.id} className={category === item.id ? 'active' : ''} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</button>)}
      </div>
      <div className="template-results" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'design' : 'designs'}</div>
      <div className="template-grid" role="group" aria-label="Resume designs">
        {filtered.map(template => <div className="template-option" key={template.id}>
          <button type="button" className={`template-card ${selected === template.id ? 'selected' : ''}`} aria-pressed={selected === template.id} onClick={() => onSelect(template.id)}>
            <TemplateSample template={template}/>
            <span className="template-card-copy"><strong>{template.name}</strong><span>{template.description}</span></span>
            {selected === template.id && <span className="template-selected">Selected</span>}
          </button>
          <button type="button" className="template-preview-link" aria-label={`Preview ${template.name} design`} onClick={() => openPreview(template.id)}>Full preview</button>
        </div>)}
      </div>
      {!filtered.length && <p className="template-empty">No designs match. Try another name or category.</p>}
    </div>}
    {previewDesign && <div className="design-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) closePreview(); }}>
      <div className="design-modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="design-modal-title">
        <div className="design-modal-header"><div><span>FULL PAGE PREVIEW</span><h2 id="design-modal-title">{previewDesign.name}</h2><p>{previewDesign.description}</p></div><button type="button" ref={closeRef} className="design-modal-close" aria-label="Close preview" onClick={closePreview}>×</button></div>
        <div className="design-modal-stage"><ResumePaper resume={{ ...resume, template: previewDesign.id }} contact={contact}/></div>
        <div className="design-modal-actions"><button type="button" className="button" onClick={closePreview}>Back to designs</button><button type="button" className="button button-primary" onClick={() => { onSelect(previewDesign.id); closePreview(); }}>Use this design</button></div>
      </div>
    </div>}
  </section>;
}
