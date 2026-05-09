import { Router } from 'express'
import { getAllPresets, createPreset, updatePreset, deletePreset } from './presets.controller.js'
import { validate } from '../../middleware/validate.middleware.js'
import { createPresetSchema } from './presets.scheme.js'

const router = Router()

router.get('/', getAllPresets)
router.post('/', validate(createPresetSchema), createPreset)
router.patch('/:id', updatePreset)
router.delete('/:id', deletePreset)

export default router
