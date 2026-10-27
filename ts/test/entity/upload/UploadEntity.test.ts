

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


describe('UploadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VIDSMALLER_TEST_LIVE=TRUE.
  afterEach(liveDelay('VIDSMALLER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VidsmallerSDK.test()
    const ent = testsdk.Upload()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VidsmallerSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Upload().create({"content_type":1,"file_size":1,"filename":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VIDSMALLER_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'upload.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"content_type":{"a":true,"h":"Content Type","n":"content_type","r":false,"t":"`$STRING`","key$":"content_type","index$":0},"file_size":{"a":true,"h":"File Size","n":"file_size","r":true,"t":"`$INTEGER`","key$":"file_size","index$":1},"filename":{"a":true,"h":"Filename","n":"filename","r":true,"t":"`$STRING`","key$":"filename","index$":2}},"name":"upload","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["content_type","file_size","filename"],"co":{"id":"POST /api/v1/video/uploads","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/video/uploads","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"video"},{"lit":"uploads"}],"t":{"req":"`reqdata`","res":"`body.upload`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"upload","name__orig":"upload","Name":"Upload","name_":"upload","name-":"upload","NAME":"UPLOAD","index$":3}, {"active":true,"entity":"upload","key$":"BasicUploadFlow","kind":"basic","name":"BasicUploadFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"upload_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Upload', {"POST /api/v1/video/uploads":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["filename","file_size"],"properties":{"filename":{"type":"string","minLength":1,"maxLength":255,"key$":"filename"},"file_size":{"type":"integer","minimum":1,"key$":"file_size"},"content_type":{"type":"string","default":"application/octet-stream","maxLength":120,"key$":"content_type"}},"x-ref":"#/components/schemas/UploadRequest","index$":1},"example":{"filename":"input.mp4","file_size":52428800,"content_type":"video/mp4"}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"upload.create.0":"GET-only live run: needs POST /api/v1/video/uploads"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const upload_ref01_ent = client.Upload()
    let upload_ref01_data = setup.data.new.upload['upload_ref01']

    upload_ref01_data = (await upload_ref01_ent.create(upload_ref01_data)).data()
    assert(null != upload_ref01_data)


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
      '../../../../.sdk/test/entity/upload/UploadTestData.json')

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
    ['upload01','upload02','upload03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VIDSMALLER_TEST_UPLOAD_ENTID': idmap,
    'VIDSMALLER_TEST_LIVE': 'FALSE',
    'VIDSMALLER_TEST_EXPLAIN': 'FALSE',
    'VIDSMALLER_APIKEY': '',
  })

  idmap = env['VIDSMALLER_TEST_UPLOAD_ENTID']

  const live = 'TRUE' === env.VIDSMALLER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VIDSMALLER_TEST_UPLOAD_ENTID']
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
  
