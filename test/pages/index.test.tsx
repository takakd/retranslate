import 'react'
import Index from '../../pages/index'
import { act, fireEvent, render } from '../testUtils'

const mockTranslateText = jest.fn()

jest.mock('../../api/translator', () => {
  return {
    Translator: jest.fn().mockImplementation(() => {
      return {
        translateText: mockTranslateText,
      }
    }),
    TranslatorOutput: jest.fn(),
  }
})

beforeEach(() => {
  mockTranslateText.mockClear()
})

describe('Index', () => {
  it('matches snapshot', async () => {
    const { asFragment } = render(<Index apiUrl={'https://example.com'} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('select language type', () => {
    const { container } = render(<Index apiUrl={'https://example.com'} />)

    const dropdownItem = container.getElementsByClassName('dropdown-item')

    act(() => {
      // Set source language type to English.
      fireEvent.click(dropdownItem[0])
    })

    const dropdown = container.getElementsByClassName('dropdown-toggle')
    expect(dropdown[0].textContent).toBe('English')
    expect(dropdown[1].textContent).toBe('Japanese')
  })

  it('API', async () => {
    const apiOutput = [
      'translated by aws',
      'translated by google',
      'aws translated by aws',
      'aws translated by google',
      'google translated by aws',
      'google translated by google',
    ]

    mockTranslateText
      .mockResolvedValueOnce({
        // Translate input text.
        aws: apiOutput[0],
        google: apiOutput[1],
      })
      .mockResolvedValueOnce({
        // Retranslate AWS translated text.
        aws: apiOutput[2],
        google: apiOutput[3],
      })
      .mockResolvedValueOnce({
        // Retranslate Google translated text.
        aws: apiOutput[4],
        google: apiOutput[5],
      })

    const { container } = render(<Index apiUrl={'https://example.com'} />)

    const textarea = container.getElementsByTagName('textarea')

    jest.useFakeTimers()

    // Set language.
    const dropdownItem = container.getElementsByClassName('dropdown-item')
    fireEvent.click(dropdownItem[0])

    // Input text to trigger API calling.
    const inputText = 'input value'
    fireEvent.input(textarea[0], {
      target: {
        value: inputText,
      },
    })

    // Wait to complete to call API.
    await act(async () => {
      await jest.runAllTimers()
    })

    // Check
    //    input text
    expect(textarea[0].textContent).toBe(inputText)
    //    API output text
    for (let i = 1, len = textarea.length; i < len; i++) {
      expect(textarea[i].textContent).toBe(apiOutput[i - 1])
    }
  })

  it('API error', async () => {
    const output = 'api error message'
    mockTranslateText.mockRejectedValue(new Error(output))

    const { container } = render(<Index apiUrl={'https://example.com'} />)

    const textarea = container.getElementsByTagName('textarea')

    jest.useFakeTimers()

    // Set language.
    const dropdownItem = container.getElementsByClassName('dropdown-item')
    fireEvent.click(dropdownItem[0])

    // Input text to trigger API calling.
    const inputText = 'input value'
    fireEvent.input(textarea[0], {
      target: {
        value: inputText,
      },
    })

    // Wait to complete to call API.
    await act(async () => {
      await jest.runAllTimers()
    })

    // Check alert message.
    const alert = container.querySelector('.error-alert > span')
    expect(alert.textContent).toBe(`failed: ${output}`)
  })
})
