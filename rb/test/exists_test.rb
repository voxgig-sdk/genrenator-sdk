# Genrenator SDK exists test

require "minitest/autorun"
require_relative "../Genrenator_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = GenrenatorSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
