import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination, Swiper as SwiperCore } from 'swiper'
import Link from 'next/link'
// import ProductCategory from '@components/product/ProductCategory'
import { ProductCategory } from '@components/product'
import Banner from '@components/product/Banner'
import { useRef } from 'react'
import HeroSection from '@components/homePage/HeroSection'
import CollectionMain from '@components/common/collectionMain'
import Collection from '@components/collectionMain/collection'
// import 'swiper/swiper.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import SwiperCore, { Autoplay } from 'swiper'
import { Navigation } from 'swiper'
import { getCategories } from '@framework/utils'

type FormValues = {
  title: string
  excerpt: string
  content: string
  seo_title: string
  seo_content: string
  seo_slug: string
  image: any
  author: any
}
const params = {
  slidesPerView: 3,
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
  'https://cdn.shopify.com/s/files/1/0636/4427/0827/files/3_b9dd8296-cd69-4d4c-983a-81a41f9d8222_1900x.jpg?v=1656585779',
  'https://cdn.shopify.com/s/files/1/0636/4427/0827/files/4_1900x.jpg?v=1654685595',
  'https://cdn.shopify.com/s/files/1/0636/4427/0827/files/5_9e366d9e-e136-4c2c-a4fd-38feda81b298_1900x.jpg?v=1656586114',
  'https://cdn.shopify.com/s/files/1/0636/4427/0827/files/7_1900x.jpg?v=1654685733',
  // 'https://www.xda-developers.com/files/2021/12/1_pantone_collab_dark-1900x700_c.jpg',
  // 'https://cdn.wallpaperhub.app/cloudcache/2/0/4/0/f/9/2040f9c1b1b0f95514750ce0c838579346a67db2.jpg',
  // 'https://wallpapercave.com/wp/wp10128625.jpg',
  // 'https://cdn.mos.cms.futurecdn.net/3WcZUWAMGTpTqjkZhjof64.jpg',
  // '	https://cdn.shopify.com/s/files/1/0636/4427/0827/files/Group_98_1024x.png?v=1654685938',
]

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  console.log({ siteInfoPromise })

  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

SwiperCore.use([EffectFade, Pagination])
export default function Home({
  products,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log({ categories, products })

  SwiperCore.use([Autoplay, EffectFade])

  const swiperRef = useRef(null)

  return (
    <>
      {/* <div className="hero-section position-relative">
        <Grid variant="filled">
          {products.slice(0, 6).map((product: any, i: number) => (
            <ProductCard
              key={product.id}
              product={product}
              imgProps={{
                width: i === 0 ? 1080 : 540,
                height: i === 0 ? 1080 : 540,
                priority: true,
              }}
            />
          ))}
        </Grid>
      </div> */}
      {/* <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid> */}
      {/* <div className="hero-section position-relative"> */}
      {/* <Swiper>
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
        </Swiper> */}
      {/* </div> */}

      {/* new swiper ex. */}
      {/* <HeroSection /> */}
      <div className="hero-section position-relative px-5">
        {/* STATIC slider example */}
        {/* <Hero headline={'Headline'} description={'Description'} /> */}
        <div className="px-24">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            // className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={image}>
                <div
                  className="hero-slide d-flex  justify-content-start  flex-column font-color-white py-5"
                  style={{
                    backgroundImage: `url("${image}")`,
                  }}
                >
                  <div className="mt-5 pt-40 px-5">
                    <p className="text-uppercase text-white text-xl mt-5 hero-subheader">
                      Presenting
                    </p>
                  </div>

                  <div className=" px-5 mb-3">
                    <p className=" text-4xl font-bold italic font-sans text-white  mb-4 ">
                      {/* The care you&apos;ve always needed */}
                      Beautifully Handcrafted Sarees
                    </p>
                  </div>

                  <div className="align-items-center px-5 mb-5">
                    <Link href="/search">
                      <a
                        className="text-gray-900  bg-white border border-gray-300 focus:outline-none  hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-5"
                        // className="d-flex align-items-center bg-transparent border border-color-white h-56 px-5 font-color-white hero-btn"
                      >
                        Shop now
                      </a>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* DYNAMIC slider example */}
        {/* <div className="px-5">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            // className="mySwiper"
          >
            {products.slice(0, 4).map((product: any, i: number) => (
              <SwiperSlide key={product.id}>
                <div className="py-5">
                  <Banner key={product.id} product={product}>
                    <div className="hero-slide d-flex align-items-center justify-content-center flex-column font-color-white py-5">
                      <p className="font-size-display5 font-family-secondary mb-4 text-center hero-header">
                        The care you&apos;ve always needed
                      </p>
                      <p className="text-transform-uppercase font-size-title mb-5 hero-subheader">
                        A range of products for you
                      </p>
                    </div>
                  </Banner>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}

        <div className="hero-section position-relative">
          {/* <Swiper>
          {products.slice(0, 1).map((product: any, i: number) => (
            <SwiperSlide key={product.id}>
              <div className="py-5">
                <Banner key={product.id} product={product}>
                  <div className="hero-slide d-flex align-items-center justify-content-center flex-column font-color-white py-5">
                    <p className="font-size-display5 font-family-secondary mb-4 text-center hero-header">
                      The care you&apos;ve always needed
                    </p>
                    <p className="text-transform-uppercase font-size-title mb-5 hero-subheader">
                      A range of products for you
                    </p>
                  </div>
                </Banner>
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}
          {/* <CollectionMain /> */}
          {/* <Collection /> */}
        </div>
        <div className="p-2">
          <h1
            className="font-size-display1 font-serif mt-5 text-center mx-auto  "
            style={{ maxWidth: '60rem' }}
          >
            Timeless Textile Tales
          </h1>
          <p
            className="font-size-display1 mt-5 text-center mx-auto text-uppercase"
            style={{ maxWidth: '50rem' }}
          >
            Handcrafted with love and the passion for the quality that only
            comes from centuries old techniques
          </p>
          <div className="d-flex align-items-center justify-content-center mt-3 mb-3">
            <button type="button" className="btn btn-danger">
              <Link href="/search">
                <a className="d-flex py-3 align-items-center font-color-black borderbottom border-color-black">
                  <p className=" m-0 text-center">Find out more</p>
                  {/* <img src="/icon/arrow-long-right.svg" /> */}
                </a>
              </Link>
            </button>
            {/* <Link href="/search">
            <a className="d-flex py-3 align-items-center font-color-black borderbottom border-color-black">
              <p className="mr-3">Find out more</p>
              <img src="/icon/arrow-long-right.svg" />
            </a>
          </Link> */}
          </div>
        </div>
        <div className="bg-brand300 py-5 collection-banner">
          <div className="custom-container py-5">
            <p className="text-4xl font-sans font-bold my-3 py-5 text-center">
              Categories
            </p>
            {/* <div className="row px-5">
              {categories.slice(3).map((product: any, i: number) => (
                <div
                  // key={`category-item-${index}`}
                  className="col-12 col-md-4 collection-item "
                >
                  <div className="align-items-center font-color-black flex-column cursor-pointer mb-5">
                    <ProductCard
                      key={product.id}
                      product={product}
                      // variant="slim"
                      className="mb-4 w-100 collection-item-image"
                    />
                  </div>
                </div>
              ))}
            </div> */}

            <div className="row">
              {categories.slice(0, 3).map((product: any, i: number) => (
                <div
                  key={product.id}
                  className="col-12 col-md-4 collection-item mb-5"
                >
                  <Link href={`/search/${product.slug}`} key={product.id}>
                    <a className="align-items-center font-color-black flex-column cursor-pointer mb-5">
                      <div>
                        {/* {product.map((product: any, i: number) => (
                          <div
                            className="col-12 col-md-4 collection-item "
                          >
                            <div className="align-items-center font-color-black flex-column cursor-pointer mb-5">
                              <ProductCard
                                key={product.id}
                                product={product}
                                className="mb-4 w-100 collection-item-image"
                              />
                            </div>
                          </div>
                        ))} */}
                        {images.slice(0, 1).map((image, index) => (
                          <div key={image}>
                            <div
                              className="hero-slide d-flex align-items-center justify-content-center flex-column font-color-white py-5"
                              style={{
                                backgroundImage: `url("${image}")`,
                              }}
                            ></div>
                            <div
                            // className="border-solid border-2 border-indigo-800  box-border h-38 w-32 p-4 border-4 rounded-md"
                            >
                              <p className="mb-2  tracking-widest text-uppercase text-center">
                                {product.name}
                              </p>
                            </div>
                          </div>
                        ))}

                        {/* original below */}
                        {product.meta?.image && (
                          <div
                            className="mb-4 w-100 collection-item-image"
                            style={{
                              background: `url("${product.meta.image}") center center/cover`,
                            }}
                          />
                        )}
                        {/* <div
                        // className="border-solid border-2 border-indigo-800  box-border h-38 w-32 p-4 border-4 rounded-md"
                        >
                          <p className="mb-2  tracking-widest text-uppercase text-center">
                            {product.name}
                          </p>
                        </div> */}
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-brand300  collection-banner">
          <div className="custom-container ">
            <div className="d-flex justify-content-between">
              <p className="font-size-display3 font-bold text-2xl font-sans ml-5 fs-1  py-5 text-center ">
                FEATURED COLLECTION
              </p>
              <div className="d-flex align-items-center justify-content-end mr-5 mt-3 mb-2">
                {/* <button type="button" className="btn btn-danger"> */}
                <Link href="/search">
                  <a className="d-flex py-3 align-items-center font-color-black borderbottom border-color-black">
                    <p className="m-0 text-center text-danger font-bold">
                      View All
                    </p>
                    {/* <img src="/icon/arrow-long-right.svg" /> */}
                  </a>
                </Link>
                {/* </button> */}
              </div>
            </div>

            <div className="row px-5">
              {products.slice(3).map((product: any, i: number) => (
                <div
                  // key={`category-item-${index}`}
                  className="col-12 col-md-4 collection-item "
                >
                  <div className="align-items-center font-color-black flex-column cursor-pointer mb-5">
                    <ProductCard
                      key={product.id}
                      product={product}
                      // variant="slim"

                      className="mb-4 w-100 collection-item-image"
                    />
                  </div>

                  {/* <Link href={`/collection#${item.slug}`} key={item.id}>
                  <a className="align-items-center font-color-black flex-column cursor-pointer mb-5">
                    <div>
                      {item.meta?.image && (
                        <div
                          className="mb-4 w-100 collection-item-image"
                          style={{
                            background: `url("${item.meta.image}") center center/cover`,
                          }}
                        />
                      )}
                      <p className="mb-2 font-size-heading text-center">
                        {item.name}
                      </p>
                    </div>
                  </a>
                </Link> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-brand300 py-5 collection-banner">
          <div className="custom-container ">
            <p className="font-size-display3 font-bold text-2xl font-sans md:font-serif fs-1 my-3 py-5 text-center ">
              Stay updated, Follow us on Instagram : anjanase
            </p>

            <div className="row px-5">
              {products.slice(0, 6).map((product: any, i: number) => (
                <div
                  // key={`category-item-${index}`}
                  className="col-12 col-md-3 collection-item "
                >
                  <div className="align-items-center font-color-black flex-column cursor-pointer mb-2">
                    <ProductCategory
                      key={product.id}
                      product={product}
                      // variant="slim"

                      className="mb-4 w-100 collection-item-image"
                    />
                    {/* <ProductCard
                    key={product.id}
                    product={product}
                    // variant="slim"

                    className="mb-4 w-100 collection-item-image"
                  /> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Grid variant="filled">
          {products.slice(0, 3).map((product: any, i: number) => (
            <ProductCard
              key={product.id}
              product={product}
              imgProps={{
                width: i === 0 ? 1080 : 540,
                height: i === 0 ? 1080 : 540,
                priority: true,
              }}
            />
          ))}
        </Grid>

        <Marquee variant="secondary">
          {products.slice(0, 3).map((product: any, i: number) => (
            <ProductCard key={product.id} product={product} variant="slim" />
          ))}
        </Marquee>
        <Hero
          headline=" Dessert dragée halvah croissant."
          description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
        />
        <Grid layout="B" variant="filled">
          {products.slice(0, 3).map((product: any, i: number) => (
            <ProductCard
              key={product.id}
              product={product}
              imgProps={{
                width: i === 0 ? 1080 : 540,
                height: i === 0 ? 1080 : 540,
              }}
            />
          ))}
        </Grid>
        <Marquee>
          {products.slice(3).map((product: any, i: number) => (
            <ProductCard key={product.id} product={product} variant="slim" />
          ))}
        </Marquee>
        {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
      </div>
    </>
  )
}

Home.Layout = Layout
