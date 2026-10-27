
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { VidsmallerSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = VidsmallerSDK.test()
    equal(testsdk instanceof VidsmallerSDK, true,
      'VidsmallerSDK.test() must return a client synchronously')
  })

})
