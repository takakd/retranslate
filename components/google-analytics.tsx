/**
 * Google Analytics snippet code
 */
export const GoogleAnalytics = () => {
  return (
    <template>
      {/*Global site tag (gtag.js) - Google Analytics*/}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-CPT8TKNZH7"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CPT8TKNZH7');`,
        }}
      />
    </template>
  )
}
