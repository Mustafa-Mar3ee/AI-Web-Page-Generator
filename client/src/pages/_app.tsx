import { DefaultSEOProviderWrapper, LanguageProviderWrapper, SnackbarProviderWrapper, ThemeProviderWrapper } from '@/app/components/providers'
import '@/styles/globals.css'
import createEmotionCache from "@/utils/createEmotionCache"
import { ApolloProvider } from '@apollo/client'
import { EmotionCache } from '@emotion/react'
import { NextPage } from "next"
import useTranslation from 'next-translate/useTranslation'
import type { AppProps } from 'next/app'
import client from '../../apollo.client'


interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
  Component: NextPage;
}

export default function App(props: MyAppProps) {
  const { lang } = useTranslation();

  const {
    Component,
    emotionCache = createEmotionCache(lang),
    pageProps: { session, ...pageProps },
  } = props;

  return (<DefaultSEOProviderWrapper>
    <LanguageProviderWrapper {...{ emotionCache }}>
      <ApolloProvider client={client}>
        <SnackbarProviderWrapper>
          <ThemeProviderWrapper>
            <Component {...pageProps} />
          </ThemeProviderWrapper>
        </SnackbarProviderWrapper>
      </ApolloProvider>
    </LanguageProviderWrapper>
  </DefaultSEOProviderWrapper>)
}
