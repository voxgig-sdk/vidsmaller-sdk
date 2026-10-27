"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Vidsmaller',
        slug: "vidsmaller",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "now": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://vidsmaller.com",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            estimate: {},
            job: {},
            platform: {},
            upload: {},
        }
    };
    entity = {
        "estimate": {
            "fields": [
                {
                    "name": "api",
                    "title": "Api",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "compressUrl",
                    "title": "Compress Url",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "uri"
                },
                {
                    "name": "docs",
                    "title": "Docs",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "uri"
                },
                {
                    "name": "durationSeconds",
                    "title": "Duration Seconds",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "estimate",
                    "title": "Estimate",
                    "type": [
                        "`$ONE`",
                        [
                            "`$OBJECT`",
                            "`$NULL`"
                        ]
                    ],
                    "req": true
                },
                {
                    "name": "fitsAsIs",
                    "title": "Fits As Is",
                    "type": [
                        "`$ONE`",
                        [
                            "`$BOOLEAN`",
                            "`$NULL`"
                        ]
                    ],
                    "req": true
                },
                {
                    "name": "height",
                    "title": "Height",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "input",
                    "title": "Input",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "notes",
                    "title": "Notes",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "ok",
                    "title": "Ok",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "platform",
                    "title": "Platform",
                    "type": "`$STRING`"
                },
                {
                    "name": "recommendation",
                    "title": "Recommendation",
                    "type": [
                        "`$ONE`",
                        [
                            "`$OBJECT`",
                            "`$NULL`"
                        ]
                    ],
                    "req": true
                },
                {
                    "name": "settings",
                    "title": "Settings",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "sizeBytes",
                    "title": "Size Bytes",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "sizeMb",
                    "title": "Size Mb",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "target",
                    "title": "Target",
                    "type": [
                        "`$ONE`",
                        [
                            "`$OBJECT`",
                            "`$NULL`"
                        ]
                    ],
                    "req": true
                },
                {
                    "name": "targetMb",
                    "title": "Target Mb",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "unit",
                    "title": "Unit",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "verdict",
                    "title": "Verdict",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "width",
                    "title": "Width",
                    "type": "`$INTEGER`"
                }
            ],
            "name": "estimate",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/estimate",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "estimate"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "estimate"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.estimate`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/estimate",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "estimate"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "estimate"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.estimate`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "bitrate_kbp",
                                        "orig": "bitrateKbps",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "codec",
                                        "orig": "codec",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "libx264"
                                    },
                                    {
                                        "name": "crf",
                                        "orig": "crf",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "duration_second",
                                        "orig": "durationSeconds",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "height",
                                        "orig": "height",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "max_resolution",
                                        "orig": "maxResolution",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "mode",
                                        "orig": "mode",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "preset"
                                    },
                                    {
                                        "name": "output_format",
                                        "orig": "outputFormat",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "mp4"
                                    },
                                    {
                                        "name": "platform",
                                        "orig": "platform",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "field": true
                                    },
                                    {
                                        "name": "preset",
                                        "orig": "preset",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "balanced"
                                    },
                                    {
                                        "name": "resolution",
                                        "orig": "resolution",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "size_byte",
                                        "orig": "sizeBytes",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "size_mb",
                                        "orig": "sizeMb",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": 100
                                    },
                                    {
                                        "name": "speed",
                                        "orig": "speed",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "faster"
                                    },
                                    {
                                        "name": "target_mb",
                                        "orig": "targetMb",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "target_size_mb",
                                        "orig": "targetSizeMb",
                                        "type": "`$NUMBER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "width",
                                        "orig": "width",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "size_mb"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "job": {
            "fields": [
                {
                    "name": "codec",
                    "title": "Codec",
                    "type": "`$STRING`"
                },
                {
                    "name": "duration_seconds",
                    "title": "Duration Seconds",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "max_resolution",
                    "title": "Max Resolution",
                    "type": "`$STRING`"
                },
                {
                    "name": "output_format",
                    "title": "Output Format",
                    "type": "`$STRING`"
                },
                {
                    "name": "source_url",
                    "title": "Source Url",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "target_size_mb",
                    "title": "Target Size Mb",
                    "type": "`$NUMBER`",
                    "req": true
                },
                {
                    "name": "upload_token",
                    "title": "Upload Token",
                    "type": "`$STRING`"
                },
                {
                    "name": "webhook_url",
                    "title": "Webhook Url",
                    "type": "`$STRING`",
                    "format": "uri"
                }
            ],
            "name": "job",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/video/jobs",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "video"
                                },
                                {
                                    "lit": "jobs"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "video",
                                "jobs"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.job`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "platform": {
            "fields": [
                {
                    "name": "api",
                    "title": "Api",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "count",
                    "title": "Count",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "docs",
                    "title": "Docs",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "uri"
                },
                {
                    "name": "ok",
                    "title": "Ok",
                    "type": "`$BOOLEAN`",
                    "req": true
                },
                {
                    "name": "platforms",
                    "title": "Platforms",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "unit",
                    "title": "Unit",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "verifiedAt",
                    "title": "Verified At",
                    "type": "`$STRING`",
                    "req": true,
                    "format": "date"
                }
            ],
            "name": "platform",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/platforms",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "platforms"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "platforms"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "upload": {
            "fields": [
                {
                    "name": "content_type",
                    "title": "Content Type",
                    "type": "`$STRING`"
                },
                {
                    "name": "file_size",
                    "title": "File Size",
                    "type": "`$INTEGER`",
                    "req": true
                },
                {
                    "name": "filename",
                    "title": "Filename",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "name": "upload",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/video/uploads",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "video"
                                },
                                {
                                    "lit": "uploads"
                                }
                            ],
                            "parts": [
                                "api",
                                "v1",
                                "video",
                                "uploads"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.upload`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map