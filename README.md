# babyapp-site

## Domain canonicalization

Production should use `https://babyapp.cz` as the canonical host.

- `www.babyapp.cz` should be configured as an alias in Vercel and redirected to `https://babyapp.cz/:path*` (see `vercel.json`).
- DNS for both apex and `www` should point only to Vercel records to avoid split responses from legacy hosts.
- Sitemap and `robots.txt` should keep only canonical `https://babyapp.cz/...` URLs.

