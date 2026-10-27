-- Vidsmaller SDK exists test

local sdk = require("vidsmaller_sdk")

describe("VidsmallerSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
