import { services } from '../../shared/servicesContent.js';
import { blogPosts } from '../src/data/blogPosts.js';

const staticRoutes = ['/', '/about', '/services', '/seller-central', '/contact', '/blog'];
const serviceRoutes = services.map((s) => `/services/${s.slug}`);
const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`);

export const prerenderRoutes = [...staticRoutes, ...serviceRoutes, ...blogRoutes];

export function getSitemapPaths() {
  return ['', '/about', '/services', '/seller-central', '/contact', '/blog', ...serviceRoutes, ...blogRoutes];
}
