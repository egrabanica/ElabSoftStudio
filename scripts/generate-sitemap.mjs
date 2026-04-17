import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const siteUrl = 'https://elabsoft.com';
const today = new Date().toISOString().split('T')[0];
const publicDir = resolve(process.cwd(), 'public');
const sitemapPath = resolve(publicDir, 'sitemap.xml');
const sitemapTxtPath = resolve(publicDir, 'sitemap.txt');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

await mkdir(publicDir, { recursive: true });
await writeFile(sitemapPath, sitemap, 'utf8');

const sitemapTxt = `${siteUrl}/\n`;
await writeFile(sitemapTxtPath, sitemapTxt, 'utf8');

console.log(`Generated sitemap at ${sitemapPath} with lastmod=${today}`);
console.log(`Generated plain sitemap at ${sitemapTxtPath}`);
