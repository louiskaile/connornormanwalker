function requireValue(value: string | undefined, message: string): string {
  if (!value) throw new Error(message)
  return value
}

export const projectId = requireValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
export const dataset = requireValue(process.env.NEXT_PUBLIC_SANITY_DATASET, 'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET')
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-28'
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333'
