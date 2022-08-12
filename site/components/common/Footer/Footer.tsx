import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Heart, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'
import Image from 'next/image'
import LinkedIn from '@components/icons/LinkedIn'
import Insta from '@components/icons/Insta'
import Twitter from '@components/icons/Twitter'
import Pinterest from '@components/icons/Pinterest'
interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accent-2 py-12 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            {/* <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border border-accent-6 mr-2">
                  <Logo />
                </span>
                <span>ACME</span>
              </a>
            </Link> */}
          </div>
          <div className="col-span-1 lg:col-span-8">
            <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </span>
              ))}
            </div>
          </div>
          {/* <h1>KEEP IN TOUCH</h1> */}
          {/* <div></div> */}

          <div className="col-span-1 lg:col-span-2 flex items-end lg:justify-end text-secondary">
            {/* <div className="text-xs">
              <h3>KEEP IN TOUCH</h3>
            </div> */}
            <div className="flex space-x-6 items-center  h-2">
              {/* <image href="data:image/png;base64,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" /> */}

              <a
                className={s.link}
                aria-label="Github Repository"
                href="https://github.com/vercel/commerce"
              >
                <Github />
              </a>

              <a
                className={s.link}
                aria-label="Linkedin"
                href="https://www.linkedin.com/company/anjanase/"
              >
                {/* linkedin */}
                {/* <Image
                  src="data:image/png;base64,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"
                  alt="Picture of the author"
                  width={30}
                  height={30}
                /> */}
                {/* <Heart /> */}
                <LinkedIn />
              </a>
              <a href="https://www.instagram.com/anjanase_official/">
                {/* insta
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8KCggAAAC1tbScnJzk5OQFBQLw8PAEBAC7u7v39/eGhoXc3Nynp6fv7+8rKynPz8/W1tbJycgfHxzo6Oh4eHdKSkkTExFjY2I/Pz6Tk5LCwsImJiQtLS2NjY0QEAtRUVFcXFtzc3JqamhGRkU3NzYZGReurq2Hh4U4ODQ7Ozm3t7ciIh1+fn1XV1UlJSBt7sZWAAANGklEQVR4nO1daYOiOhB0Wg7lELwA71t3xnXf//93D4a51EpIIGpktz7OQEyRpNPdqSSNRlk4dmdgmt2wfTz4xni83qyX0XIUpJjtX8ohnmWvj9Jy0tLGY8M/HNth1zQHHdspXc9S3Mzw6M/Xq20Q0yValmW1ShJ8eXl/+6rMONiu1nP/GJp34en57moUvHzyKU1GHJ+cX4LRyvW9W5LreP5qkf/aPZhdMc1/erHyvc4t6Dmhsdo/htoV0f3KCFV3WNv4E+hAL0dKMlgZtkJ6k+R9HOiErEJJTw3JTnOjT+v9RNqSm6aCEdmOYi35ZbAojibV6DmTUTolPJoIB+lEMqrC0XM1G30IRG7pOdJ/07Z//oRFb34pfmbyBA2YIzWrpjzB9vZZ+GWgbVuW4CF+JoIpxfggxc8+PU0P/QTRSWL+tzdPYWLOYdFGmKK9frYGzEFrQYpe9JwEU4qR0MxoSxO0rKuwXA0s2bFCkUArCnbR81zD7/7rNkqSjZtibOTwj01xHP2Pt8ZZEZskibav/f7Zbwg5jwIdNTUyQuz2sygZjv126HVumTxxOl7Y9sfDJJrthVgWm5tTEcG0R8bRyZ+EN8kkMNEJJ/4pDXMKjTyd+AUd+CVkvWVpeIP75vY+4Qw8Y1kUi1vEnfrbXE+GKEj8x5D7huMnAZcjxRwHzuT5oi3azZXnf8rACec73oikLdsNT9gE075hlPDfbwTT4PVVSljv+ZyXpq7C1JYC2O6UU1tGvOjtWO9YFIX3JSCAMGJaRdph3+YXi2Dqtg/uXH0RDNgBEP1CL0xYn4RrnB4Kpum3CKWnRoynaacrwZQia2DR6PrhCevZae/+NRdGj2VvrhuRFVHQ9KbLWZXhMSheRxnNBRyFtNO5BTP0cEe1Fs3z5xghhb5G5hsMc3MZZPTwhyD9CaYU4SRg0Xnvw/5aUSSiCXDEd+67OfAzUKTXRD8wcX0G0Epa9LObGugRmurjqjmeO3rPZeyG3WsHOYQGlYwf76/gE+4dKfAxWS/y6D7LeW2ujYML67/6jvXCADxx3soPhb//MYpa9DK+DFNtNMoo+O6DuJMaDT3QWV942C1aXYaqBQw6qJPSTpeAF6Q3f3bAd5gzRGH1mS3zYtTG87tTwYBxOY0vnpqjcRZ7nDJ+duKHAttJ69LZgqbkK9aHnZSZ67gvHEYC9yrzi3wWWn38EzndrFTHvWH2MUOLuucPoo5oLfL/eXCq0CFv2GAYyfcmGJ4/CN0yygciHIbL+5OBWDIZvgo8+dETUU/XZjL8zc7/XTyJWjt3y5DL1oo1iexxSJDX/sIN9+LrPHg+b6JUvjZRhcNJ+154JCjCyBP8aCahkyaGRqIN0bxCs2xWP75cF6J+rnDsgemFk3aGSeiZA0H1/X/C4xBZTOvliP/R2lfUNJ6jE7YNNxlNv5X98XSUuEZbYJX1D9OWvl0+OtmDgZg1FfDoaKfOZTMPw+Us5/al7P9Q38ez5fBQ4N8zV4uuMywhyLpl3rWDXPdIzRK23R3vclEFrGQu4diNQdT+hQHyN1O0FlfWvoNMzdpp2GCyUOOUdv2kYEU6/zGixO+yCnFg+J5X/RLANaXEbnTQZDEEvyUJz92JysPTttwxVbBd2IiELMUQTRedxgDEjlfRlyyc7lKk+X78ItGyi61rEzqcyOcao+li0DCRK1BxsugNF/LCMVoM8QqCe02R1uhBNCvEZsMEn6haqtue90tJGy3qz5HNcS7V5sRQPrXBhJh6Pl3ksFaYLBw/Lq1NTScQqGZpTn8USdRndLEQUeniP5f3u71hJe0t0RD9dvdX8D7nZPNL/8RaDkOBLvVQ075Q6emw+VZVuUlvTVCuM/D//JfS+29psDchdhCVduOI/lzS71YinmbLmR2HXy8UiNCxcUDDsxxBj6M4kuKYlBwlyGgeoEdejiFbjyNNkaGHKcPQR8E/9csUz1f9SVKMj2WqAPJyqWuAHIEyDA+MtF9Jin257RNshnPI8DKNJYCJ4g0aBDU/BXiFDigKnrbSZR+U70AhvhIWAgURa8gwki26rbSLftSiL+07ogBxAxluJEv2io0M2GtQ+Ip0ShMFiBuUKpYNgAuniZTOdLRxjYln2rZtehPD3YymhSSlJw3EMGK0rAycgomeKNgcepf5GLN32PAF29mnlnOugOwpZYjaUE6iwN3AkDbU7GBiN8w2DzN+Q0oKekDGI2UIRJdyDJucKrZoOuRHYuFwylWlIzdciuGoEYAQX4ahx4km0lC1WPjXuxQinJXwJjMUAcNW0AiALyfB0AHpny9+v3si48jp7dkcaSgxFAFDCzOUWFpj6/upL57PGrPnU5mcEfCxKzO0mSknOWUqQyWalbMQFy5hhjMwDsUZIpFHXsZSbi7z2Iu94rIXwLA1a8SgTGGGPaaOwJVNEzggaZjXpi/cGdAy8L6ByhRlyDIzVilh6olFUdjYQFlDJYZdLA6XM4BfYH6vBXNV4+YMGWOntGyTtQqzfBRDlJ98r1DZJXKH9ckErZY4Q8EpCH/ysmmkDIwoRbRTwMkZMhRzBnF1JEwfADbOoh8N5X6rMMTuTMWVOZA2ehHuVTAIKM/QhmEh7SsRbDSgk5Qt5QpAMcMumr5aVHUXUQ8FU1dKRAzFDKHDhpbX5YCUE6Kum2KGIDmpZCsf3HBHO5FX1TI04adWIHFAgoNrFRuEWoZgzara4vEX0JqtmDVVyxB9aQqqsnsHFKWL9A6lDJEASTJvJFVRIZmWUoYhkuFM1WxCMYGtyXWUBVDKsA12oUgcRcUF2tB6tcECQSlDqKous+aHgKyYSMCjkiES1Knb146mRJG8iEqGyCnlnZoiByg9F3BNVTIcoMUA2UU5NtASy6hYXK+SITR36vacwjFQ3ENUMoSbG9TJ36HKsDgKVskwRNIVdfJ3cEiHJeARqmSIzgmpoPe7BNTgFX9AlQyh3k/dtloUuAiIXm/OUN3eb/sfQ4x/DCszrNU4rL8trf98WH+fpv5+af1ji/rHh/WP8eufp/kLcm31z5fWP+dd/3WLu689iVixf+uHcgzrvwb8F6zj11+LUX89Tf01UU+ta6u/NrH++tJ/GuFP1F/n/Rxa/frvt6j/nhnt9z3FVfc9ab93TSK9BRwiBsOa7T+suoeUs5FbwR5SKQcJM6z/PuA67eVGp18u/9L9+M96pgJmiM7FkD02Ue9zMdScbbIvrK80aH/Ds03qdT5N3c8Ywqco1eucKHTW1+8Spet71lf9z2ur/5l7T3RuYhEY5yY+x9mXQmCcffkU55cK/jai0nuKM2gFwTiDVv9zhIXBOEdY/7OghcE4C1r787zFwTjPW/cz2SXAOJNd83P1ZcA4V1/zuxEkwLob4eb3W/jc+y18dQJ/1v0Wmt9RIgHmHSV63zMjAeY9M1rfFSQBeFfQ+w2AWt/3JAH2fU9a39klAfadXXrfuyYO9r1ret+dJw7O3Xla338oDN79h1rfYSkM3h2WDZ3vIRUG9x5Sre+SFQT/Llm97wMWA/8+YM3vdBZBwZ3Omt/LLYIiBrrfrV6IwrvVkeNWQUR5f0DZ5tn15LiRp89iTvHd3WfDDF9o+iwRBooqrkYZXjUqJRO9P7Cg58Jn6cGHrGrJ7zuhDTugdbG3BW3bzL6DyM7NB4Ox9ny1obWJJdtyKtFHgKFMtRaXi3Q2HK2ZQdU72vegGc2s5NVsjs7yyCnq3IpwK997tUE+FMgwPzqqvmOxzRJH0Ag8PWGto+hrbpgCFwvrjX4xxeR00nHqH7B1EfQLvsHWw1gU6efAhRFz8Y6px2Hr7lN74+oVadguy8a88JJMHMUPERn6hMSmwVuZ5OSYUIL/Cy3azUMdcoxOOJ9x1e+8U2T46juiIKmiBlECx0/48vAC03/gL71na39Lwxs8hqYz8IxlkX7aKlLecrcW5CVQHJ38idrVzUJ0wol/iuJi8UNhxMcIMs6QrVHvZ1EyHPvt0OvcskGdjhe2/fEwiWb7bJ28sG4CZ+TY8EwDyPIb/f7rNkqSzcl13bGRwz82xXH0P94apyW4mySJtq/9/tlvFLPLCOJb1y8oMqIMNiwL7DVQAUtWPAYiCgRPmqIuoEgw1BPsqNpBqIt+UNyUEhc+FpbUQVxK5Mz3hbR4+qBwb8E9QLH0Bo02z0fVDrQtEaWbydP0VKKkXNzjvz2FwbHorbTowHOfoBmJqqhvnclI0F16EFLncTSp6BhPUode175qpWGOAp1op7kRFWzfF6k3vGkqEjP3kqK48+7IKpT0FGbHOsafQJ+WTFsvWBmqQ3AnNFZ7HUim9PYr4zY5sY7nrxYfkdtjqGVYrHzvphkUz3dXo+Bjf33rHkw/lP30EoxWrn+XxT7HDI/+fL3aBjFdomVZ0pH5DzIpWldlxsF2tZ77x9C8b47PsTsD0+yG7ePBN+bz9WYTRctRkGK2L0lwP8teHy2jaLNZz+eGfzi2w65pDjoVlP3/A5mXAvVmaf+VAAAAAElFTkSuQmCC"
                  alt="Picture of the author"
                  width={25}
                  height={25}
                /> */}
                <Insta />
              </a>
              <a className="" href="https://twitter.com/anjanase05">
                {/* twitter
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPkAAADLCAMAAACbI8UEAAAAjVBMVEUAAAD////8/PykpKTx8fG/v7/s7Ozb29v39/e0tLSsrKypqan4+Pjl5eXh4eHo6OjV1dXJyclhYWGenp7Pz890dHSZmZmTk5O8vLyFhYVWVlZnZ2cUFBSBgYFBQUEyMjIbGxs6OjpLS0srKyt5eXkjIyM9PT0NDQ1ZWVlPT08aGhpsbGwuLi4mJiYSEhJUeCjpAAAKUElEQVR4nN2daWOiMBCG5fBA64EXUuvZWmuP/f8/b7FqJZA7kyH4ftpVRJ8CyVyZNLwaqDNsx80omCeTXtScDlo+xEkbECexqUHva39okPrev0VD0xM7TR5GswZTh3TaMTm5w+TNZzb2RZ/Lqf7pXSVvpSLsi16CltqJO5PrP9wkb3Pu8pLSUP7E/rzhMnl/rMB91kqWvZsdfJsYHCRPFLnP6smcuLnLjlze/ucceazBnenUF5zXX6x/D/wbE8vkIGaCtiQHNoomvNN2Jleb4PvvpRL506vRLGmmwac2eKOxZo7yuQGz+fdiiTxonCxhiRUZcGc6tqlnjff3Qzb3l4vkneztZ3tsXL2ZgWcKiqfsxEvigPj+VpF8cn4/tYxI15cxeKOREGeczgpPzzr3ZoHcvxwhNUkAS3USp2t1O90gWpbfzT8OBfLe9ZCmh60PEPDLVW81lxvae8S9XCD/GwwWiNBnwVzxs8azLeOdw1P+G0ny4f2wASo4xDMuFHkjk+R5O4I+RdiRvv2ioBX5nSQ58XSI7EE4LTDA94UvJcjbxKGfxgEfSfUxwEsXkiAv3HRHnGfdf8UAHxW/liAvhn+OKDc8ykNenqvy5L7EXwpemm6pmrrl782TDygfsY+Oca+X7HkvHOXJe7QPRZbB5wjgJYbR+DXMk9N9JbvWXIgP/hTtzvdynpxq65YsAFhR3ApgbQmTrBX9OggB8Zx3WAGRZfHnwqllHfw9F5e9Yme2vUeQD5mf3ilG8+VlfUb7c8/CeL67vXjwSHLa0H4VI85jLNtP+U98pU4JU6VZIG+zPn+WnXFOJ7SuoNlTZxQlb8V58xK4yZGPuGexMc75P/aoMx3fd7SXZ16RXGBMneAdmKYNXpHWfolc+DvAQ1Qo8YiCNpS8mthLBo7JPiGAFvXv786Vv9vP2oE6b4aJBS3d/ZAc+VTmk2XbX1/mmQVl0TMN/LH9pjGcVcOwli0qPzfLzuc5QXlvOEGovIghWs6GI/UM87R3bULSRFpjUnZ7SYkHoJU9Rqpi8utz5CoW1Q4gVrO2B0lT0RrJ++d78cfvMh/pipWNVnUsVc7lyRVdxsSsrqTzzw4jXWVnM0+unOqgRDTlJTuVQGhNqYDJkysMcVdtDEx5lGjzRTPa3SmItwv1ru244zlq9MtD5Fi0woEnzeuOkkY8i1EVTJBrXoafhc5YZzkec9Mz67cR5NqR0FeNex4lnfYbZZUgV5vRSSWqQUoccraTQZIHJl8yViuzx7nb2VVeJLlh4H83V/BlJjBoArHjCYXaKOMSpefoif5FJeHMatLkctEJvmaxVM0wjiXDroAuVn8ajHF3vXwtxPAQf2Sx5MnB7sFxJKiykQ6EGEme3KOmJfT0mkacBSb+C9w3saVADhwK3qUxa7xH8c8VyEsFUuY6PCdRqzzkw5W6ciQ9tnv2Rp7x22LazxvRGBUySuRWjavjdvc1D5qjQSs0MxhlJWvD/cr/xvhJSJK12y9CjJZYF9uXoK7UqyDhZUtsD5K+RtF+rRaW2C4UndxHjYXbFDsrwFiXihkStiq2/8BakVtJCQu8tmyfmbkWGT3TaUVrFh6ZRSbfqaKWA1wfUuSNJcn+COickt0c+UcxiPgAFg2nfjFH/us77bs5l3pqshzcCXEKmnLkN/PlufcH36m7ScPJfOXIc51M1knzagKgOFT2xCntyJEXvNP1OOkt4j5S+suSOCFwperP2umFDa5cA1kvsfOJWpWANdJcjjxELdlBEa9rRN5uf6/6h4KLl+A0qApzXy+8HJdRVZjr4vYEypPbXzaHrJksOUwi1SFx69EJ8seIRtzFLUsmyPFr7e2KW6xGRqMeKbvCDUWVyGvumRXEs+CK5J2qfyyo+KsPCrHXRzJmtvxanQL5I41xggZ/xXg7SiEDjrgtMcvkOBVLKIqpwExyT6WvsNsSlJ6XyNWXdDgqUV+Qcl6t3iHHu0SLSCk9fvEXylqRaD0dJZf6GJFITi6RSf4Y5oxwLR01f468YtSKhGsMqOQPML7vROCMmgmc2nObEneFYFSL1N5dFa+UZtXJoJTj2pNEezNmhVC9rViJXhjsfRpqXQIqsVyUs0NFjad1Xg5VghxpLZ0NyayW5O5KUtdCyG+ZtdH8/VgG9UyvSrV4Eu1EU8shXgZcvAdPfKyaQ1lyvUrFfx8fu9ePseS6/MjcGdNT1SxKKraoNyDPbvk6+a2CmKsaeTbB1Sa3vpUkkt9lbJii9NY3luwuOir7q/mLGhQAc9Zv6JOfNe2NUVZPa0u6UaXynnp+1+2otDQI98gkDaaDVudsBXdag3YcJc4nHOV7k3LJL4GZ7Wa33m0r5ZHWp/yGgFzy+hXI8QtE5MlrVyAnO5eLyeu2ekmlSaFgLKyT1dpovCqAi8jrtVpPqUefgFynQWJlUtvuVDTz16kUVm1rMKHNU5/h/U0JXCIaVTWQtBSbDovt3Br4Z79SbUUpJsfYEwpAkjEoFfKa3O/KOx/KeHVVbB6iKvWO8jLkT4A94yzpoAwuF5lw/1HX2BFLLobh+ko2nU2hJKM3bqO/a4BLx+GcrobV2v1NOmLncBmBQiBGh9zdainBqg1zclfdtiOnsyoQuaPFI2odxPXIvYHd3f+0JFinA0TuPcE3gzWUsIwdiNy9wJx8ZsGU3Bs6lWAy2MdVmTyz59xJKZps9aZBnk3tjjTINNrsTIvc852of/8yAdckz9SsfJjfGYHrk2eze7XF0Lq2GwD5GT44VVUi+WIIbkieKRwlsyoGe+NdLI3JLxpOF4sA8w9gviE7EPlZmMELgD1bwchbmLYdxK7cUOSoy3iN9m+8CYgctRIcZh92EPI2aqoZaF9mAPIObnBSsohbKHPyBW4dLMC2xBeZkveRayrgdl83JEc23X/gwI3Ifew49Ek/9lSWPrk/x+5xTt3kV1u65H4PGbvRSCG5dcnDCf7CBhj7xYx8VEH5yMbUHTcnD3tV1I58QY5tOuT+tJpqIe0UEgy5H6fVRJs/zcMQBuTD7kcl1A3lelZI8k48r7DuF8g1UyUPp5NlpQ3tT+Bj+h+5Tx01/c5w2k2eK8+ggURfGOTh/LhfzlZpMg963UmSrmaz5diRovYvaxfc+73bB07lhe96gbbaSuRO5YXvSuGNlzK5g/2CxspV25rkXt+pUu6N3RudIPe8tjOP+z/5BcUg5J4Xu8E+l+0aAEee+Z+Vmag3/ZuABl6kybPrXu1UHuBcbxp5lc/7oYt1venk5/4pVXCvm5jcTI9lgb38emVcA6Eqpq82QuyPdpgMMZkv4nipYYTyxB8SKyEXofj+eT+w3SZsOcV9uu8SxmQswn+/LWy6oQLJRKP6Ewv1jj8pWD5YT5IRSD9O1nA1f7txF30oL0kh6hzGKcRqjjcHqM9SzLGEzeTjXffi7/ZpBJgAN5ROXi1sRyvFKM5mFYwqmLN50s+fh/EiSD/2vD/BdrM+rYLFqKqJiyvjCiE/HA7ao2ncXES9yTyZT4JeN1o04/ZgeOmv5qr+AyGYl84NdxBJAAAAAElFTkSuQmCC"
                  alt="Picture of the author"
                  width={30}
                  height={25}
                /> */}
                <Twitter />
              </a>
              <a className="" href="https://in.pinterest.com/anjanase05/">
                {/* pintrest
                <Image
                  src="data:image/png;base64,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"
                  alt="Picture of the author"
                  width={30}
                  height={30}
                /> */}
                <Pinterest />
              </a>
              {/* <I18nWidget /> */}
            </div>
          </div>
        </div>
        <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
          <div>
            <span>&copy; 2020 ACME, Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center text-primary text-sm">
            <span className="text-primary">Created by</span>
            <a
              rel="noopener noreferrer"
              href="https://vercel.com"
              aria-label="Vercel.com Link"
              target="_blank"
              className="text-primary"
            >
              <Vercel
                className="inline-block h-6 ml-3 text-primary"
                alt="Vercel.com Logo"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
