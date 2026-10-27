# Vidsmaller SDK utility: prepare_body
require_relative 'media'
module VidsmallerUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return VidsmallerUtilities.raw_body(ctx.reqdata) if VidsmallerUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
