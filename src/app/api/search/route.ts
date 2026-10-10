import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

// Export the complete ZBSearch index at build time. The browser downloads this
// static JSON payload and performs searches locally, so no server is required.
export const { staticGET: GET } = createFromSource(source);
