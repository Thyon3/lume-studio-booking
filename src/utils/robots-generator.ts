import { writeFileSync } from 'fs';

interface RobotsRule {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
  crawlDelay?: number;
}

interface RobotsOptions {
  sitemap?: string;
  host?: string;
}

class RobotsGenerator {
  private rules: RobotsRule[] = [];
  private options: RobotsOptions = {};

  addRule(rule: RobotsRule): void {
    this.rules.push(rule);
  }

  addRules(rules: RobotsRule[]): void {
    rules.forEach(rule => this.addRule(rule));
  }

  setOptions(options: RobotsOptions): void {
    this.options = { ...this.options, ...options };
  }

  generateRobotsTxt(): string {
    let content = '';

    // Add rules
    this.rules.forEach(rule => {
      content += `User-agent: ${rule.userAgent}\n`;
      
      if (rule.allow) {
        rule.allow.forEach(path => {
          content += `Allow: ${path}\n`;
        });
      }
      
      if (rule.disallow) {
        rule.disallow.forEach(path => {
          content += `Disallow: ${path}\n`;
        });
      }
      
      if (rule.crawlDelay) {
        content += `Crawl-delay: ${rule.crawlDelay}\n`;
      }
      
      content += '\n';
    });

    // Add options
    if (this.options.sitemap) {
      content += `Sitemap: ${this.options.sitemap}\n`;
    }
    
    if (this.options.host) {
      content += `Host: ${this.options.host}\n`;
    }

    return content.trim();
  }

  saveRobotsTxt(filePath: string): void {
    const robotsTxt = this.generateRobotsTxt();
    writeFileSync(filePath, robotsTxt, 'utf8');
  }
}

export default RobotsGenerator;
