import { PresetsService } from './presets.service.js'
import { AppError } from '../../utils/AppError.js'
import { catchAsync } from '../../utils/catchAsync.js'

export const getAllPresets = catchAsync(async (req, res) => {
  const presets = PresetsService.getAllByUser(req._user_.id)
  res.success(presets)
})

export const createPreset = catchAsync(async (req, res) => {
  const { name, description } = req.body
  if (!name) throw new AppError('Name is required', 400)
  const preset = PresetsService.create(req._user_.id, name, description)
  res.success(preset, 201)
})

export const updatePreset = catchAsync(async (req, res) => {
  const updated = PresetsService.update(req.params.id, req._user_.id, req.body)
  if (!updated) throw new AppError('Preset not found', 404)
  res.success({ message: 'Preset updated' })
})

export const deletePreset = catchAsync(async (req, res) => {
  const deleted = PresetsService.delete(req.params.id, req._user_.id)
  if (!deleted) throw new AppError('Preset not found', 404)
  res.success({ message: 'Preset deleted' })
})