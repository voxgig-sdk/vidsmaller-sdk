import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "estimate",
    "accessor": "Estimate",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/estimate",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "ok": true,
      "api": "x",
      "docs": "x",
      "unit": "x",
      "input": {
        "sizeBytes": 1,
        "sizeMb": 1,
        "durationSeconds": 1,
        "width": 1,
        "height": 1
      },
      "target": {
        "platform": "x",
        "platformName": "x",
        "safeTargetMb": 1,
        "targetSource": "explicit",
        "statedLimitMb": 1,
        "statedLimitTier": "x",
        "tierNote": "x",
        "verifiedAt": "2026-01-01",
        "sources": [
          {
            "label": "x",
            "url": "x"
          }
        ],
        "guideUrl": "x"
      },
      "verdict": "no_target",
      "fitsAsIs": true,
      "estimate": {
        "settings": {
          "mode": "preset",
          "preset": "light",
          "targetSizeMb": 1,
          "crf": 1,
          "resolution": "3840:2160",
          "maxResolution": "3840:2160",
          "bitrateKbps": 1,
          "codec": "libx264",
          "speed": "veryfast",
          "outputFormat": "mp4",
          "oldDeviceCompatible": true
        },
        "outputBytes": 1,
        "outputMb": 1,
        "savedPercent": 1,
        "fitsTarget": true,
        "jobSeconds": 1
      },
      "recommendation": {
        "settings": {
          "mode": "preset",
          "preset": "light",
          "targetSizeMb": 1,
          "crf": 1,
          "resolution": "3840:2160",
          "maxResolution": "3840:2160",
          "bitrateKbps": 1,
          "codec": "libx264",
          "speed": "veryfast",
          "outputFormat": "mp4",
          "oldDeviceCompatible": true
        },
        "outputMb": 1,
        "savedPercent": 1,
        "jobSeconds": 1,
        "quality": {
          "totalKbps": 1,
          "videoKbps": 1,
          "audioKbps": 1,
          "verdict": "x",
          "comfortableUpTo": "x",
          "watchableUpTo": "x"
        }
      },
      "notes": [
        "x"
      ],
      "compressUrl": "x"
    },
    "idField": "id"
  },
  {
    "entity": "estimate",
    "accessor": "Estimate",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/estimate",
    "args": [],
    "select": {
      "size_mb": "v1",
      "bitrate_kbp": "v1",
      "codec": "libx264",
      "crf": "v1",
      "duration_second": "v1",
      "height": "v1",
      "max_resolution": "v1",
      "mode": "preset",
      "output_format": "mp4",
      "platform": "v1",
      "preset": "balanced",
      "resolution": "v1",
      "size_byte": "v1",
      "speed": "faster",
      "target_mb": "v1",
      "target_size_mb": "v1",
      "width": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "sizeBytes",
      "sizeMb",
      "durationSeconds",
      "width",
      "height",
      "platform",
      "targetMb",
      "mode",
      "preset",
      "targetSizeMb",
      "crf",
      "resolution",
      "maxResolution",
      "bitrateKbps",
      "codec",
      "speed",
      "outputFormat"
    ],
    "queryArgs": [
      {
        "name": "bitrate_kbp",
        "wire": "bitrateKbps"
      },
      {
        "name": "codec",
        "wire": "codec"
      },
      {
        "name": "crf",
        "wire": "crf"
      },
      {
        "name": "duration_second",
        "wire": "durationSeconds"
      },
      {
        "name": "height",
        "wire": "height"
      },
      {
        "name": "max_resolution",
        "wire": "maxResolution"
      },
      {
        "name": "mode",
        "wire": "mode"
      },
      {
        "name": "output_format",
        "wire": "outputFormat"
      },
      {
        "name": "platform",
        "wire": "platform"
      },
      {
        "name": "preset",
        "wire": "preset"
      },
      {
        "name": "resolution",
        "wire": "resolution"
      },
      {
        "name": "size_byte",
        "wire": "sizeBytes"
      },
      {
        "name": "size_mb",
        "wire": "sizeMb"
      },
      {
        "name": "speed",
        "wire": "speed"
      },
      {
        "name": "target_mb",
        "wire": "targetMb"
      },
      {
        "name": "target_size_mb",
        "wire": "targetSizeMb"
      },
      {
        "name": "width",
        "wire": "width"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "ok": true,
      "api": "x",
      "docs": "x",
      "unit": "x",
      "input": {
        "sizeBytes": 1,
        "sizeMb": 1,
        "durationSeconds": 1,
        "width": 1,
        "height": 1
      },
      "target": {
        "platform": "x",
        "platformName": "x",
        "safeTargetMb": 1,
        "targetSource": "explicit",
        "statedLimitMb": 1,
        "statedLimitTier": "x",
        "tierNote": "x",
        "verifiedAt": "2026-01-01",
        "sources": [
          {
            "label": "x",
            "url": "x"
          }
        ],
        "guideUrl": "x"
      },
      "verdict": "no_target",
      "fitsAsIs": true,
      "estimate": {
        "settings": {
          "mode": "preset",
          "preset": "light",
          "targetSizeMb": 1,
          "crf": 1,
          "resolution": "3840:2160",
          "maxResolution": "3840:2160",
          "bitrateKbps": 1,
          "codec": "libx264",
          "speed": "veryfast",
          "outputFormat": "mp4",
          "oldDeviceCompatible": true
        },
        "outputBytes": 1,
        "outputMb": 1,
        "savedPercent": 1,
        "fitsTarget": true,
        "jobSeconds": 1
      },
      "recommendation": {
        "settings": {
          "mode": "preset",
          "preset": "light",
          "targetSizeMb": 1,
          "crf": 1,
          "resolution": "3840:2160",
          "maxResolution": "3840:2160",
          "bitrateKbps": 1,
          "codec": "libx264",
          "speed": "veryfast",
          "outputFormat": "mp4",
          "oldDeviceCompatible": true
        },
        "outputMb": 1,
        "savedPercent": 1,
        "jobSeconds": 1,
        "quality": {
          "totalKbps": 1,
          "videoKbps": 1,
          "audioKbps": 1,
          "verdict": "x",
          "comfortableUpTo": "x",
          "watchableUpTo": "x"
        }
      },
      "notes": [
        "x"
      ],
      "compressUrl": "x"
    },
    "idField": "id"
  },
  {
    "entity": "job",
    "accessor": "Job",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/video/jobs",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "ok": true,
      "api": "x",
      "docs": "x",
      "job": {
        "id": "x",
        "status": "pending",
        "progress": 1,
        "stage": "x",
        "eta_seconds": 1,
        "input_filename": "x",
        "output_filename": "x",
        "input_size": 1,
        "output_size": 1,
        "saved_bytes": 1,
        "saved_percent": 1,
        "credits_charged": 1,
        "download_url": "x",
        "expires_at": "2026-01-01T00:00:00Z",
        "error_code": "x",
        "created_at": "2026-01-01T00:00:00Z",
        "completed_at": "2026-01-01T00:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "platform",
    "accessor": "Platform",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/platforms",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "ok": true,
      "api": "x",
      "docs": "x",
      "verifiedAt": "2026-01-01",
      "unit": "x",
      "count": 1,
      "platforms": [
        {
          "key": "discord",
          "name": "x",
          "statedLimitMb": 1,
          "statedLimitTier": "x",
          "tierNote": "x",
          "safeTargetMb": 1,
          "tiers": [
            {
              "name": "x",
              "limitMb": 1,
              "note": "x"
            }
          ],
          "verifiedAt": "2026-01-01",
          "sources": [
            {
              "label": "x",
              "url": "x"
            }
          ],
          "guideUrl": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "upload",
    "accessor": "Upload",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/video/uploads",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "ok": true,
      "api": "x",
      "docs": "x",
      "upload": {
        "method": "x",
        "url": "x",
        "headers": {
          "content-type": "x",
          "content-length": "x"
        },
        "expires_in": 1
      },
      "upload_token": "x",
      "next": "x"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
