

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GenrenatorSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('StoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GENRENATOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('GENRENATOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GenrenatorSDK.test()
    const ent = testsdk.Story()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GENRENATOR_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'story.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"story","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":25,"kind":"param","name":"id","orig":"count","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /story/{count}","json":"{\"operationId\":\"getStories\",\"parameters\":[{\"description\":\"Number of stories to generate\",\"in\":\"path\",\"name\":\"count\",\"required\":true,\"schema\":{\"example\":25,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":[\"In the underground clubs of Berlin, a new sound emerged combining electronic beats with traditional folk instruments.\",\"A group of musicians in Tokyo pioneered a fusion of ambient soundscapes and traditional percussion.\",\"The genre was born in the late night jazz clubs where experimental artists pushed boundaries.\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}}},\"description\":\"Successfully generated multiple random genre stories\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/story/{count}","rename":{"param":{"count":"id"}},"segments":[{"lit":"story"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /story","json":"{\"operationId\":\"getStory\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":\"In the underground clubs of Berlin, a new sound emerged combining electronic beats with traditional folk instruments.\",\"type\":\"string\"}}},\"description\":\"Successfully generated a random genre story\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/story","segments":[{"lit":"story"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"story","name__orig":"story","Name":"Story","name_":"story","name-":"story","NAME":"STORY","index$":1}, {"active":true,"entity":"story","key$":"BasicStoryFlow","kind":"basic","name":"BasicStoryFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"story_ref01","srcdatavar":"story_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-story_ref01"}}],"index$":0}]}, 'Story')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let story_ref01_data = Object.values(setup.data.existing.story)[0] as any

    // LOAD
    const story_ref01_ent = client.Story()
    const story_ref01_match_dt0: any = {}
    story_ref01_match_dt0.id = story_ref01_data.id
    const story_ref01_data_dt0 = (await story_ref01_ent.load(story_ref01_match_dt0)).data()
    assert(story_ref01_data_dt0.id === story_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/story/StoryTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GenrenatorSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['story01','story02','story03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GENRENATOR_TEST_STORY_ENTID': idmap,
    'GENRENATOR_TEST_LIVE': 'FALSE',
    'GENRENATOR_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GENRENATOR_TEST_STORY_ENTID']

  const live = 'TRUE' === env.GENRENATOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GENRENATOR_TEST_STORY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GenrenatorSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.GENRENATOR_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
