import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'hiqne5uj'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Connor Norman Walker',
  projectId,
  dataset,
  plugins: [structureTool({structure}), visionTool()],
  schema: { types: schemaTypes },
})
