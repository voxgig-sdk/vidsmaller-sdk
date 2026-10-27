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
(0, node_test_1.describe)('UploadEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when VIDSMALLER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('VIDSMALLER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.VidsmallerSDK.test();
        const ent = testsdk.Upload();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.VidsmallerSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Upload().create({ "content_type": 1, "file_size": 1, "filename": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.VIDSMALLER_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'upload.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "content_type": { "a": true, "h": "Content Type", "n": "content_type", "r": false, "t": "`$STRING`", "key$": "content_type", "index$": 0 }, "file_size": { "a": true, "h": "File Size", "n": "file_size", "r": true, "t": "`$INTEGER`", "key$": "file_size", "index$": 1 }, "filename": { "a": true, "h": "Filename", "n": "filename", "r": true, "t": "`$STRING`", "key$": "filename", "index$": 2 } }, "name": "upload", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["content_type", "file_size", "filename"], "co": { "id": "POST /api/v1/video/uploads", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/video/uploads", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "video" }, { "lit": "uploads" }], "t": { "req": "`reqdata`", "res": "`body.upload`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "upload", "name__orig": "upload", "Name": "Upload", "name_": "upload", "name-": "upload", "NAME": "UPLOAD", "index$": 3 }, { "active": true, "entity": "upload", "key$": "BasicUploadFlow", "kind": "basic", "name": "BasicUploadFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "upload_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Upload', { "POST /api/v1/video/uploads": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["filename", "file_size"], "properties": { "filename": { "type": "string", "minLength": 1, "maxLength": 255, "key$": "filename" }, "file_size": { "type": "integer", "minimum": 1, "key$": "file_size" }, "content_type": { "type": "string", "default": "application/octet-stream", "maxLength": 120, "key$": "content_type" } }, "x-ref": "#/components/schemas/UploadRequest", "index$": 1 }, "example": { "filename": "input.mp4", "file_size": 52428800, "content_type": "video/mp4" } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "upload.create.0": "GET-only live run: needs POST /api/v1/video/uploads" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const upload_ref01_ent = client.Upload();
        let upload_ref01_data = setup.data.new.upload['upload_ref01'];
        upload_ref01_data = (await upload_ref01_ent.create(upload_ref01_data)).data();
        (0, node_assert_1.default)(null != upload_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/upload/UploadTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.VidsmallerSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['upload01', 'upload02', 'upload03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'VIDSMALLER_TEST_UPLOAD_ENTID': idmap,
        'VIDSMALLER_TEST_LIVE': 'FALSE',
        'VIDSMALLER_TEST_EXPLAIN': 'FALSE',
        'VIDSMALLER_APIKEY': '',
    });
    idmap = env['VIDSMALLER_TEST_UPLOAD_ENTID'];
    const live = 'TRUE' === env.VIDSMALLER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['VIDSMALLER_TEST_UPLOAD_ENTID'];
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
//# sourceMappingURL=UploadEntity.test.js.map