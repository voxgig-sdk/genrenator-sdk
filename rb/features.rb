# Genrenator SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module GenrenatorFeatures
  def self.make_feature(name)
    case name
    when "base"
      GenrenatorBaseFeature.new
    when "test"
      GenrenatorTestFeature.new
    else
      GenrenatorBaseFeature.new
    end
  end
end
