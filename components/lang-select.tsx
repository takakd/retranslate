import React, { useEffect, useState } from 'react'

import { Dropdown, DropdownButton } from 'react-bootstrap'

import { LangType } from '../grpc/translator_pb'

/**
 * LangSelectChangeEvent is the event object of LangSelectProps.onLangChange event.
 */
export interface LangSelectChangeEvent {
  /**
   * Selected language type
   */
  lang: LangType
}

/**
 * LangSelect component props
 */
export interface LangSelectProps {
  /**
   * Language type
   */
  lang?: LangType

  /**
   * LangType change event handler.
   * @param {LangSelectChangeEvent} event event object.
   */
  onLangChange?: (event: LangSelectChangeEvent) => void

  /**
   * Language options
   */
  langOptions: {
    label: string
    value: LangType
  }[]
}

/**
 * LangSelect component
 *
 * @param {LangSelectProps} props
 */
export const LangSelect = (props: LangSelectProps) => {
  const [langLabel, setLangLabel] = useState<string>('')

  useEffect(() => {
    // Set option label by props.lang.
    setLangLabel(toLangLabel(props.lang))
  })

  /**
   * Creates the language label by LangType.
   * @param {LangType} lang language type.
   * @returns {string} language label.
   */
  const toLangLabel = (lang: LangType): string => {
    for (const option of props.langOptions) {
      if (lang === option.value) {
        return option.label
      }
    }
    return 'Language'
  }

  /**
   * Fired on clicking the language option.
   * @param {LangType} lang Selected language.
   */
  const onClick = (lang: LangType) => {
    if (!props.onLangChange) {
      return
    }
    props?.onLangChange({
      lang,
    })
  }

  return (
    <DropdownButton
      key={props.lang}
      title={langLabel}
      variant="secondary"
      renderMenuOnMount={true}
    >
      {props.langOptions.map((option) => {
        return (
          <Dropdown.Item
            as="button"
            key={option.value}
            onClick={() => onClick(option.value)}
          >
            {option.label}
          </Dropdown.Item>
        )
      })}
    </DropdownButton>
  )
}
