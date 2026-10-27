<?php
declare(strict_types=1);

// Typed models for the Vidsmaller SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Estimate entity data model. */
class Estimate
{
    public string $api;
    public string $compressUrl;
    public string $docs;
    public ?float $durationSeconds = null;
    public mixed $estimate;
    public mixed $fitsAsIs;
    public ?int $height = null;
    public array $input;
    public array $notes;
    public bool $ok;
    public ?string $platform = null;
    public mixed $recommendation;
    public ?array $settings = null;
    public ?int $sizeBytes = null;
    public ?float $sizeMb = null;
    public mixed $target;
    public ?float $targetMb = null;
    public string $unit;
    public string $verdict;
    public ?int $width = null;
}

/** Request payload for Estimate#list. */
class EstimateListMatch
{
    public ?int $bitrate_kbp = null;
    public ?string $codec = null;
    public ?int $crf = null;
    public ?float $duration_second = null;
    public ?int $height = null;
    public ?string $max_resolution = null;
    public ?string $mode = null;
    public ?string $output_format = null;
    public ?string $platform = null;
    public ?string $preset = null;
    public ?string $resolution = null;
    public ?int $size_byte = null;
    public float $size_mb;
    public ?string $speed = null;
    public ?float $target_mb = null;
    public ?float $target_size_mb = null;
    public ?int $width = null;
}

/** Request payload for Estimate#create. */
class EstimateCreateData
{
    public ?float $durationSeconds = null;
    public ?int $height = null;
    public ?string $platform = null;
    public ?array $settings = null;
    public ?int $sizeBytes = null;
    public ?float $sizeMb = null;
    public ?float $targetMb = null;
    public ?int $width = null;
}

/** Job entity data model. */
class Job
{
    public ?string $codec = null;
    public ?float $duration_seconds = null;
    public ?string $max_resolution = null;
    public ?string $output_format = null;
    public ?string $source_url = null;
    public float $target_size_mb;
    public ?string $upload_token = null;
    public ?string $webhook_url = null;
}

/** Request payload for Job#create. */
class JobCreateData
{
    public ?string $codec = null;
    public ?float $duration_seconds = null;
    public ?string $max_resolution = null;
    public ?string $output_format = null;
    public ?string $source_url = null;
    public float $target_size_mb;
    public ?string $upload_token = null;
    public ?string $webhook_url = null;
}

/** Platform entity data model. */
class Platform
{
    public string $api;
    public int $count;
    public string $docs;
    public bool $ok;
    public array $platforms;
    public string $unit;
    public string $verifiedAt;
}

/** Request payload for Platform#list. */
class PlatformListMatch
{
    public ?string $api = null;
    public ?int $count = null;
    public ?string $docs = null;
    public ?bool $ok = null;
    public ?array $platforms = null;
    public ?string $unit = null;
    public ?string $verifiedAt = null;
}

/** Upload entity data model. */
class Upload
{
    public ?string $content_type = null;
    public int $file_size;
    public string $filename;
}

/** Request payload for Upload#create. */
class UploadCreateData
{
    public ?string $content_type = null;
    public int $file_size;
    public string $filename;
}

