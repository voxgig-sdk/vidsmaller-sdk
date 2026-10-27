# Vidsmaller SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module VidsmallerFeatures
  def self.make_feature(name)
    case name
    when "base"
      VidsmallerBaseFeature.new
    when "ratelimit"
      VidsmallerRatelimitFeature.new
    when "retry"
      VidsmallerRetryFeature.new
    when "test"
      VidsmallerTestFeature.new
    when "timeout"
      VidsmallerTimeoutFeature.new
    else
      VidsmallerBaseFeature.new
    end
  end
end
