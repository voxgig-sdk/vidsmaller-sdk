package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewEstimateEntityFunc func(client *VidsmallerSDK, entopts map[string]any) VidsmallerEntity

var NewJobEntityFunc func(client *VidsmallerSDK, entopts map[string]any) VidsmallerEntity

var NewPlatformEntityFunc func(client *VidsmallerSDK, entopts map[string]any) VidsmallerEntity

var NewUploadEntityFunc func(client *VidsmallerSDK, entopts map[string]any) VidsmallerEntity

