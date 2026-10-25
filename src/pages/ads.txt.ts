import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = () => {
  const publisherId = import.meta.env.PUBLIC_ADSENSE_PUBLISHER_ID?.trim() ?? '';
  const validPublisher = /^pub-\d{16}$/.test(publisherId);
  const content = validPublisher
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : '# Add the publisher ID from your approved AdSense account before enabling ads.\n';
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
