# PROOF launch pack for Vercel

This folder is ready to drop into a GitHub repo and deploy on Vercel.

## Included

- Conversion-focused homepage
- Platform, Playbooks, How It Works, Partners, and AI Trust pages
- Insights index plus the four existing blog posts
- Demo pages copied from your current working files
- Vercel API functions for the main request form and partner form
- `vercel.json`, `sitemap.xml`, `robots.txt`, OG assets, favicon, and web manifest

## Required Vercel environment variables

Set these in Vercel Project Settings → Environment Variables:

- `EARLY_ACCESS_WEBHOOK_URL`
- `PARTNER_WEBHOOK_URL` (optional — falls back to `EARLY_ACCESS_WEBHOOK_URL` if omitted)

The API routes will POST JSON to those webhook URLs.

## Suggested webhook targets

- Make.com webhook
- Zapier catch hook
- Brevo automation webhook
- A custom endpoint that writes to HubSpot, Airtable, Notion, or Slack

## Deploy flow

1. Push these files to your GitHub repo
2. Import the repo into Vercel
3. Add the environment variables above
4. Deploy
5. Submit a test request from the homepage and partners page

## Files you should review before public launch

- `privacy.html`
- `terms.html`
- any CTA wording around “launching May 2026”
- demo pages if you want them visually aligned to the darker brand system

## Notes

- `Playbooks` and `Partners` are treated as first-class launch pages because they match your current GTM.
- `Insights` is the label used in nav, while the path remains `/blog`.
- Forms are production-ready once the webhook env vars are configured.
