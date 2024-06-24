import { web3 } from '@alephium/web3'
import { randomBigInt } from './fixtures/DexFixture'
import BigNumber from 'bignumber.js'
import { MathTest } from '../../artifacts/ts'

describe('test math', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973')

  test('uqdiv', async () => {
    const u112Max = (1n << 112n) - 1n

    for (let i = 0; i < 10; i++) {
      const a = randomBigInt(1n, u112Max)
      const b = randomBigInt(1n, u112Max)
      const result = (a * (1n << 112n)) / b

      const testResult = await MathTest.tests.uqdiv({ testArgs: { a, b } })
      expect(testResult.returns).toEqual(result)
    }
  }, 10000)

  test('sqrt', async () => {
    const u256Max = (1n << 256n) - 1n

    for (let i = 0; i < 10; i++) {
      const y = randomBigInt(1n, u256Max)
      const testResult0 = await MathTest.tests.sqrt({ testArgs: { y: y } })
      const result = BigNumber(y.toString()).sqrt().toFixed(0, BigNumber.ROUND_DOWN)
      expect(testResult0.returns).toEqual(BigInt(result))
    }
  }, 10000)
})
