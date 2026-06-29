/**
 * Generic Interface for all Enterprise Data Repositories.
 * Ensures uniform data access regardless of the underlying data source (Graph, CMS, API).
 */
export interface IRepository<T> {
  findAll(): T[];
  findBySlug(slug: string): T | null;
  search(query: string): T[];
}
