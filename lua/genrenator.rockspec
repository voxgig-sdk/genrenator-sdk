package = "voxgig-sdk-genrenator"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/genrenator-sdk.git",
  tag = "lua/v0.0.1",
  dir = "genrenator-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Genrenator public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/genrenator-sdk",
  issues_url = "https://github.com/voxgig-sdk/genrenator-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "genrenator" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["genrenator_sdk"] = "genrenator_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
