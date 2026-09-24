

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"story","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /story/{count}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":25,"k":"param","n":"id","or":"count","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/story/{count}","q":{"exist":["id"]},"r":{"param":{"count":"id"}},"s":[{"lit":"story"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /story","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/story","q":{},"r":{},"s":[{"lit":"story"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"story","name__orig":"story","Name":"Story","name_":"story","name-":"story","NAME":"STORY","index$":1}, {"active":true,"entity":"story","key$":"BasicStoryFlow","kind":"basic","name":"BasicStoryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"story_ref01","srcdatavar":"story_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-story_ref01"}}],"index$":0}]}, 'Story', {"GET /story/{count}":{"protocol":"http","operationId":"getStories","responses":{"200":{"description":"Successfully generated multiple random genre stories","content":{"application/json":{"schema":{"type":"array","items":{"type":"string","key$":"items"},"example":["In the underground clubs of Berlin, a new sound emerged combining electronic beats with traditional folk instruments.","A group of musicians in Tokyo pioneered a fusion of ambient soundscapes and traditional percussion.","The genre was born in the late night jazz clubs where experimental artists pushed boundaries."]}}}}},"parameters":[{"name":"count","in":"path","required":true,"description":"Number of stories to generate","schema":{"type":"integer","minimum":1,"example":25},"index$":0}],"securitySource":"unspecified"},"GET /story":{"protocol":"http","operationId":"getStory","responses":{"200":{"description":"Successfully generated a random genre story","content":{"application/json":{"schema":{"type":"string","example":"In the underground clubs of Berlin, a new sound emerged combining electronic beats with traditional folk instruments."}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
