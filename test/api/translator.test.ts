import {Translator} from '../../api/translator'
import {LangType} from '../../grpc/translator_pb'

const mockTranslateRequest = {
  setSrclang: jest.fn().mockReturnThis(),
  setTargetlang: jest.fn().mockReturnThis(),
  setText: jest.fn().mockReturnThis(),
}

jest.mock('../../grpc/translator_pb', () => {
  return {
    LangType: {
      JP: 'ja',
      EN: 'en',
    },
    TranslateRequest: jest.fn().mockImplementation(() => {
      return mockTranslateRequest
    }),
  }
})

const mockGetTranslatedtextlistMap = jest.fn()

jest.mock('../../grpc/TranslatorServiceClientPb', () => {
  return {
    TranslatorClient: jest.fn().mockImplementation(() => {
      return {
        translate: jest.fn().mockResolvedValue({
          getTranslatedtextlistMap: mockGetTranslatedtextlistMap,
        }),
      }
    }),
  }
})

beforeEach(() => {
  mockTranslateRequest.setSrclang.mockClear()
  mockTranslateRequest.setTargetlang.mockClear()
  mockTranslateRequest.setText.mockClear()
  mockGetTranslatedtextlistMap.mockClear()
})

describe('Translator', () => {
  it('grpcDeadline', () => {
    const cur = new Date()
    const timeout = 10

    const want = cur
    want.setSeconds(timeout)

    const t = new Translator(timeout, '')
    expect(t.grpcDeadline(cur)).toBe(want.getTime().toString())
  })

  it('translateText', async () => {
    const srcLang = LangType.JP
    const targetLang = LangType.EN
    const text = 'text'
    const ret = {
      aws: 'aws translated',
      google: 'google translated',
    }
    const mockRet = {
      aws: {
        getText: jest.fn().mockReturnValue(ret['aws']),
      },
      google: {
        getText: jest.fn().mockReturnValue(ret['google']),
      },
    }

    mockGetTranslatedtextlistMap.mockReturnValue({
      get: jest
        .fn()
        .mockReturnValueOnce(mockRet['aws'])
        .mockReturnValueOnce(mockRet['google']),
    })

    const t = new Translator(10, 'https://example.com')

    const got = await t
      .translateText(srcLang, targetLang, text)
      .catch((error) => error)

    expect(got['aws']).toBe(ret['aws'])
    expect(got['google']).toBe(ret['google'])
    expect(mockTranslateRequest.setSrclang).toBeCalledTimes(1)
    expect(mockTranslateRequest.setSrclang).toBeCalledWith(srcLang)
    expect(mockTranslateRequest.setTargetlang).toBeCalledWith(targetLang)
    expect(mockTranslateRequest.setTargetlang).toBeCalledTimes(1)
    expect(mockTranslateRequest.setText).toBeCalledWith(text)
    expect(mockTranslateRequest.setText).toBeCalledTimes(1)
  })

  it('translateText error', async () => {
    mockGetTranslatedtextlistMap.mockReturnValue({
      get: jest.fn().mockReturnValueOnce(undefined),
    })

    const t = new Translator(10, 'https://example.com')

    const got = await t
      .translateText(LangType.JP, LangType.EN, 'text')
      .catch((error) => error)

    expect(got).toBeInstanceOf(Error)
  })
})
