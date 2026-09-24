
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GenrenatorSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = GenrenatorSDK.test()
    equal(testsdk instanceof GenrenatorSDK, true,
      'GenrenatorSDK.test() must return a client synchronously')
  })

})
