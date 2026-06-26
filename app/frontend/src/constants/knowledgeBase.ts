// File: src/constants/knowledgeBase.ts
import { GLOBAL_FAQS } from './faqs';
import { BLOG_POSTS } from './blogPosts';
import { LOCATION_AREAS } from './locationAreas';
import { SEMANTIC_ENTITIES } from './entities';
import { ROUTES, getBlogRoute } from './routes';

export type KnowledgeType = "service" | "faq" | "blog" | "location";

export interface KnowledgeNode {
  id: string;
  type: KnowledgeType;
  title: string;
  description: string;
  url: string;
  keywords: string[];
}

// Helper to extract values from dicts safely
const extractLocations = (): KnowledgeNode[] => {
  return Object.values(LOCATION_AREAS).map(area => ({
    id: `loc-${area.slug}`,
    type: "location",
    title: `Computer Repair in ${area.name}`,
    description: area.description,
    url: `/laptop-repair-in-${area.slug}`,
    keywords: area.keywords ? [...area.keywords, area.name, "location", "area", "near me"] : [area.name, "location"]
  }));
};

const extractFAQs = (): KnowledgeNode[] => {
  return GLOBAL_FAQS.map(faq => ({
    id: `faq-${faq.id}`,
    type: "faq",
    title: faq.question,
    description: faq.answer,
    url: `${ROUTES.faq}#${faq.id}`,
    keywords: [faq.category, "question", "help", "support", ...faq.question.split(" ")]
  }));
};

const extractBlogs = (): KnowledgeNode[] => {
  return BLOG_POSTS.map(post => ({
    id: `blog-${post.slug}`,
    type: "blog",
    title: post.title,
    description: post.excerpt,
    url: getBlogRoute(post.slug),
    keywords: [...post.keywords, post.category, "guide", "tutorial"]
  }));
};

const extractServices = (): KnowledgeNode[] => {
  return Object.values(SEMANTIC_ENTITIES)
    .filter(entity => entity.type === "service")
    .map(service => ({
      id: `srv-${service.id}`,
      type: "service",
      title: service.name,
      description: `Professional ${service.name.toLowerCase()} services in Kuwait.`,
      url: service.primaryRoute,
      keywords: service.synonyms
    }));
};

// The Unified Knowledge Graph
export const KNOWLEDGE_GRAPH: KnowledgeNode[] = [
  ...extractServices(),
  ...extractLocations(),
  ...extractBlogs(),
  ...extractFAQs()
];
