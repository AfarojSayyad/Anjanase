import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import Image from 'next/image'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <NavbarRoot>
    {/* <div className="justify-center items-center pl-24 pt-3">
      <Link href="/">
        <Image
          src="https://cdn.shopify.com/s/files/1/0636/4427/0827/files/Anjanase-logo_2a5c0236-d0e8-4ee1-be32-c7a82818c675_160x.png?v=1657713372"
          alt="Picture of the author"
          width={100}
          height={60}
        />
      </Link>
    </div> */}
    <Container clean className="mx-auto max-w-8xl px-20">
      <div className={s.nav}>
        <div className="flex items-center flex-1">
          <Link href="/">
            {/* <a className={s.logo} aria-label="Logo"> */}
            {/* <Logo /> */}

            <Image
              src="https://cdn.shopify.com/s/files/1/0636/4427/0827/files/Anjanase-logo_2a5c0236-d0e8-4ee1-be32-c7a82818c675_160x.png?v=1657713372"
              alt="Picture of the author"
              width={100}
              height={60}
            />
            {/* </a> */}
          </Link>
          <nav className={s.navMenu}>
            <Link href="/search">
              <a className={s.link}>All</a>
            </Link>
            {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className={s.link}>{l.label}</a>
              </Link>
            ))}
          </nav>
        </div>
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>
        )}
        <div className="flex items-center justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </div>
      {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" />
        </div>
      )}
    </Container>
  </NavbarRoot>
)

export default Navbar
