# Vidsmaller SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

VidsmallerUtility.registrar = ->(u) {
  u.clean = VidsmallerUtilities::Clean
  u.clean_add = VidsmallerUtilities::CleanAdd
  u.clean_explain = VidsmallerUtilities::CleanExplain
  u.done = VidsmallerUtilities::Done
  u.make_error = VidsmallerUtilities::MakeError
  u.feature_add = VidsmallerUtilities::FeatureAdd
  u.feature_hook = VidsmallerUtilities::FeatureHook
  u.feature_init = VidsmallerUtilities::FeatureInit
  u.fetcher = VidsmallerUtilities::Fetcher
  u.make_fetch_def = VidsmallerUtilities::MakeFetchDef
  u.make_context = VidsmallerUtilities::MakeContext
  u.make_options = VidsmallerUtilities::MakeOptions
  u.make_request = VidsmallerUtilities::MakeRequest
  u.make_response = VidsmallerUtilities::MakeResponse
  u.make_result = VidsmallerUtilities::MakeResult
  u.make_point = VidsmallerUtilities::MakePoint
  u.make_spec = VidsmallerUtilities::MakeSpec
  u.make_url = VidsmallerUtilities::MakeUrl
  u.param = VidsmallerUtilities::Param
  u.prepare_auth = VidsmallerUtilities::PrepareAuth
  u.prepare_body = VidsmallerUtilities::PrepareBody
  u.prepare_headers = VidsmallerUtilities::PrepareHeaders
  u.prepare_method = VidsmallerUtilities::PrepareMethod
  u.prepare_params = VidsmallerUtilities::PrepareParams
  u.prepare_path = VidsmallerUtilities::PreparePath
  u.prepare_query = VidsmallerUtilities::PrepareQuery
  u.graphql_body = VidsmallerUtilities::GraphqlBody
  u.graphql_errors = VidsmallerUtilities::GraphqlErrors
  u.result_basic = VidsmallerUtilities::ResultBasic
  u.result_body = VidsmallerUtilities::ResultBody
  u.result_headers = VidsmallerUtilities::ResultHeaders
  u.transform_request = VidsmallerUtilities::TransformRequest
  u.transform_response = VidsmallerUtilities::TransformResponse
}
