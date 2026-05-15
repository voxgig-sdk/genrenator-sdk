package voxgiggenrenatorsdk

import (
	"github.com/voxgig-sdk/genrenator-sdk/core"
	"github.com/voxgig-sdk/genrenator-sdk/entity"
	"github.com/voxgig-sdk/genrenator-sdk/feature"
	_ "github.com/voxgig-sdk/genrenator-sdk/utility"
)

// Type aliases preserve external API.
type GenrenatorSDK = core.GenrenatorSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GenrenatorEntity = core.GenrenatorEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GenrenatorError = core.GenrenatorError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGenreEntityFunc = func(client *core.GenrenatorSDK, entopts map[string]any) core.GenrenatorEntity {
		return entity.NewGenreEntity(client, entopts)
	}
	core.NewStoryEntityFunc = func(client *core.GenrenatorSDK, entopts map[string]any) core.GenrenatorEntity {
		return entity.NewStoryEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGenrenatorSDK = core.NewGenrenatorSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
