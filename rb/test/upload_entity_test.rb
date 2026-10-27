# Upload entity test

require "minitest/autorun"
require "json"
require_relative "../Vidsmaller_sdk"
require_relative "runner"

class UploadEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = VidsmallerSDK.test(nil, nil)
    ent = testsdk.Upload(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = VidsmallerConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = VidsmallerSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Upload(nil).create({ "content_type" => 1, "file_size" => 1, "filename" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = upload_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "upload." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"upload.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/video/uploads\"}"
      skip("Live coverage incomplete: upload.create.0 excluded (GET-only live run: needs POST /api/v1/video/uploads)")
    end

    client = setup[:client]

    # CREATE
    upload_ref01_ent = client.Upload(nil)
    upload_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.upload"), "upload_ref01"))

    upload_ref01_data_result = upload_ref01_ent.create(upload_ref01_data, nil)
    upload_ref01_data = Helpers.to_map(upload_ref01_data_result.respond_to?(:data_get) ? upload_ref01_data_result.data_get : upload_ref01_data_result)
    assert !upload_ref01_data.nil?

  end
end

def upload_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "upload", "UploadTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = VidsmallerSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["upload01", "upload02", "upload03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["VIDSMALLER_TEST_UPLOAD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "VIDSMALLER_TEST_UPLOAD_ENTID" => idmap,
    "VIDSMALLER_TEST_LIVE" => "FALSE",
    "VIDSMALLER_TEST_EXPLAIN" => "FALSE",
    "VIDSMALLER_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["VIDSMALLER_TEST_UPLOAD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["VIDSMALLER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["VIDSMALLER_APIKEY"],
      },
      extra || {},
    ])
    client = VidsmallerSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["VIDSMALLER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["VIDSMALLER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
