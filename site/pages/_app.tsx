import '@assets/main.css'
import '@assets/chrome-bug.css'
import '../public/assets/css/theme.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
// import CollectionLayout from '@components/common/collectionLayout '
// import 'swiper/components/effect-fade/effect-fade.scss'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const CollectionLayout = (Component as any).CollectionLayout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
        {/* <CollectionLayout pageProps={pageProps}>
          <Component {...pageProps} />
        </CollectionLayout> */}
      </ManagedUIContext>
    </>
  )
}
