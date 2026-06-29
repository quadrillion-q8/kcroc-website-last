// File: app/frontend/src/core/validators/ValidationEngine.ts
import { serviceRepository } from '../repositories/ServiceRepository';
import { locationRepository } from '../repositories/LocationRepository';
import { BaseEntity } from '../types';

export class ValidationEngine {
  private errors: string[] = [];
  private warnings: string[] = [];

  /**
   * Executes the full suite of Enterprise SEO and Integrity checks.
   */
  public async runFullAudit(): Promise<boolean> {
    console.log("🔍 Starting Enterprise SEO Build Validation...");

    const services = await serviceRepository.findAll();
    const locations = await locationRepository.findAll();
    const allEntities = [...services, ...locations];

    this.checkDuplicateSlugs(allEntities);
    this.checkMissingSEOMetadata(allEntities);
    // As you add FAQs and Blogs, you simply pass them into this engine!

    this.printReport();

    // If there are critical errors, we fail the build
    return this.errors.length === 0;
  }

  /**
   * Prevents Google from seeing duplicate content or routing crashes.
   */
  private checkDuplicateSlugs(entities: BaseEntity[]) {
    const slugs = new Set<string>();
    for (const entity of entities) {
      if (slugs.has(entity.slug)) {
        this.errors.push(`[CRITICAL] Duplicate URL Slug found: /${entity.slug} (${entity.entityType})`);
      }
      slugs.add(entity.slug);
    }
  }

  /**
   * Ensures no page ever deploys without complete metadata.
   */
  private checkMissingSEOMetadata(entities: BaseEntity[]) {
    for (const entity of entities) {
      if (!entity.seo) {
        this.errors.push(`[SEO ERROR] Missing entire SEO block for ${entity.title}`);
        continue;
      }
      if (!entity.seo.title || entity.seo.title.length < 10) {
        this.errors.push(`[SEO ERROR] Title too short or missing for /${entity.slug}`);
      }
      if (!entity.seo.description || entity.seo.description.length < 50) {
        this.warnings.push(`[SEO WARNING] Description too short for /${entity.slug}. Aim for 150 chars.`);
      }
      if (!entity.seo.canonicalUrl) {
        this.errors.push(`[CRITICAL SEO] Missing Canonical URL for /${entity.slug}`);
      }
    }
  }

  private printReport() {
    console.log("\n📊 --- VALIDATION REPORT ---");
    
    if (this.warnings.length > 0) {
      console.log("\n⚠️  WARNINGS (Build will proceed):");
      this.warnings.forEach(w => console.log(`   - ${w}`));
    }

    if (this.errors.length > 0) {
      console.log("\n❌ ERRORS (Build will fail):");
      this.errors.forEach(e => console.log(`   - ${e}`));
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log("\n✅ All Enterprise checks passed perfectly!");
    }
  }
}
