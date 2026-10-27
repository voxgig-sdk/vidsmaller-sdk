"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EstimateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when VIDSMALLER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('VIDSMALLER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.VidsmallerSDK.test();
        const ent = testsdk.Estimate();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('estimate hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.VidsmallerSDK.test(offline).Estimate().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.VidsmallerSDK.test(offline).Estimate()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.VidsmallerSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Estimate().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.VidsmallerSDK.test().Estimate().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.VidsmallerSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Estimate().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Estimate().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.VidsmallerSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Estimate().list({ "bitrate_kbp": "x", "size_mb": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.VIDSMALLER_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'estimate.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "api": { "a": true, "h": "Api", "n": "api", "r": true, "t": "`$STRING`", "key$": "api", "index$": 0 }, "compressUrl": { "a": true, "fo": "uri", "h": "Compress Url", "n": "compressUrl", "r": true, "t": "`$STRING`", "key$": "compressUrl", "index$": 1 }, "docs": { "a": true, "fo": "uri", "h": "Docs", "n": "docs", "r": true, "t": "`$STRING`", "key$": "docs", "index$": 2 }, "durationSeconds": { "a": true, "h": "Duration Seconds", "n": "durationSeconds", "r": false, "t": "`$NUMBER`", "key$": "durationSeconds", "index$": 3 }, "estimate": { "a": true, "h": "Estimate", "n": "estimate", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "estimate", "index$": 4 }, "fitsAsIs": { "a": true, "h": "Fits As Is", "n": "fitsAsIs", "r": true, "t": ["`$ONE`", ["`$BOOLEAN`", "`$NULL`"]], "key$": "fitsAsIs", "index$": 5 }, "height": { "a": true, "h": "Height", "n": "height", "r": false, "t": "`$INTEGER`", "key$": "height", "index$": 6 }, "input": { "a": true, "h": "Input", "n": "input", "r": true, "t": "`$OBJECT`", "key$": "input", "index$": 7 }, "notes": { "a": true, "h": "Notes", "n": "notes", "r": true, "t": "`$ARRAY`", "key$": "notes", "index$": 8 }, "ok": { "a": true, "h": "Ok", "n": "ok", "r": true, "t": "`$BOOLEAN`", "key$": "ok", "index$": 9 }, "platform": { "a": true, "h": "Platform", "n": "platform", "r": false, "t": "`$STRING`", "key$": "platform", "index$": 10 }, "recommendation": { "a": true, "h": "Recommendation", "n": "recommendation", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "recommendation", "index$": 11 }, "settings": { "a": true, "h": "Settings", "n": "settings", "r": false, "t": "`$OBJECT`", "key$": "settings", "index$": 12 }, "sizeBytes": { "a": true, "h": "Size Bytes", "n": "sizeBytes", "r": false, "t": "`$INTEGER`", "key$": "sizeBytes", "index$": 13 }, "sizeMb": { "a": true, "h": "Size Mb", "n": "sizeMb", "r": false, "t": "`$NUMBER`", "key$": "sizeMb", "index$": 14 }, "target": { "a": true, "h": "Target", "n": "target", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "target", "index$": 15 }, "targetMb": { "a": true, "h": "Target Mb", "n": "targetMb", "r": false, "t": "`$NUMBER`", "key$": "targetMb", "index$": 16 }, "unit": { "a": true, "h": "Unit", "n": "unit", "r": true, "t": "`$STRING`", "key$": "unit", "index$": 17 }, "verdict": { "a": true, "h": "Verdict", "n": "verdict", "r": true, "t": "`$STRING`", "key$": "verdict", "index$": 18 }, "width": { "a": true, "h": "Width", "n": "width", "r": false, "t": "`$INTEGER`", "key$": "width", "index$": 19 } }, "name": "estimate", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["durationSeconds", "height", "platform", "settings", "sizeBytes", "sizeMb", "targetMb", "width"], "co": { "id": "POST /api/v1/estimate", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/estimate", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "estimate" }], "t": { "req": "`reqdata`", "res": "`body.estimate`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/estimate", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "bitrate_kbp", "or": "bitrateKbps", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "libx264", "k": "query", "n": "codec", "or": "codec", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "crf", "or": "crf", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "duration_second", "or": "durationSeconds", "r": false, "t": "`$NUMBER`", "index$": 3 }, { "a": true, "k": "query", "n": "height", "or": "height", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "max_resolution", "or": "maxResolution", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": "preset", "k": "query", "n": "mode", "or": "mode", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "ex": "mp4", "k": "query", "n": "output_format", "or": "outputFormat", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "k": "query", "n": "platform", "or": "platform", "r": false, "t": "`$STRING`", "index$": 8 }, { "a": true, "ex": "balanced", "k": "query", "n": "preset", "or": "preset", "r": false, "t": "`$STRING`", "index$": 9 }, { "a": true, "k": "query", "n": "resolution", "or": "resolution", "r": false, "t": "`$STRING`", "index$": 10 }, { "a": true, "k": "query", "n": "size_byte", "or": "sizeBytes", "r": false, "t": "`$INTEGER`", "index$": 11 }, { "a": true, "ex": 100, "k": "query", "n": "size_mb", "or": "sizeMb", "r": true, "t": "`$NUMBER`", "index$": 12 }, { "a": true, "ex": "faster", "k": "query", "n": "speed", "or": "speed", "r": false, "t": "`$STRING`", "index$": 13 }, { "a": true, "k": "query", "n": "target_mb", "or": "targetMb", "r": false, "t": "`$NUMBER`", "index$": 14 }, { "a": true, "k": "query", "n": "target_size_mb", "or": "targetSizeMb", "r": false, "t": "`$NUMBER`", "index$": 15 }, { "a": true, "k": "query", "n": "width", "or": "width", "r": false, "t": "`$INTEGER`", "index$": 16 }] }, "k": "http", "m": "GET", "o": "/api/v1/estimate", "q": { "exist": ["size_mb"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "estimate" }], "t": { "req": "`reqdata`", "res": "`body.estimate`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "estimate", "name__orig": "estimate", "Name": "Estimate", "name_": "estimate", "name-": "estimate", "NAME": "ESTIMATE", "index$": 0 }, { "active": true, "entity": "estimate", "key$": "BasicEstimateFlow", "kind": "basic", "name": "BasicEstimateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "estimate_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "estimate_ref01" } }], "index$": 1 }] }, 'Estimate', { "POST /api/v1/estimate": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "anyOf": [{ "required": ["sizeBytes"] }, { "required": ["sizeMb"] }], "properties": { "sizeBytes": { "type": "integer", "minimum": 1, "key$": "sizeBytes" }, "sizeMb": { "type": "number", "exclusiveMinimum": 0, "key$": "sizeMb" }, "durationSeconds": { "type": "number", "exclusiveMinimum": 0, "maximum": 86400, "key$": "durationSeconds" }, "width": { "type": "integer", "minimum": 1, "maximum": 16384, "key$": "width" }, "height": { "type": "integer", "minimum": 1, "maximum": 16384, "key$": "height" }, "platform": { "type": "string", "enum": ["discord", "email", "whatsapp", "telegram", "slack", "instagram", "tiktok", "twitter"], "x-ref": "#/components/schemas/PlatformKey", "key$": "platform" }, "targetMb": { "type": "number", "exclusiveMinimum": 0, "maximum": 10240, "key$": "targetMb" }, "settings": { "type": "object", "properties": { "mode": { "type": "string", "enum": ["preset", "target_size", "quality", "resolution", "bitrate"], "default": "preset", "x-ref": "#/components/schemas/CompressionMode" }, "preset": { "type": "string", "enum": ["light", "balanced", "strong", "extreme"], "default": "balanced", "x-ref": "#/components/schemas/CompressionPreset" }, "targetSizeMb": { "type": "number", "exclusiveMinimum": 0, "maximum": 10240 }, "crf": { "type": "integer", "minimum": 18, "maximum": 51 }, "resolution": { "type": "string", "enum": ["3840:2160", "2560:1440", "1920:1080", "1280:720", "1024:576", "854:480", "640:360"], "x-ref": "#/components/schemas/ResolutionDimensions" }, "maxResolution": { "type": "string", "enum": ["3840:2160", "2560:1440", "1920:1080", "1280:720", "1024:576", "854:480", "640:360"], "x-ref": "#/components/schemas/ResolutionDimensions" }, "bitrateKbps": { "type": "integer", "minimum": 100, "maximum": 512000 }, "codec": { "type": "string", "enum": ["libx264", "libx265"], "default": "libx264", "x-ref": "#/components/schemas/EstimateCodec" }, "speed": { "type": "string", "enum": ["veryfast", "faster", "fast", "medium", "slow"], "default": "faster", "x-ref": "#/components/schemas/CompressionSpeed" }, "outputFormat": { "type": "string", "enum": ["mp4", "mkv", "webm", "mov"], "default": "mp4", "x-ref": "#/components/schemas/OutputFormat" }, "oldDeviceCompatible": { "type": "boolean", "default": false } }, "x-ref": "#/components/schemas/CompressionSettings", "key$": "settings" } }, "x-ref": "#/components/schemas/EstimateRequest", "index$": 1 }, "examples": { "discord": { "summary": "Check a 150 MB video against Discord", "value": { "sizeMb": 150, "durationSeconds": 596, "platform": "discord" } }, "customTarget": { "summary": "Estimate a custom target-size encode", "value": { "sizeMb": 500, "durationSeconds": 900, "targetMb": 100, "settings": { "mode": "target_size", "targetSizeMb": 100, "codec": "libx264", "maxResolution": "1920:1080" } } } } } } }, "parameters": [] }, "GET /api/v1/estimate": { "protocol": "http", "parameters": [{ "name": "sizeBytes", "in": "query", "description": "Source file size in bytes. Takes precedence over sizeMb.", "schema": { "type": "integer", "minimum": 1 }, "index$": 0 }, { "name": "sizeMb", "in": "query", "description": "Source size in MiB, where 1 MB equals 1,048,576 bytes.", "schema": { "type": "number", "exclusiveMinimum": 0 }, "required": true, "example": 100, "index$": 1 }, { "name": "durationSeconds", "in": "query", "description": "Video duration. Strongly recommended for bitrate and quality guidance.", "schema": { "type": "number", "exclusiveMinimum": 0, "maximum": 86400 }, "index$": 2 }, { "name": "width", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 16384 }, "index$": 3 }, { "name": "height", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 16384 }, "index$": 4 }, { "name": "platform", "in": "query", "description": "Platform key returned by /api/v1/platforms.", "schema": { "type": "string", "enum": ["discord", "email", "whatsapp", "telegram", "slack", "instagram", "tiktok", "twitter"], "x-ref": "#/components/schemas/PlatformKey" }, "index$": 5 }, { "name": "targetMb", "in": "query", "description": "Explicit target size in MiB. Overrides the platform's safe target.", "schema": { "type": "number", "exclusiveMinimum": 0, "maximum": 10240 }, "index$": 6 }, { "name": "mode", "in": "query", "schema": { "type": "string", "enum": ["preset", "target_size", "quality", "resolution", "bitrate"], "default": "preset", "x-ref": "#/components/schemas/CompressionMode" }, "index$": 7 }, { "name": "preset", "in": "query", "schema": { "type": "string", "enum": ["light", "balanced", "strong", "extreme"], "default": "balanced", "x-ref": "#/components/schemas/CompressionPreset" }, "index$": 8 }, { "name": "targetSizeMb", "in": "query", "schema": { "type": "number", "exclusiveMinimum": 0, "maximum": 10240 }, "index$": 9 }, { "name": "crf", "in": "query", "schema": { "type": "integer", "minimum": 18, "maximum": 51 }, "index$": 10 }, { "name": "resolution", "in": "query", "schema": { "type": "string", "enum": ["3840:2160", "2560:1440", "1920:1080", "1280:720", "1024:576", "854:480", "640:360"], "x-ref": "#/components/schemas/ResolutionDimensions" }, "index$": 11 }, { "name": "maxResolution", "in": "query", "schema": { "type": "string", "enum": ["3840:2160", "2560:1440", "1920:1080", "1280:720", "1024:576", "854:480", "640:360"], "x-ref": "#/components/schemas/ResolutionDimensions" }, "index$": 12 }, { "name": "bitrateKbps", "in": "query", "schema": { "type": "integer", "minimum": 100, "maximum": 512000 }, "index$": 13 }, { "name": "codec", "in": "query", "schema": { "type": "string", "enum": ["libx264", "libx265"], "default": "libx264", "x-ref": "#/components/schemas/EstimateCodec" }, "index$": 14 }, { "name": "speed", "in": "query", "schema": { "type": "string", "enum": ["veryfast", "faster", "fast", "medium", "slow"], "default": "faster", "x-ref": "#/components/schemas/CompressionSpeed" }, "index$": 15 }, { "name": "outputFormat", "in": "query", "schema": { "type": "string", "enum": ["mp4", "mkv", "webm", "mov"], "default": "mp4", "x-ref": "#/components/schemas/OutputFormat" }, "index$": 16 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "estimate.create.0": "GET-only live run: needs POST /api/v1/estimate" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const estimate_ref01_ent = client.Estimate();
        let estimate_ref01_data = setup.data.new.estimate['estimate_ref01'];
        estimate_ref01_data = (await estimate_ref01_ent.create(estimate_ref01_data)).data();
        (0, node_assert_1.default)(null != estimate_ref01_data);
        // LIST
        const estimate_ref01_match = {};
        const estimate_ref01_list = (await estimate_ref01_ent.list(estimate_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/estimate/EstimateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.VidsmallerSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['estimate01', 'estimate02', 'estimate03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'VIDSMALLER_TEST_ESTIMATE_ENTID': idmap,
        'VIDSMALLER_TEST_LIVE': 'FALSE',
        'VIDSMALLER_TEST_EXPLAIN': 'FALSE',
        'VIDSMALLER_APIKEY': '',
    });
    idmap = env['VIDSMALLER_TEST_ESTIMATE_ENTID'];
    const live = 'TRUE' === env.VIDSMALLER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['VIDSMALLER_TEST_ESTIMATE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.VidsmallerSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=EstimateEntity.test.js.map