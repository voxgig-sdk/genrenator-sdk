
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GenrenatorSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await GenrenatorSDK.test()
    equal(null !== testsdk, true)
  })

})
