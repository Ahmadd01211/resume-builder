import type { APIRoute } from 'astro';

export const prerender = true;

const xmlEscape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://clearcv.invalid';
  const pages = ['/', '/privacy/'];
  const urls = pages.map((path) => `  <url><loc>${xmlEscape(new URL(path, origin).toString())}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

