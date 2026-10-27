# Typed models for the Vidsmaller SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class EstimateRequired(TypedDict):
    api: str
    compressUrl: str
    docs: str
    estimate: dict | None
    fitsAsIs: bool | None
    input: dict
    notes: list
    ok: bool
    recommendation: dict | None
    target: dict | None
    unit: str
    verdict: str


class Estimate(EstimateRequired, total=False):
    durationSeconds: float
    height: int
    platform: str
    settings: dict
    sizeBytes: int
    sizeMb: float
    targetMb: float
    width: int


class EstimateListMatchRequired(TypedDict):
    size_mb: float


class EstimateListMatch(EstimateListMatchRequired, total=False):
    bitrate_kbp: int
    codec: str
    crf: int
    duration_second: float
    height: int
    max_resolution: str
    mode: str
    output_format: str
    platform: str
    preset: str
    resolution: str
    size_byte: int
    speed: str
    target_mb: float
    target_size_mb: float
    width: int


class EstimateCreateData(TypedDict, total=False):
    durationSeconds: float
    height: int
    platform: str
    settings: dict
    sizeBytes: int
    sizeMb: float
    targetMb: float
    width: int


class JobRequired(TypedDict):
    target_size_mb: float


class Job(JobRequired, total=False):
    codec: str
    duration_seconds: float
    max_resolution: str
    output_format: str
    source_url: str
    upload_token: str
    webhook_url: str


class JobCreateDataRequired(TypedDict):
    target_size_mb: float


class JobCreateData(JobCreateDataRequired, total=False):
    codec: str
    duration_seconds: float
    max_resolution: str
    output_format: str
    source_url: str
    upload_token: str
    webhook_url: str


class Platform(TypedDict):
    api: str
    count: int
    docs: str
    ok: bool
    platforms: list
    unit: str
    verifiedAt: str


class PlatformListMatch(TypedDict, total=False):
    api: str
    count: int
    docs: str
    ok: bool
    platforms: list
    unit: str
    verifiedAt: str


class UploadRequired(TypedDict):
    file_size: int
    filename: str


class Upload(UploadRequired, total=False):
    content_type: str


class UploadCreateDataRequired(TypedDict):
    file_size: int
    filename: str


class UploadCreateData(UploadCreateDataRequired, total=False):
    content_type: str
