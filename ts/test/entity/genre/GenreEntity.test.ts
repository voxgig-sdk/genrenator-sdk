

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


describe('GenreEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GENRENATOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('GENRENATOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GenrenatorSDK.test()
    const ent = testsdk.Genre()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GENRENATOR_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'genre.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"genre","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":10,"kind":"param","name":"id","orig":"count","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /genre/{count}","json":"{\"operationId\":\"getGenres\",\"parameters\":[{\"description\":\"Number of genres to generate\",\"in\":\"path\",\"name\":\"count\",\"required\":true,\"schema\":{\"example\":10,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":[\"ambient electronic jazz\",\"indie folk rock\",\"experimental hip hop\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}}},\"description\":\"Successfully generated multiple random genres\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/genre/{count}","rename":{"param":{"count":"id"}},"segments":[{"lit":"genre"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /genre","json":"{\"operationId\":\"getGenre\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":\"ambient electronic jazz\",\"type\":\"string\"}}},\"description\":\"Successfully generated a random genre\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/genre","segments":[{"lit":"genre"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"genre","name__orig":"genre","Name":"Genre","name_":"genre","name-":"genre","NAME":"GENRE","index$":0}, {"active":true,"entity":"genre","key$":"BasicGenreFlow","kind":"basic","name":"BasicGenreFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"genre_ref01","srcdatavar":"genre_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-genre_ref01"}}],"index$":0}]}, 'Genre')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let genre_ref01_data = Object.values(setup.data.existing.genre)[0] as any

    // LOAD
    const genre_ref01_ent = client.Genre()
    const genre_ref01_match_dt0: any = {}
    genre_ref01_match_dt0.id = genre_ref01_data.id
    const genre_ref01_data_dt0 = (await genre_ref01_ent.load(genre_ref01_match_dt0)).data()
    assert(genre_ref01_data_dt0.id === genre_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/genre/GenreTestData.json')

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
    ['genre01','genre02','genre03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GENRENATOR_TEST_GENRE_ENTID': idmap,
    'GENRENATOR_TEST_LIVE': 'FALSE',
    'GENRENATOR_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GENRENATOR_TEST_GENRE_ENTID']

  const live = 'TRUE' === env.GENRENATOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GENRENATOR_TEST_GENRE_ENTID']
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
  
