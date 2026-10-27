# frozen_string_literal: true

# Typed models for the Vidsmaller SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Estimate entity data model.
#
# @!attribute [rw] api
#   @return [String]
#
# @!attribute [rw] compressUrl
#   @return [String]
#
# @!attribute [rw] docs
#   @return [String]
#
# @!attribute [rw] durationSeconds
#   @return [Float, nil]
#
# @!attribute [rw] estimate
#   @return [Object]
#
# @!attribute [rw] fitsAsIs
#   @return [Object]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] input
#   @return [Hash]
#
# @!attribute [rw] notes
#   @return [Array]
#
# @!attribute [rw] ok
#   @return [Boolean]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] recommendation
#   @return [Object]
#
# @!attribute [rw] settings
#   @return [Hash, nil]
#
# @!attribute [rw] sizeBytes
#   @return [Integer, nil]
#
# @!attribute [rw] sizeMb
#   @return [Float, nil]
#
# @!attribute [rw] target
#   @return [Object]
#
# @!attribute [rw] targetMb
#   @return [Float, nil]
#
# @!attribute [rw] unit
#   @return [String]
#
# @!attribute [rw] verdict
#   @return [String]
#
# @!attribute [rw] width
#   @return [Integer, nil]
Estimate = Struct.new(
  :api,
  :compressUrl,
  :docs,
  :durationSeconds,
  :estimate,
  :fitsAsIs,
  :height,
  :input,
  :notes,
  :ok,
  :platform,
  :recommendation,
  :settings,
  :sizeBytes,
  :sizeMb,
  :target,
  :targetMb,
  :unit,
  :verdict,
  :width,
  keyword_init: true
)

# Request payload for Estimate#list.
#
# @!attribute [rw] bitrate_kbp
#   @return [Integer, nil]
#
# @!attribute [rw] codec
#   @return [String, nil]
#
# @!attribute [rw] crf
#   @return [Integer, nil]
#
# @!attribute [rw] duration_second
#   @return [Float, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] max_resolution
#   @return [String, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] output_format
#   @return [String, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] preset
#   @return [String, nil]
#
# @!attribute [rw] resolution
#   @return [String, nil]
#
# @!attribute [rw] size_byte
#   @return [Integer, nil]
#
# @!attribute [rw] size_mb
#   @return [Float]
#
# @!attribute [rw] speed
#   @return [String, nil]
#
# @!attribute [rw] target_mb
#   @return [Float, nil]
#
# @!attribute [rw] target_size_mb
#   @return [Float, nil]
#
# @!attribute [rw] width
#   @return [Integer, nil]
EstimateListMatch = Struct.new(
  :bitrate_kbp,
  :codec,
  :crf,
  :duration_second,
  :height,
  :max_resolution,
  :mode,
  :output_format,
  :platform,
  :preset,
  :resolution,
  :size_byte,
  :size_mb,
  :speed,
  :target_mb,
  :target_size_mb,
  :width,
  keyword_init: true
)

# Request payload for Estimate#create.
#
# @!attribute [rw] durationSeconds
#   @return [Float, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] settings
#   @return [Hash, nil]
#
# @!attribute [rw] sizeBytes
#   @return [Integer, nil]
#
# @!attribute [rw] sizeMb
#   @return [Float, nil]
#
# @!attribute [rw] targetMb
#   @return [Float, nil]
#
# @!attribute [rw] width
#   @return [Integer, nil]
EstimateCreateData = Struct.new(
  :durationSeconds,
  :height,
  :platform,
  :settings,
  :sizeBytes,
  :sizeMb,
  :targetMb,
  :width,
  keyword_init: true
)

# Job entity data model.
#
# @!attribute [rw] codec
#   @return [String, nil]
#
# @!attribute [rw] duration_seconds
#   @return [Float, nil]
#
# @!attribute [rw] max_resolution
#   @return [String, nil]
#
# @!attribute [rw] output_format
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] target_size_mb
#   @return [Float]
#
# @!attribute [rw] upload_token
#   @return [String, nil]
#
# @!attribute [rw] webhook_url
#   @return [String, nil]
Job = Struct.new(
  :codec,
  :duration_seconds,
  :max_resolution,
  :output_format,
  :source_url,
  :target_size_mb,
  :upload_token,
  :webhook_url,
  keyword_init: true
)

# Request payload for Job#create.
#
# @!attribute [rw] codec
#   @return [String, nil]
#
# @!attribute [rw] duration_seconds
#   @return [Float, nil]
#
# @!attribute [rw] max_resolution
#   @return [String, nil]
#
# @!attribute [rw] output_format
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] target_size_mb
#   @return [Float]
#
# @!attribute [rw] upload_token
#   @return [String, nil]
#
# @!attribute [rw] webhook_url
#   @return [String, nil]
JobCreateData = Struct.new(
  :codec,
  :duration_seconds,
  :max_resolution,
  :output_format,
  :source_url,
  :target_size_mb,
  :upload_token,
  :webhook_url,
  keyword_init: true
)

# Platform entity data model.
#
# @!attribute [rw] api
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] docs
#   @return [String]
#
# @!attribute [rw] ok
#   @return [Boolean]
#
# @!attribute [rw] platforms
#   @return [Array]
#
# @!attribute [rw] unit
#   @return [String]
#
# @!attribute [rw] verifiedAt
#   @return [String]
Platform = Struct.new(
  :api,
  :count,
  :docs,
  :ok,
  :platforms,
  :unit,
  :verifiedAt,
  keyword_init: true
)

# Request payload for Platform#list.
#
# @!attribute [rw] api
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] docs
#   @return [String, nil]
#
# @!attribute [rw] ok
#   @return [Boolean, nil]
#
# @!attribute [rw] platforms
#   @return [Array, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
#
# @!attribute [rw] verifiedAt
#   @return [String, nil]
PlatformListMatch = Struct.new(
  :api,
  :count,
  :docs,
  :ok,
  :platforms,
  :unit,
  :verifiedAt,
  keyword_init: true
)

# Upload entity data model.
#
# @!attribute [rw] content_type
#   @return [String, nil]
#
# @!attribute [rw] file_size
#   @return [Integer]
#
# @!attribute [rw] filename
#   @return [String]
Upload = Struct.new(
  :content_type,
  :file_size,
  :filename,
  keyword_init: true
)

# Request payload for Upload#create.
#
# @!attribute [rw] content_type
#   @return [String, nil]
#
# @!attribute [rw] file_size
#   @return [Integer]
#
# @!attribute [rw] filename
#   @return [String]
UploadCreateData = Struct.new(
  :content_type,
  :file_size,
  :filename,
  keyword_init: true
)

