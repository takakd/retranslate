import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import { Alert } from 'react-bootstrap'

import { Translator, TranslatorOutput } from '../api/translator'
import { GitHubCorner } from '../components/github-corner'
import { LangSelect } from '../components/lang-select'
import { Service, TextBox } from '../components/text-box'
import { LangType } from '../grpc/translator_pb'

export default ({ apiUrl }) => {
  // Alert message
  const [alert, setAlert] = useState<string>('')

  // Text to be entered by the user.
  const [text, setText] = useState<string>('')
  // Source language type of text.
  const [srcLang, setSrcLang] = useState<LangType>(LangType.UNKOWN)
  // Target language type used in the translation.
  const [targetLang, setTargetLang] = useState<LangType>(LangType.UNKOWN)

  // Translated text by AWS.
  const [awsText, setAwsText] = useState<string>('')
  // Translated text by Google.
  const [googleText, setGoogleText] = useState<string>('')

  // The text translated by AWS and translated by AWS again.
  const [awsTextFromAws, setAwsTextFromAws] = useState<string>('')
  // The text translated by Google and translated by AWS again.
  const [googleTextFromAws, setGoogleTextFromAws] = useState<string>('')

  // The text translated by AWS and translated by Google again.
  const [awsTextFromGoogle, setAwsTextFromGoogle] = useState<string>('')
  // The text translated by Googleand translated by Google again.
  const [googleTextFromGoogle, setGoogleTextFromGoogle] = useState<string>('')

  // Each loading icon next to textarea.
  const [awsLoading, setAwsLoading] = useState<boolean>(false)
  const [googleLoading, setGoogleLoading] = useState<boolean>(false)
  const [awsFromAwsLoading, setAwsFromAwsLoading] = useState<boolean>(false)
  const [googleFromAwsLoading, setGoogleFromAwsLoading] = useState<boolean>(
    false
  )
  const [awsFromGoogleLoading, setAwsFromGoogleLoading] = useState<boolean>(
    false
  )
  const [
    googleFromGoogleLoading,
    setGoogleFromGoogleLoading,
  ] = useState<boolean>(false)

  // Interval in millisecond when firing the textbox event.
  const interval = 2000

  // Timeout in second of the gRPC web request.
  const grpcTimeout = 5

  const langOptions = [
    { label: 'English', value: LangType.EN },
    { label: 'Japanese', value: LangType.JP },
  ]

  // Translate text azs it is entered.
  useEffect(() => {
    // Call translation API only once during interval.
    const timer = setTimeout(async () => {
      // Validate
      if (
        !text ||
        srcLang === LangType.UNKOWN ||
        targetLang === LangType.UNKOWN
      ) {
        return
      }

      // Initialize UI.
      setAlert('')
      setAwsLoading(true)
      setGoogleLoading(true)
      setAwsFromAwsLoading(true)
      setGoogleFromAwsLoading(true)
      setAwsFromGoogleLoading(true)
      setGoogleFromGoogleLoading(true)

      const showError = (error) => {
        setAlert(`failed: ${error.message}`)
        // Hide all loadings.
        setAwsLoading(false)
        setGoogleLoading(false)
        setAwsFromAwsLoading(false)
        setGoogleFromAwsLoading(false)
        setAwsFromGoogleLoading(false)
        setGoogleFromGoogleLoading(false)
      }

      const translator = new Translator(grpcTimeout, apiUrl)

      // Translate text.
      const output = await translator
        .translateText(srcLang, targetLang, text)
        .catch((error) => error)
      if (output instanceof Error) {
        showError(output)
        return
      }

      // Set text to textarea.
      setAwsText(output.aws)
      setGoogleText(output.google)
      // Hide loading.
      setAwsLoading(false)
      setGoogleLoading(false)

      // Translate text again. AWS -> AWS, Google.
      translator.translateText(targetLang, srcLang, output.aws).then(
        (data: TranslatorOutput) => {
          // Set text to textarea.
          setAwsTextFromAws(data.aws)
          setGoogleTextFromAws(data.google)
          // Hide loading.
          setAwsFromAwsLoading(false)
          setGoogleFromAwsLoading(false)
        },
        (error) => showError(error)
      )

      // Translate text again. Google -> AWS, Google.
      translator.translateText(targetLang, srcLang, output.google).then(
        (data: TranslatorOutput) => {
          // Set text to textarea.
          setAwsTextFromGoogle(data.aws)
          setGoogleTextFromGoogle(data.google)
          // Hide loading.
          setAwsFromGoogleLoading(false)
          setGoogleFromGoogleLoading(false)
        },
        (error) => showError(error)
      )
    }, interval)

    return () => {
      // Prevent duplicate calling event.
      clearTimeout(timer)
    }
  }, [text, srcLang, targetLang])

  // Set target language type by source language type.
  useEffect(() => {
    if (srcLang === LangType.EN) {
      setTargetLang(LangType.JP)
    } else if (srcLang === LangType.JP) {
      setTargetLang(LangType.EN)
    }
  }, [srcLang])

  // Set source language type by target language type.
  useEffect(() => {
    if (targetLang === LangType.EN) {
      setSrcLang(LangType.JP)
    } else if (targetLang === LangType.JP) {
      setSrcLang(LangType.EN)
    }
  }, [targetLang])

  const onSrcLangChange = (v: LangType) => {
    setSrcLang(v)
  }

  const onTargetLangChange = (v: LangType) => {
    setTargetLang(v)
  }

  return (
    <div className="position-relative root">
      <Head>
        <title>Retranslate</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      </Head>

      <header className="navbar navbar-dark bg-info fixed-top header py-0">
        <span className="navbar-brand">Retranslate</span>
        <GitHubCorner
          width="60px"
          color="#17a2b8"
          url="https://github.com/takakd/retrans-app"
        />
      </header>

      <main className="main-container">
        <div className="container-fluid main-container-inner">
          {
            // Show alert if errors exists.
            alert && (
              <Alert
                className="mt-4 error-alert"
                variant="danger"
                onClose={() => setAlert('')}
                dismissible
              >
                <span>{alert}</span>
              </Alert>
            )
          }
          <div className="row mt-4">
            <div className="col-12 d-flex align-items-center">
              <LangSelect
                langOptions={langOptions}
                onLangChange={(event) => onSrcLangChange(event.lang)}
                lang={srcLang}
              />
              <span className="px-3">to</span>
              <LangSelect
                langOptions={langOptions}
                onLangChange={(event) => onTargetLangChange(event.lang)}
                lang={targetLang}
              />
            </div>
          </div>
          <div className="row px-3">
            <div className="col text-col">
              <TextBox
                className="text-input"
                classNamePrefix="text-input"
                text={text}
                onInput={(event) => setText(event.text)}
                onClearText={() => setText('')}
                placeHolder="Type to translate"
              />
            </div>
            <div className="col text-col">
              <TextBox
                classNamePrefix="text-trans"
                text={awsText}
                service={Service.AWS}
                showArrow={true}
                loading={awsLoading}
              />
              <TextBox
                className="text-trans-second"
                classNamePrefix="text-trans"
                text={googleText}
                service={Service.Google}
                showArrow={true}
                loading={googleLoading}
              />
            </div>
            <div className="col text-col">
              <TextBox
                classNamePrefix="text-retrans"
                text={awsTextFromAws}
                service={Service.AWS}
                showArrow={true}
                loading={awsFromAwsLoading}
              />
              <TextBox
                className="mt-3"
                classNamePrefix="text-retrans"
                text={googleTextFromAws}
                service={Service.Google}
                showArrow={true}
                loading={googleFromAwsLoading}
              />
              <TextBox
                className="mt-3"
                classNamePrefix="text-retrans"
                text={awsTextFromGoogle}
                service={Service.AWS}
                showArrow={true}
                loading={awsFromGoogleLoading}
              />
              <TextBox
                className="mt-3"
                classNamePrefix="text-retrans"
                text={googleTextFromGoogle}
                service={Service.Google}
                showArrow={true}
                loading={googleFromGoogleLoading}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="footer mt-4 mb-0 mx-0">
        <div className="container m-0">
          <p className="text-muted small">Retranslate is © takakd</p>
        </div>
      </footer>

      <style jsx>{`
        .root {
          min-height: 100vh;
        }

        .header {
          min-height: 60px;
        }

        .main-container {
          padding-top: 56px;
          padding-bottom: 66px;
        }

        .main-container-inner {
          padding-left: 30px;
          padding-right: 30px;
        }

        .target-lang {
          margin-left: 20px;
        }

        .text-col {
          padding: 0;
        }

        .footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 40px;
          line-height: 40px;
          background-color: #f5f5f5;
        }
      `}</style>

      <style jsx global>{`
        .text-input-header {
          height: 30px;
        }
        .text-input-text-container {
          height: 650px;
          resize: none;
        }

        .text-trans-second {
          margin-top: 18px;
        }
        .text-trans-text-container {
          height: 316px;
          resize: none;
        }

        .text-retrans-text-container {
          height: 150px;
          resize: none;
        }
      `}</style>
    </div>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      apiUrl: process.env.GRPC_ADDR,
    },
  }
}
