# ClearCV Resume Builder

A browser-first, ATS-friendly resume builder for students and first-time job seekers.

## Run locally

1. Install Node.js (LTS).
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local address shown in the terminal.

## What is included

- Reusable resume sections: personal details, summary, education, skills, projects, experience, certificates, volunteering, awards and activities, languages, references, and custom sections.
- Add entries, hide sections, rename custom sections, and drag sections to reorder them.
- Ten selectable, single-column resume designs styled consistently in the live preview, PDF/print, and Word export.
- Basic resume completeness checklist.
- Browser-local autosave and multiple resumes through IndexedDB.
- JSON backup and restore so a resume can be moved between devices.
- Browser print-to-PDF with print styles designed for selectable text and ATS readability.
- Client-side Word (.docx) export with standard headings, editable text, current section order, and clickable web/email/phone links.
- Responsive editor for phones and larger screens.

Resume content stays in the browser unless the user downloads a backup. This version has no login, server database, AI service, or cross-device sync.

## Deploy to Netlify

Connect this folder to a Netlify site. Build command: `npm run build`. Publish directory: `dist`. The included `netlify.toml` applies those settings.

## Project structure

- `src/ui/ResumeBuilder.tsx` — editor, resume management, preview, backup/restore.
- `src/lib/resume.ts` — reusable section definitions and resume data model.
- `src/lib/db.ts` — local IndexedDB storage.
- `src/styles/global.css` — responsive screen and PDF print styles.
- `src/pages/index.astro` — public homepage, metadata, structured data, and resume app entry.
- `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`, and `src/pages/ads.txt.ts` — crawl, sitemap, and ad seller files.



## Search indexing and advertising setup

- The static homepage includes visible introductory copy, resume guidance, and FAQs in the initial HTML, plus canonical/social metadata and `WebSite`, `WebApplication`, and FAQ structured data.
- `/robots.txt` permits normal crawling and points to `/sitemap.xml`. The sitemap currently lists `/` and `/privacy/`; add any future public pages to `src/pages/sitemap.xml.ts`.
- The build uses Netlify's `URL` automatically for canonical URLs and the sitemap. On another host, set `PUBLIC_SITE_URL` to the final HTTPS domain before building. Local builds use `https://clearcv.invalid`; do not publish that fallback URL.
- Set `PUBLIC_GOOGLE_SITE_VERIFICATION` in the deploy environment after copying the HTML verification token from Search Console. Then add the deployed site property in Search Console and submit `/sitemap.xml`; sitemap submission helps discovery but does not guarantee indexing.
- `ads.txt` is generated from `PUBLIC_ADSENSE_PUBLISHER_ID`; it uses a comment until you supply the real `pub-...` ID from your AdSense account.
- Ads are off by default. To render the two optional ad placements, configure a real `PUBLIC_ADSENSE_CLIENT` (`ca-pub-...`), slot IDs, `PUBLIC_ADSENSE_PUBLISHER_ID`, and set `PUBLIC_ADS_ENABLED=true` plus `PUBLIC_ADS_CONSENT_READY=true` only after the site is approved and the required consent setup is in place. A consent platform is not bundled; for personalized ads to users in the EEA, UK, or Switzerland, Google requires a certified CMP integrated with the IAB TCF. Review the current Google publisher requirements before enabling ads.
- Set `PUBLIC_PRIVACY_EMAIL` before launch. Review the privacy page against the actual ad/consent setup and applicable requirements.

Copy `.env.example` to `.env` for local testing. Add the same values in Netlify's environment variable settings for production builds. Never put secret keys in `PUBLIC_` variables.

