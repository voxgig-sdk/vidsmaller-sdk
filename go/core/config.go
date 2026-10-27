package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Vidsmaller",
			"slug": "vidsmaller",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://vidsmaller.com",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"estimate": map[string]any{},
				"job": map[string]any{},
				"platform": map[string]any{},
				"upload": map[string]any{},
			},
		},
		"entity": map[string]any{
			"estimate": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "api",
						"title": "Api",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "compressUrl",
						"title": "Compress Url",
						"type": "`$STRING`",
						"req": true,
						"format": "uri",
					},
					map[string]any{
						"name": "docs",
						"title": "Docs",
						"type": "`$STRING`",
						"req": true,
						"format": "uri",
					},
					map[string]any{
						"name": "durationSeconds",
						"title": "Duration Seconds",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "estimate",
						"title": "Estimate",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "fitsAsIs",
						"title": "Fits As Is",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "height",
						"title": "Height",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "input",
						"title": "Input",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "notes",
						"title": "Notes",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "ok",
						"title": "Ok",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "platform",
						"title": "Platform",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "recommendation",
						"title": "Recommendation",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "settings",
						"title": "Settings",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sizeBytes",
						"title": "Size Bytes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "sizeMb",
						"title": "Size Mb",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "target",
						"title": "Target",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "targetMb",
						"title": "Target Mb",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "unit",
						"title": "Unit",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "verdict",
						"title": "Verdict",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "width",
						"title": "Width",
						"type": "`$INTEGER`",
					},
				},
				"name": "estimate",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/estimate",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "estimate",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"estimate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.estimate`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/estimate",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "estimate",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"estimate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.estimate`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "bitrate_kbp",
											"orig": "bitrateKbps",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "codec",
											"orig": "codec",
											"type": "`$STRING`",
											"kind": "query",
											"example": "libx264",
										},
										map[string]any{
											"name": "crf",
											"orig": "crf",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "duration_second",
											"orig": "durationSeconds",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "height",
											"orig": "height",
											"type": "`$INTEGER`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "max_resolution",
											"orig": "maxResolution",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "mode",
											"orig": "mode",
											"type": "`$STRING`",
											"kind": "query",
											"example": "preset",
										},
										map[string]any{
											"name": "output_format",
											"orig": "outputFormat",
											"type": "`$STRING`",
											"kind": "query",
											"example": "mp4",
										},
										map[string]any{
											"name": "platform",
											"orig": "platform",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "preset",
											"orig": "preset",
											"type": "`$STRING`",
											"kind": "query",
											"example": "balanced",
										},
										map[string]any{
											"name": "resolution",
											"orig": "resolution",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "size_byte",
											"orig": "sizeBytes",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "size_mb",
											"orig": "sizeMb",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": 100,
										},
										map[string]any{
											"name": "speed",
											"orig": "speed",
											"type": "`$STRING`",
											"kind": "query",
											"example": "faster",
										},
										map[string]any{
											"name": "target_mb",
											"orig": "targetMb",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "target_size_mb",
											"orig": "targetSizeMb",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"size_mb",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"job": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "codec",
						"title": "Codec",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration_seconds",
						"title": "Duration Seconds",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "max_resolution",
						"title": "Max Resolution",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "output_format",
						"title": "Output Format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_url",
						"title": "Source Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "target_size_mb",
						"title": "Target Size Mb",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "upload_token",
						"title": "Upload Token",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "webhook_url",
						"title": "Webhook Url",
						"type": "`$STRING`",
						"format": "uri",
					},
				},
				"name": "job",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/video/jobs",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "video",
									},
									map[string]any{
										"lit": "jobs",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"video",
									"jobs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.job`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"platform": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "api",
						"title": "Api",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "count",
						"title": "Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "docs",
						"title": "Docs",
						"type": "`$STRING`",
						"req": true,
						"format": "uri",
					},
					map[string]any{
						"name": "ok",
						"title": "Ok",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "platforms",
						"title": "Platforms",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "unit",
						"title": "Unit",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "verifiedAt",
						"title": "Verified At",
						"type": "`$STRING`",
						"req": true,
						"format": "date",
					},
				},
				"name": "platform",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/platforms",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "platforms",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"platforms",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"upload": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "content_type",
						"title": "Content Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "file_size",
						"title": "File Size",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "filename",
						"title": "Filename",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "upload",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/video/uploads",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "video",
									},
									map[string]any{
										"lit": "uploads",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"video",
									"uploads",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.upload`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
