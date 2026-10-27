-- Typed models for the Vidsmaller SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Estimate
---@field api string
---@field compressUrl string
---@field docs string
---@field durationSeconds? number
---@field estimate table|nil
---@field fitsAsIs boolean|nil
---@field height? number
---@field input table
---@field notes table
---@field ok boolean
---@field platform? string
---@field recommendation table|nil
---@field settings? table
---@field sizeBytes? number
---@field sizeMb? number
---@field target table|nil
---@field targetMb? number
---@field unit string
---@field verdict string
---@field width? number

---@class EstimateListMatch
---@field bitrate_kbp? number
---@field codec? string
---@field crf? number
---@field duration_second? number
---@field height? number
---@field max_resolution? string
---@field mode? string
---@field output_format? string
---@field platform? string
---@field preset? string
---@field resolution? string
---@field size_byte? number
---@field size_mb number
---@field speed? string
---@field target_mb? number
---@field target_size_mb? number
---@field width? number

---@class EstimateCreateData
---@field durationSeconds? number
---@field height? number
---@field platform? string
---@field settings? table
---@field sizeBytes? number
---@field sizeMb? number
---@field targetMb? number
---@field width? number

---@class Job
---@field codec? string
---@field duration_seconds? number
---@field max_resolution? string
---@field output_format? string
---@field source_url? string
---@field target_size_mb number
---@field upload_token? string
---@field webhook_url? string

---@class JobCreateData
---@field codec? string
---@field duration_seconds? number
---@field max_resolution? string
---@field output_format? string
---@field source_url? string
---@field target_size_mb number
---@field upload_token? string
---@field webhook_url? string

---@class Platform
---@field api string
---@field count number
---@field docs string
---@field ok boolean
---@field platforms table
---@field unit string
---@field verifiedAt string

---@class PlatformListMatch
---@field api? string
---@field count? number
---@field docs? string
---@field ok? boolean
---@field platforms? table
---@field unit? string
---@field verifiedAt? string

---@class Upload
---@field content_type? string
---@field file_size number
---@field filename string

---@class UploadCreateData
---@field content_type? string
---@field file_size number
---@field filename string

local M = {}

return M
