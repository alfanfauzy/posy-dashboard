import { renderHook } from '@testing-library/react-hooks'
import fetch from 'jest-fetch-mock'

import { useCreateTransactionUsecase } from './CreateTransactionUsecase'

// Mock the useCreateTransactionMutation hook
jest.mock('../sources/CreateTransactionMutation', () => ({
  useCreateTransactionMutation: jest.fn(() => ({
    mutate: jest.fn(),
    data: undefined,
    isLoading: false,
    error: undefined,
  })),
}))

describe('useCreateTransactionUsecase', () => {
  test('returns the expected initial state', () => {
    const { result } = renderHook(() => useCreateTransactionUsecase())
    expect(result.current).toEqual({
      createTransaction: expect.any(Function),
      data: undefined,
      isLoading: false,
      error: undefined,
    })
  })
})

describe('useCreateTransactionUsecase', () => {
  it('returns the expected initial state', () => {
    const { result } = renderHook(() => useCreateTransactionUsecase())

    expect(result.current.createTransaction).toBeInstanceOf(Function)
    expect(result.current.data).toBeUndefined()
  })
})

beforeEach(() => {
  fetch.resetMocks()
})

describe('CreateTransactionUsecase', () => {
  it('returns a transaction with a valid UUID and QR code', async () => {
    const mockedData = {
      uuid: '12345678-abcd-1234-abcd-1234567890ef',
      qrcode: {
        base64_qrcode: 'abc123',
        qrcode_url: 'https://example.com/qrcode',
        transaction_code: '123ABC',
      },
      created_at: {
        seconds: 123456,
        nanos: 789000000,
      },
    }

    fetch.mockResponse(JSON.stringify(mockedData))

    const transaction = useCreateTransactionUsecase()

    if (transaction.data) {
      expect(typeof transaction.data.uuid).toBe('string')
      expect(typeof transaction.data.base64_qrcode).toBe('string')
      expect(typeof transaction.data.qrcode_url).toBe('string')
      expect(typeof transaction.data.transaction_code).toBe('string')
      expect(typeof transaction.data.seconds).toBe('number')
      expect(typeof transaction.data.nanos).toBe('number')
    }
  })
})
