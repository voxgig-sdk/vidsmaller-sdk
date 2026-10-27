# Vidsmaller SDK exists test

require "minitest/autorun"
require_relative "../Vidsmaller_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = VidsmallerSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
