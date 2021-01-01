import React from 'react'

import { Service, TextBox, TextBoxProps } from '../../components/text-box'
import { fireEvent, render } from '../testUtils'

describe('TextBox', () => {
  it('matches snapshot', () => {
    const props: TextBoxProps = {
      text: 'test',
      service: Service.Google,
      placeHolder: 'placeholder',
      showArrow: true,
      loading: true,
    }

    const { asFragment } = render(<TextBox {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('on input', () => {
    const props: TextBoxProps = {
      text: 'test',
      service: Service.Google,
      onInput: jest.fn(),
    }

    const { container } = render(<TextBox {...props} />)

    fireEvent.input(container.getElementsByTagName('textarea')[0])

    expect(props.onInput).toBeCalledTimes(1)
    expect(props.onInput).toBeCalledWith({ text: props.text })
  })

  it('on close', async () => {
    const props: TextBoxProps = {
      text: 'test',
      service: Service.Google,
      onClearText: jest.fn(),
    }

    const { container } = render(<TextBox {...props} />)

    fireEvent.click(container.getElementsByClassName('close-button')[0])

    expect(props.onClearText).toBeCalledTimes(1)
  })

  it('on clipboard', async () => {
    const props: TextBoxProps = {
      text: 'test',
      service: Service.Google,
      classNamePrefix: 'test',
    }

    const { container } = render(<TextBox {...props} />)

    document.execCommand = jest.fn()

    fireEvent.click(
      container.getElementsByClassName('test-clipboard-button')[0]
    )

    expect(document.execCommand).toBeCalledWith('copy')
    expect(document.execCommand).toBeCalledTimes(1)
  })
})
