# Vidsmaller SDK utility: make_context
require_relative '../core/context'
module VidsmallerUtilities
  MakeContext = ->(ctxmap, basectx) {
    VidsmallerContext.new(ctxmap, basectx)
  }
end
