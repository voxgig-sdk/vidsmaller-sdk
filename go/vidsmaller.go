package voxgigvidsmallersdk

import (
	"github.com/voxgig-sdk/vidsmaller-sdk/go/core"
	"github.com/voxgig-sdk/vidsmaller-sdk/go/entity"
	"github.com/voxgig-sdk/vidsmaller-sdk/go/feature"
	_ "github.com/voxgig-sdk/vidsmaller-sdk/go/utility"
)

// Type aliases preserve external API.
type VidsmallerSDK = core.VidsmallerSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type VidsmallerEntity = core.VidsmallerEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type VidsmallerError = core.VidsmallerError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewEstimateEntityFunc = func(client *core.VidsmallerSDK, entopts map[string]any) core.VidsmallerEntity {
		return entity.NewEstimateEntity(client, entopts)
	}
	core.NewJobEntityFunc = func(client *core.VidsmallerSDK, entopts map[string]any) core.VidsmallerEntity {
		return entity.NewJobEntity(client, entopts)
	}
	core.NewPlatformEntityFunc = func(client *core.VidsmallerSDK, entopts map[string]any) core.VidsmallerEntity {
		return entity.NewPlatformEntity(client, entopts)
	}
	core.NewUploadEntityFunc = func(client *core.VidsmallerSDK, entopts map[string]any) core.VidsmallerEntity {
		return entity.NewUploadEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewVidsmallerSDK = core.NewVidsmallerSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewVidsmallerSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *VidsmallerSDK  { return NewVidsmallerSDK(nil) }
func Test() *VidsmallerSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
