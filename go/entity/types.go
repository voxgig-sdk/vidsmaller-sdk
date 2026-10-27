// Typed models for the Vidsmaller SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/vidsmaller-sdk/go/core"
)

// Estimate is the typed data model for the estimate entity.
type Estimate struct {
}

// EstimateListMatch is the typed request payload for Estimate.ListTyped.
type EstimateListMatch struct {
	BitrateKbp *int `json:"bitrate_kbp,omitempty"`
	Codec *string `json:"codec,omitempty"`
	Crf *int `json:"crf,omitempty"`
	DurationSecond *float64 `json:"duration_second,omitempty"`
	Height *int `json:"height,omitempty"`
	MaxResolution *string `json:"max_resolution,omitempty"`
	Mode *string `json:"mode,omitempty"`
	OutputFormat *string `json:"output_format,omitempty"`
	Platform *string `json:"platform,omitempty"`
	Preset *string `json:"preset,omitempty"`
	Resolution *string `json:"resolution,omitempty"`
	SizeByte *int `json:"size_byte,omitempty"`
	SizeMb float64 `json:"size_mb"`
	Speed *string `json:"speed,omitempty"`
	TargetMb *float64 `json:"target_mb,omitempty"`
	TargetSizeMb *float64 `json:"target_size_mb,omitempty"`
	Width *int `json:"width,omitempty"`
}

// EstimateCreateData is the typed request payload for Estimate.CreateTyped.
type EstimateCreateData struct {
	DurationSeconds *float64 `json:"durationSeconds,omitempty"`
	Height *int `json:"height,omitempty"`
	Platform *string `json:"platform,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	SizeBytes *int `json:"sizeBytes,omitempty"`
	SizeMb *float64 `json:"sizeMb,omitempty"`
	TargetMb *float64 `json:"targetMb,omitempty"`
	Width *int `json:"width,omitempty"`
}

// Job is the typed data model for the job entity.
type Job struct {
}

// JobCreateData is the typed request payload for Job.CreateTyped.
type JobCreateData struct {
	Codec *string `json:"codec,omitempty"`
	DurationSeconds *float64 `json:"duration_seconds,omitempty"`
	MaxResolution *string `json:"max_resolution,omitempty"`
	OutputFormat *string `json:"output_format,omitempty"`
	SourceUrl *string `json:"source_url,omitempty"`
	TargetSizeMb float64 `json:"target_size_mb"`
	UploadToken *string `json:"upload_token,omitempty"`
	WebhookUrl *string `json:"webhook_url,omitempty"`
}

// Platform is the typed data model for the platform entity.
type Platform struct {
}

// PlatformListMatch is the typed request payload for Platform.ListTyped.
type PlatformListMatch struct {
	Api *string `json:"api,omitempty"`
	Count *int `json:"count,omitempty"`
	Docs *string `json:"docs,omitempty"`
	Ok *bool `json:"ok,omitempty"`
	Platforms *[]any `json:"platforms,omitempty"`
	Unit *string `json:"unit,omitempty"`
	VerifiedAt *string `json:"verifiedAt,omitempty"`
}

// Upload is the typed data model for the upload entity.
type Upload struct {
}

// UploadCreateData is the typed request payload for Upload.CreateTyped.
type UploadCreateData struct {
	ContentType *string `json:"content_type,omitempty"`
	FileSize int `json:"file_size"`
	Filename string `json:"filename"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
