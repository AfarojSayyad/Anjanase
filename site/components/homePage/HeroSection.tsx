import React from 'react'
import { Autoplay, EffectFade, Swiper as SwiperCore } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'

const params = {
  slidesPerView: 1,
  watchOverflow: false,
  autoplay: {
    delay: 5000,
  },
  loop: true,
  allowTouchMove: false,
  speed: 1000,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
}
const images = [
  'https://www.xda-developers.com/files/2021/12/1_pantone_collab_dark-1900x700_c.jpg',
  'https://cdn.wallpaperhub.app/cloudcache/2/0/4/0/f/9/2040f9c1b1b0f95514750ce0c838579346a67db2.jpg',
  'https://wallpapercave.com/wp/wp10128625.jpg',
  'https://cdn.mos.cms.futurecdn.net/3WcZUWAMGTpTqjkZhjof64.jpg',
]

export default function HeroSection() {
  SwiperCore.use([Autoplay, EffectFade])
  return (
    <div className="hero-section position-relative">
      <Swiper {...params}>
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <div
              className="hero-slide d-flex align-items-center justify-content-center flex-column font-color-white py-5"
              style={{
                backgroundImage: `url("${image}")`,
              }}
            >
              <p className="font-size-display5 font-family-secondary mb-4 text-center hero-header">
                The care you&apos;ve always needed
              </p>
              <p className="text-transform-uppercase font-size-title mb-5 hero-subheader">
                A range of products for you
              </p>
              <Link href="/collection">
                <a className="d-flex align-items-center bg-transparent border border-color-white h-56 px-5 font-color-white hero-btn">
                  Shop now
                </a>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
