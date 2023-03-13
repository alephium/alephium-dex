import { web3 } from '@alephium/web3'
import { FullMathTest } from '../../artifacts/ts'
import { buildProject, randomBigInt } from '../fixtures/DexFixture'
import { expectAssertionError, randomContractAddress } from '@alephium/web3-test'
import { OracleErrorCodes } from '../fixtures/ExampleOracleFixture'

describe('test math', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973')

  beforeEach(async () => {
    await buildProject()
  })

  const UpperBound = 1n << 256n
  const U256Max = UpperBound - 1n

  test('fullMul', async () => {
    for (let i = 0; i < 10; i++) {
      const x = randomBigInt(0n, U256Max)
      const y = randomBigInt(0n, U256Max)
      const result = x * y
      const [l, h] = [result % UpperBound, result / UpperBound]

      const testResult = await FullMathTest.testFullMulMethod({ testArgs: { x, y } })
      expect(testResult.returns).toEqual([l, h])
    }
  }, 10000)

  test('sub', async () => {
    const cases: [bigint, bigint, bigint][] = [
      [ 1n, 0n, 1n ],
      [ 1n, 1n, 0n ],
      [ 0n, 1n, U256Max ],
      [ U256Max, 0n, U256Max ],
      [ 0n, 2n, U256Max - 1n ],
    ]

    for (const c of cases) {
      const testResult = await FullMathTest.testSubMethod({ testArgs: { a: c[0], b: c[1] } })
      expect(testResult.returns).toEqual(c[2])
    }

    for (let i = 0; i < 10; i++) {
      const a = randomBigInt(0n, U256Max)
      const b = randomBigInt(0n, U256Max)
      const result = a >= b ? a - b : (U256Max - (b - a) + 1n)
      const testResult = await FullMathTest.testSubMethod({ testArgs: { a, b } })
      expect(testResult.returns).toEqual(result)
    }
  }, 10000)

  test('mulDiv', async () => {
    const Q128 = 1n << 128n
    const address = randomContractAddress()

    async function test(a: bigint, b: bigint, denominator: bigint) {
      return FullMathTest.testMulDivMethod({
        address: address,
        testArgs: { a, b, denominator }
      })
    }

    expectAssertionError(test(Q128, 5n, 0n), address, OracleErrorCodes.DivByZero)
    expectAssertionError(test(Q128, Q128, 0n), address, OracleErrorCodes.DivByZero)
    expectAssertionError(test(Q128, Q128, 1n), address, OracleErrorCodes.FullDivOverflow)
    expectAssertionError(test(U256Max, U256Max, U256Max - 1n), address, OracleErrorCodes.FullDivOverflow)

    const cases: [bigint, bigint, bigint, bigint][] = [
      [ U256Max, U256Max, U256Max, U256Max ],
      [ Q128, (50n * Q128) / 100n, (150n * Q128) / 100n, Q128 / 3n ],
      [ Q128, 35n * Q128, 8n * Q128, (4375n * Q128) / 1000n ],
      [ Q128, 1000n * Q128, 3000n * Q128, Q128 / 3n ]
    ]

    for (const c of cases) {
      const testResult = await test(c[0], c[1], c[2])
      expect(testResult.returns).toEqual(c[3])
    }
  }, 10000)

  test('mul', async () => {
    const address = randomContractAddress()
    const Q112 = 1n << 112n

    async function test(x: bigint, y: bigint) {
      return FullMathTest.testMulMethod({
        address: address,
        testArgs: { x, y }
      })
    }

    const cases: [bigint, bigint, bigint][] = [
      [ 0n, 1n, 0n ],
      [ 1n, 0n, 0n ],
      [ 3n * Q112, 2n, 6n * Q112 ],
      [ Q112, Q112, 2n ** 224n ],
      [ 2n ** 32n, (2n ** 224n) - 1n, 115792089237316195423570985008687907853269984665640564039457584007908834672640n ],
      [ 1n, (2n ** 256n) - 1n, U256Max ]
    ]
    for (const c of cases) {
      const testResult = await test(c[0], c[1])
      expect(testResult.returns).toEqual(c[2])
    }

    expectAssertionError(test(Q112, 2n ** 224n), address, OracleErrorCodes.MulOverflow)
    expectAssertionError(test((2n ** 32n) + 1n, (2n ** 224n) - 1n), address, OracleErrorCodes.MulOverflow)
    expectAssertionError(test(2n, U256Max), address, OracleErrorCodes.MulOverflow)
  }, 10000)

  test('fraction', async () => {
    const address = randomContractAddress()
    const Q112 = 1n << 112n

    async function test(numerator: bigint, denominator: bigint) {
      return FullMathTest.testFractionMethod({
        address: address,
        testArgs: { numerator, denominator }
      })
    }

    const cases: [bigint, bigint, bigint][] = [
      [ 4n, 100n, (4n * Q112) / 100n ],
      [ 100n, 4n, (100n * Q112) / 4n ],
      [ Q112 * 2359n, 6950n, (Q112 * Q112 * 2359n) / 6950n ],
      [ 2359n, Q112 * 2359n, 1n ],
      [ 2359n * Q112 * (2n ** 32n), Q112 * 50n, (2359n * Q112 * (2n ** 32n)) / 50n ],
      [ 2359n * Q112, Q112 * 50n, (2359n * Q112) / 50n ],
      [ 0n, Q112 * Q112 * 2360n, 0n ],
    ]
    for (const c of cases) {
      const testResult = await test(c[0], c[1])
      expect(testResult.returns).toEqual(c[2])
    }

    expectAssertionError(test(1n, 0n), address, OracleErrorCodes.DivByZero)
    expectAssertionError(test(Q112 * 2359n, 50n), address, OracleErrorCodes.FractionOverflow)

    // the tests are different with eth, eth only test the gas cost of the function
    const gasCostCases: [bigint, bigint, number][] = [
      [0n, 569n, 1095],
      [239n, 569n, 1178],
      [Q112 * 2359n, Q112 * 2360n, 1178],
      [Q112 * 2359n * (2n ** 32n), Q112 * 2360n, 4610]
    ]
    for (const c of gasCostCases) {
      const testResult = await test(c[0], c[1])
      expect(testResult.gasUsed).toEqual(c[2])
    }
  }, 10000)
})
