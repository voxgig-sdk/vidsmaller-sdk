

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { VidsmallerSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('JobEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VIDSMALLER_TEST_LIVE=TRUE.
  afterEach(liveDelay('VIDSMALLER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VidsmallerSDK.test()
    const ent = testsdk.Job()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VidsmallerSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Job().create({"codec":1,"target_size_mb":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VIDSMALLER_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'job.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"codec":{"a":true,"h":"Codec","n":"codec","r":false,"t":"`$STRING`","key$":"codec","index$":0},"duration_seconds":{"a":true,"h":"Duration Seconds","n":"duration_seconds","r":false,"t":"`$NUMBER`","key$":"duration_seconds","index$":1},"max_resolution":{"a":true,"h":"Max Resolution","n":"max_resolution","r":false,"t":"`$STRING`","key$":"max_resolution","index$":2},"output_format":{"a":true,"h":"Output Format","n":"output_format","r":false,"t":"`$STRING`","key$":"output_format","index$":3},"source_url":{"a":true,"fo":"uri","h":"Source Url","n":"source_url","r":false,"t":"`$STRING`","key$":"source_url","index$":4},"target_size_mb":{"a":true,"h":"Target Size Mb","n":"target_size_mb","r":true,"t":"`$NUMBER`","key$":"target_size_mb","index$":5},"upload_token":{"a":true,"h":"Upload Token","n":"upload_token","r":false,"t":"`$STRING`","key$":"upload_token","index$":6},"webhook_url":{"a":true,"fo":"uri","h":"Webhook Url","n":"webhook_url","r":false,"t":"`$STRING`","key$":"webhook_url","index$":7}},"name":"job","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["codec","duration_seconds","max_resolution","output_format","source_url","target_size_mb","upload_token","webhook_url"],"co":{"id":"POST /api/v1/video/jobs","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/video/jobs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"video"},{"lit":"jobs"}],"t":{"req":"`reqdata`","res":"`body.job`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"job","name__orig":"job","Name":"Job","name_":"job","name-":"job","NAME":"JOB","index$":1}, {"active":true,"entity":"job","key$":"BasicJobFlow","kind":"basic","name":"BasicJobFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"job_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Job', {"POST /api/v1/video/jobs":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["target_size_mb"],"oneOf":[{"properties":{"source_url":{"type":"string","format":"uri"},"upload_token":false},"required":["source_url"]},{"properties":{"source_url":false,"upload_token":{"type":"string","minLength":40}},"required":["upload_token"]}],"properties":{"source_url":{"type":"string","format":"uri","maxLength":2000,"key$":"source_url"},"upload_token":{"type":"string","minLength":40,"maxLength":4000,"key$":"upload_token"},"duration_seconds":{"type":"number","exclusiveMinimum":0,"maximum":86400,"key$":"duration_seconds"},"target_size_mb":{"type":"number","exclusiveMinimum":0,"maximum":10240,"key$":"target_size_mb"},"codec":{"type":"string","enum":["h264","h265"],"default":"h264","key$":"codec"},"max_resolution":{"type":"string","enum":["2160p","1440p","1080p","720p","576p","480p","360p"],"key$":"max_resolution"},"output_format":{"type":"string","enum":["mp4","mkv","webm","mov"],"default":"mp4","x-ref":"#/components/schemas/OutputFormat","key$":"output_format"},"webhook_url":{"type":"string","format":"uri","maxLength":2000,"key$":"webhook_url"}},"x-ref":"#/components/schemas/CreateJobRequest","index$":1},"examples":{"publicUrl":{"summary":"Compress a public video URL","value":{"source_url":"https://cdn.example.com/input.mp4","target_size_mb":25,"codec":"h264","max_resolution":"1080p","output_format":"mp4","webhook_url":"https://example.com/webhooks/vidsmaller"}},"uploadedFile":{"summary":"Compress a previously uploaded file","value":{"upload_token":"UPLOAD_TOKEN_FROM_THE_SIGNED_UPLOAD_RESPONSE","target_size_mb":25}}}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"job.create.0":"GET-only live run: needs POST /api/v1/video/jobs"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const job_ref01_ent = client.Job()
    let job_ref01_data = setup.data.new.job['job_ref01']

    job_ref01_data = (await job_ref01_ent.create(job_ref01_data)).data()
    assert(null != job_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/job/JobTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = VidsmallerSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['job01','job02','job03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VIDSMALLER_TEST_JOB_ENTID': idmap,
    'VIDSMALLER_TEST_LIVE': 'FALSE',
    'VIDSMALLER_TEST_EXPLAIN': 'FALSE',
    'VIDSMALLER_APIKEY': '',
  })

  idmap = env['VIDSMALLER_TEST_JOB_ENTID']

  const live = 'TRUE' === env.VIDSMALLER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VIDSMALLER_TEST_JOB_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new VidsmallerSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.VIDSMALLER_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.VIDSMALLER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
