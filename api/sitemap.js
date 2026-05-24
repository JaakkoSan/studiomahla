// api/sitemap.js — Vercel Serverless Function
//
// Generates sitemap.xml dynamically. Mapped to /sitemap.xml via vercel.json
// rewrite (so search engines find it at the standard location).
//
// To add a new page (e.g. a new blog post):
//   1. Add an entry to the PAGES array below
//   2. Push to main → Vercel redeploys → /sitemap.xml updates automatically
//
// Excluded by design (these are noindex / private):
//   /admin.html, /peruuta.html, /api/* endpoints
'use strict';

const BASE_URL = 'https://www.studiomahla.fi';

// Each entry's `lastmod` should be the date the page's *content* was last
// updated. Bump it when you change the page so search engines re-crawl.
const PAGES = [
  { path: '/',                  changefreq: 'monthly', priority: '1.0', lastmod: '2026-05-22' },
  { path: '/kauppa.html',       changefreq: 'weekly',  priority: '0.9', lastmod: '2026-05-22' },
  { path: '/mikroneulaus.htm',  changefreq: 'monthly', priority: '0.8', lastmod: '2026-05-22' },
  { path: '/blogi.html',        changefreq: 'weekly',  priority: '0.7', lastmod: '2026-05-22' },
  { path: '/ehdot.html',        changefreq: 'yearly',  priority: '0.3', lastmod: '2026-05-22' },
  { path: '/privacy.html',      changefreq: 'yearly',  priority: '0.3', lastmod: '2026-05-22' },
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

module.exports = function handler(req, res) {
  const urls = PAGES.map(function (p) {
    return [
      '  <url>',
      '    <loc>' + escapeXml(BASE_URL + p.path) + '</loc>',
      '    <lastmod>' + escapeXml(p.lastmod) + '</lastmod>',
      '    <changefreq>' + escapeXml(p.changefreq) + '</changefreq>',
      '    <priority>' + escapeXml(p.priority) + '</priority>',
      '  </url>',
    ].join('\n');
  }).join('\n');

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls + '\n' +
    '</urlset>\n';

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  // Cache briefly so crawlers don't hit the function on every request, but
  // not so long that updates are slow to propagate.
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.status(200).send(xml);
};
