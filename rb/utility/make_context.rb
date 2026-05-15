# Genrenator SDK utility: make_context
require_relative '../core/context'
module GenrenatorUtilities
  MakeContext = ->(ctxmap, basectx) {
    GenrenatorContext.new(ctxmap, basectx)
  }
end
