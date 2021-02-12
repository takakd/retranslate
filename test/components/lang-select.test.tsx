import React from 'react'

import { LangSelect, LangSelectProps } from '../../components/lang-select'
import { LangType } from '../../grpc/translator_pb'
import { fireEvent, render } from '../testUtils'

describe('LangSelect', () => {
  const langOptions = [
    {
      label: 'Japanese',
      value: LangType.JP,
    },
    {
      label: 'English',
      value: LangType.EN,
    },
  ]

  it('matches snapshot', () => {
    const props: LangSelectProps = {
      lang: LangType.JP,
      langOptions,
    }

    const { asFragment } = render(<LangSelect {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('language label', () => {
    const props: LangSelectProps = {
      lang: LangType.EN,
      langOptions,
    }

    const { container } = render(<LangSelect {...props} />)

    const labelButton = container.getElementsByClassName('dropdown-toggle')
    expect(labelButton[0].textContent).toBe('English')

    const buttons = container.getElementsByClassName('dropdown-item')
    props.langOptions.forEach((prop, i) => {
      expect(buttons[i].textContent).toBe(prop.label)
    })
  })

  it('on click', () => {
    const props: LangSelectProps = {
      lang: LangType.EN,
      langOptions,
      onLangChange: jest.fn(),
    }

    const { container } = render(<LangSelect {...props} />)

    const buttons = container.getElementsByClassName('dropdown-item')

    // Click Japanese
    fireEvent.click(buttons[0])
    expect(props.onLangChange).toBeCalledTimes(1)
    expect(props.onLangChange).toBeCalledWith({ lang: LangType.JP })
  })
})
