package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGenreEntityFunc func(client *GenrenatorSDK, entopts map[string]any) GenrenatorEntity

var NewStoryEntityFunc func(client *GenrenatorSDK, entopts map[string]any) GenrenatorEntity

