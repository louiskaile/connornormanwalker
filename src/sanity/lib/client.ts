import { createClient } from 'next-sanity'

import { dataset, projectId } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-08-14',
  useCdn: true,
  perspective: 'published',
})
