package = "voxgig-sdk-genrenator"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/genrenator-sdk.git"
}
description = {
  summary = "Genrenator SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
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
