# Genrenator SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GenrenatorFeatures
  def self.make_feature(name)
    case name
    when "base"
      GenrenatorBaseFeature.new
    when "ratelimit"
      GenrenatorRatelimitFeature.new
    when "retry"
      GenrenatorRetryFeature.new
    when "test"
      GenrenatorTestFeature.new
    when "timeout"
      GenrenatorTimeoutFeature.new
    else
      GenrenatorBaseFeature.new
    end
  end
end
