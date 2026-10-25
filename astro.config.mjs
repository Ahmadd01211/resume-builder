import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Netlify exposes URL during builds. Other static hosts should set PUBLIC_SITE_URL.
const configuredUrl = process.env.PUBLIC_SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
const site = configuredUrl ? new URL(configuredUrl).origin : 'https://clearcv.invalid';

export default defineConfig({
  site,
  integrations: [react()],
  output: 'static',
});
