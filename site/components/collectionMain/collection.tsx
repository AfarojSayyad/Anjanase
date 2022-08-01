// import '@assets/main.css'
// import '@assets/chrome-bug.css'
// import '../public/assets/css/theme.css'
// import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
// import { Layout } from '@components/common'
// import CollectionLayout from '@components/common/collectionLayout '

const Noop: FC = ({ children }) => <>{children}</>

export default function Collection({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          {/* <Component {...pageProps} /> */}
        </Layout>
        {/* <CollectionLayout pageProps={...pageProps}></CollectionLayout> */}
      </ManagedUIContext>
    </>
  )
}
