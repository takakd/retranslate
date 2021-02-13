import { LangType, TranslateRequest } from '../grpc/translator_pb'
import { TranslatorClient } from '../grpc/TranslatorServiceClientPb'

/**
 * The value returned by translateText.
 */
export interface TranslatorOutput {
  /**
   * translated text by AWS
   */
  aws: string

  /**
   * translated text by Google
   */
  google: string
}

/**
 * Translator API Wrapper
 */
export class Translator {
  /**
   * Request timeout
   */
  timeout: number

  /**
   * gRPC web API URL
   */
  apiUrl: string

  /**
   * @param {number} timeout request timeout in second.
   * @param {string} apiUrl gRPC web URL.
   */
  constructor(timeout: number, apiUrl: string) {
    this.timeout = timeout
    this.apiUrl = apiUrl
  }

  /**
   * Returns the deadline time of gRPC web request.
   * @param {Date} cur base datetime.
   * @returns {string} deadline value of gRPC request.
   */
  grpcDeadline(cur: Date): string {
    cur.setSeconds(cur.getSeconds() + this.timeout)
    return cur.getTime().toString()
  }

  /**
   * Translate text with calling API.
   *
   * @param {LangType} srcLang source language type.
   * @param {LangType} targetLang target language type.
   * @param {string} text text to be translated.
   * @returns {Promise<TranslatorOutput>}
   */
  async translateText(
    srcLang: LangType,
    targetLang: LangType,
    text: string
  ): Promise<TranslatorOutput> {
    const req = new TranslateRequest()
      .setSrclang(srcLang)
      .setTargetlang(targetLang)
      .setText(text)

    // Call
    const translatorService = new TranslatorClient(this.apiUrl)
    const resp = await translatorService.translate(req, {
      deadline: this.grpcDeadline(new Date()),
    })

    const translatedList = resp.getTranslatedtextlistMap()

    const output: TranslatorOutput = {
      aws: '',
      google: '',
    }

    let v
    v = translatedList.get('aws')
    if (typeof v === 'undefined') {
      throw new Error(`error: undefined aws`)
    }
    output.aws = v.getText()

    v = translatedList.get('google')
    if (typeof v === 'undefined') {
      throw new Error(`error: undefined google`)
    }
    output.google = v.getText()

    return output
  }
}
