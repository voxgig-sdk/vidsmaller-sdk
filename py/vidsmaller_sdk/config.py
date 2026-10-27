# Vidsmaller SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Vidsmaller",
            "slug": "vidsmaller",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://vidsmaller.com",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "estimate": {},
                "job": {},
                "platform": {},
                "upload": {},
            },
        },
        "entity": {
      "estimate": {
        "fields": [
          {
            "name": "api",
            "title": "Api",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "compressUrl",
            "title": "Compress Url",
            "type": "`$STRING`",
            "req": True,
            "format": "uri",
          },
          {
            "name": "docs",
            "title": "Docs",
            "type": "`$STRING`",
            "req": True,
            "format": "uri",
          },
          {
            "name": "durationSeconds",
            "title": "Duration Seconds",
            "type": "`$NUMBER`",
          },
          {
            "name": "estimate",
            "title": "Estimate",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "fitsAsIs",
            "title": "Fits As Is",
            "type": [
              "`$ONE`",
              [
                "`$BOOLEAN`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "height",
            "title": "Height",
            "type": "`$INTEGER`",
          },
          {
            "name": "input",
            "title": "Input",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "notes",
            "title": "Notes",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "ok",
            "title": "Ok",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "platform",
            "title": "Platform",
            "type": "`$STRING`",
          },
          {
            "name": "recommendation",
            "title": "Recommendation",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "settings",
            "title": "Settings",
            "type": "`$OBJECT`",
          },
          {
            "name": "sizeBytes",
            "title": "Size Bytes",
            "type": "`$INTEGER`",
          },
          {
            "name": "sizeMb",
            "title": "Size Mb",
            "type": "`$NUMBER`",
          },
          {
            "name": "target",
            "title": "Target",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "targetMb",
            "title": "Target Mb",
            "type": "`$NUMBER`",
          },
          {
            "name": "unit",
            "title": "Unit",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "verdict",
            "title": "Verdict",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "width",
            "title": "Width",
            "type": "`$INTEGER`",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "estimate",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "estimate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.estimate`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "estimate",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "estimate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.estimate`",
                },
                "args": {
                  "query": [
                    {
                      "name": "bitrate_kbp",
                      "orig": "bitrateKbps",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "codec",
                      "orig": "codec",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "libx264",
                    },
                    {
                      "name": "crf",
                      "orig": "crf",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "duration_second",
                      "orig": "durationSeconds",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "height",
                      "orig": "height",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "max_resolution",
                      "orig": "maxResolution",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "mode",
                      "orig": "mode",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "preset",
                    },
                    {
                      "name": "output_format",
                      "orig": "outputFormat",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "mp4",
                    },
                    {
                      "name": "platform",
                      "orig": "platform",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "preset",
                      "orig": "preset",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "balanced",
                    },
                    {
                      "name": "resolution",
                      "orig": "resolution",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "size_byte",
                      "orig": "sizeBytes",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "size_mb",
                      "orig": "sizeMb",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 100,
                    },
                    {
                      "name": "speed",
                      "orig": "speed",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "faster",
                    },
                    {
                      "name": "target_mb",
                      "orig": "targetMb",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "target_size_mb",
                      "orig": "targetSizeMb",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "width",
                      "orig": "width",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "size_mb",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "job": {
        "fields": [
          {
            "name": "codec",
            "title": "Codec",
            "type": "`$STRING`",
          },
          {
            "name": "duration_seconds",
            "title": "Duration Seconds",
            "type": "`$NUMBER`",
          },
          {
            "name": "max_resolution",
            "title": "Max Resolution",
            "type": "`$STRING`",
          },
          {
            "name": "output_format",
            "title": "Output Format",
            "type": "`$STRING`",
          },
          {
            "name": "source_url",
            "title": "Source Url",
            "type": "`$STRING`",
            "format": "uri",
          },
          {
            "name": "target_size_mb",
            "title": "Target Size Mb",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "upload_token",
            "title": "Upload Token",
            "type": "`$STRING`",
          },
          {
            "name": "webhook_url",
            "title": "Webhook Url",
            "type": "`$STRING`",
            "format": "uri",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "video",
                  },
                  {
                    "lit": "jobs",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "video",
                  "jobs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.job`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "platform": {
        "fields": [
          {
            "name": "api",
            "title": "Api",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "count",
            "title": "Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "docs",
            "title": "Docs",
            "type": "`$STRING`",
            "req": True,
            "format": "uri",
          },
          {
            "name": "ok",
            "title": "Ok",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "platforms",
            "title": "Platforms",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "unit",
            "title": "Unit",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "verifiedAt",
            "title": "Verified At",
            "type": "`$STRING`",
            "req": True,
            "format": "date",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "platforms",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "platforms",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "upload": {
        "fields": [
          {
            "name": "content_type",
            "title": "Content Type",
            "type": "`$STRING`",
          },
          {
            "name": "file_size",
            "title": "File Size",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "filename",
            "title": "Filename",
            "type": "`$STRING`",
            "req": True,
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "video",
                  },
                  {
                    "lit": "uploads",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "video",
                  "uploads",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.upload`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
