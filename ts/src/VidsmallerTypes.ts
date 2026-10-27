// Typed models for the Vidsmaller SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Estimate {
  api: string
  compressUrl: string
  docs: string
  durationSeconds?: number
  estimate: Record<string, any> | null
  fitsAsIs: boolean | null
  height?: number
  input: Record<string, any>
  notes: any[]
  ok: boolean
  platform?: string
  recommendation: Record<string, any> | null
  settings?: Record<string, any>
  sizeBytes?: number
  sizeMb?: number
  target: Record<string, any> | null
  targetMb?: number
  unit: string
  verdict: string
  width?: number
}

export interface EstimateListMatch {
  bitrate_kbp?: number
  codec?: string
  crf?: number
  duration_second?: number
  height?: number
  max_resolution?: string
  mode?: string
  output_format?: string
  platform?: string
  preset?: string
  resolution?: string
  size_byte?: number
  size_mb: number
  speed?: string
  target_mb?: number
  target_size_mb?: number
  width?: number
}

export interface EstimateCreateData {
  durationSeconds?: number
  height?: number
  platform?: string
  settings?: Record<string, any>
  sizeBytes?: number
  sizeMb?: number
  targetMb?: number
  width?: number
}

export interface Job {
  codec?: string
  duration_seconds?: number
  max_resolution?: string
  output_format?: string
  source_url?: string
  target_size_mb: number
  upload_token?: string
  webhook_url?: string
}

export interface JobCreateData {
  codec?: string
  duration_seconds?: number
  max_resolution?: string
  output_format?: string
  source_url?: string
  target_size_mb: number
  upload_token?: string
  webhook_url?: string
}

export interface Platform {
  api: string
  count: number
  docs: string
  ok: boolean
  platforms: any[]
  unit: string
  verifiedAt: string
}

export interface PlatformListMatch {
  api?: string
  count?: number
  docs?: string
  ok?: boolean
  platforms?: any[]
  unit?: string
  verifiedAt?: string
}

export interface Upload {
  content_type?: string
  file_size: number
  filename: string
}

export interface UploadCreateData {
  content_type?: string
  file_size: number
  filename: string
}

