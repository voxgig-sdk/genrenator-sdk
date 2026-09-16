package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGenreEntityFunc func(client *GenrenatorSDK, entopts map[string]any) GenrenatorEntity

var NewStoryEntityFunc func(client *GenrenatorSDK, entopts map[string]any) GenrenatorEntity

