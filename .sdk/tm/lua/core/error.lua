-- Genrenator SDK error

local GenrenatorError = {}
GenrenatorError.__index = GenrenatorError


function GenrenatorError.new(code, msg, ctx)
  local self = setmetatable({}, GenrenatorError)
  self.is_sdk_error = true
  self.sdk = "Genrenator"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function GenrenatorError:error()
  return self.msg
end


function GenrenatorError:__tostring()
  return self.msg
end


return GenrenatorError
