import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Connor Norman Walker',
  projectId: 'higne5uj',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
