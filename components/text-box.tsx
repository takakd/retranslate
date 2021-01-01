import React, { FormEvent, useRef } from 'react'

import { CloseButton, Spinner } from 'react-bootstrap'
import { ArrowRight, Clipboard } from 'react-bootstrap-icons'

import { ServiceImage } from '../components/service-image'

/**
 * Translation service name
 */
export enum Service {
  AWS = 'aws',
  Google = 'google',
}

/**
 * TextBoxInputEvent represents an event object of TextBoxProps.onInput event.
 */
export interface TextBoxInputEvent {
  /**
   * Text in textarea
   */
  text: string
}

/**
 * Props of TextBox component
 */
export interface TextBoxProps {
  /**
   * Initial text in textarea
   */
  text: string
  /**
   * Translation service name
   */
  service?: Service
  /**
   * Input event handler.
   * @param {TextBoxInputEvent} event event object.
   */
  onInput?: (event: TextBoxInputEvent) => void
  /**
   * Clear text event handler.
   */
  onClearText?: () => void
  /**
   * Class name
   */
  className?: string
  /**
   * Class name prefix of child elements.
   */
  classNamePrefix?: string
  /**
   * Placeholder text in textarea.
   */
  placeHolder?: string

  /**
   * Show arrow on the left of textarea.
   */
  showArrow?: boolean
  /**
   * Show loading icon on the left of textarea.
   */
  loading?: boolean
}

/**
 * TextBox component.
 *
 * @param {TextBoxProps} props
 */
export const TextBox = (props: TextBoxProps) => {
  const textareaRef = useRef(null)
  const className = props?.className ? props.className : 'text-box'
  const classNamePrefix = props?.classNamePrefix
    ? props.classNamePrefix
    : 'text-box'

  /**
   * Fired on inputting texts in textarea.
   * @param {React.FormEvent} event
   */
  const onInput = (event: FormEvent) => {
    if (!props.onInput) {
      return
    }

    const target = event.target as HTMLTextAreaElement
    props.onInput({
      text: target.value,
    })
  }

  /**
   * Fired on clicking the clipboard button.
   */
  const onClickClipboard = () => {
    // Copy text in textarea to the OS clipboard.
    textareaRef.current.select()
    document.execCommand('copy')
  }

  return (
    <div className={`d-flex flex-row align-items-center w-100 ${className}`}>
      {
        // Show arrow icon.
        props.showArrow && !props.loading && (
          <div className="icon">
            <ArrowRight size={20} />
          </div>
        )
      }
      {
        // Show loading icon when loading.
        props.loading && (
          <div className="icon">
            <Spinner animation="border" size="sm" />
          </div>
        )
      }
      <div className={`d-flex flex-column ${classNamePrefix}-text-container`}>
        {
          <div className={`${className}-header`}>
            {
              // Show service icon
              props.service && <ServiceImage service={props.service} />
            }
          </div>
        }
        <div
          className={`position-relative w-100 ${classNamePrefix}-textarea-container`}
        >
          <textarea
            ref={textareaRef}
            className={`h-100 ${classNamePrefix}-textarea`}
            placeholder={props?.placeHolder}
            defaultValue={props.text}
            onInput={(event) => onInput(event)}
          />
          {
            // Show erase button when text is entered and the event handler exists.
            props.text !== '' && props?.onClearText && (
              <CloseButton
                className={`position-absolute close-button p-1 ${classNamePrefix}-close-button`}
                onClick={props?.onClearText}
              />
            )
          }
          {
            // Show clipboard button when text is entered.
            props.text !== '' && (
              <Clipboard
                className={`position-absolute ${classNamePrefix}-clipboard-button`}
                onClick={onClickClipboard}
              />
            )
          }
        </div>
      </div>

      <style jsx>{`
        .${className}-header {
          min-height: 30px;
        }

        .${classNamePrefix}-textarea {
          width: 100%;
          resize: none;
          padding: 0.5rem 0.5rem 36px 0.5rem;
        }
        .${classNamePrefix}-text-container,
          .${classNamePrefix}-textarea-container {
          flex: 1;
        }
        .icon {
          min-width: 30px;
          text-align: center;
        }
        ::placeholder {
          color: #aaa;
          opacity: 1;
        }
      `}</style>
      <style jsx global>{`
        .${classNamePrefix}-close-button {
          top: 1px;
          right: 6px;
        }
        .${classNamePrefix}-clipboard-button {
          cursor: pointer;
          bottom: 10px;
          right: 10px;
        }
      `}</style>
    </div>
  )
}
