import { writeFileSync } from 'fs';
import { join } from 'path';

interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

class SitemapGenerator {
  private entries: SitemapEntry[] = [];
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  addEntry(entry: SitemapEntry): void {
    this.entries.push({
      ...entry,
      url: entry.url.startsWith('http') ? entry.url : `${this.baseUrl}${entry.url}`,
    });
  }

  addEntries(entries: SitemapEntry[]): void {
    entries.forEach(entry => this.addEntry(entry));
  }

  generateSitemap(): string {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const xmlEntries = this.entries.map(entry => {
      const lastmod = entry.lastModified ? `<lastmod>${entry.lastModified}</lastmod>` : '';
      const changefreq = entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : '';
      const priority = entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : '';

      return `
  <url>
    <loc>${entry.url}</loc>
    ${lastmod}
    ${changefreq}
    ${priority}
  </url>`;
    }).join('');

    const xmlFooter = `</urlset>`;

    return xmlHeader + xmlEntries + xmlFooter;
  }

  saveSitemap(filePath: string): void {
    const sitemap = this.generateSitemap();
    writeFileSync(filePath, sitemap, 'utf8');
  }

  generateIndexSitemap(sitemaps: string[]): string {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const xmlSitemaps = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${this.baseUrl}/${sitemap}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('');

    const xmlFooter = `</sitemapindex>`;

    return xmlHeader + xmlSitemaps + xmlFooter;
  }
}

export default SitemapGenerator;
