import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
// import ProductTag from '../ProductTag'
import usePrice from '@framework/product/use-price'
import ProductDetailTag from '../ProductDetailTag '

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })
  console.log('tags:', product.tags)
  console.log('vendor:', product.vendor)
  // console.log('title', product.title)

  // console.log('seo:', product.seo)

  return (
    <div className={className}>
      {/* <div className="mr-9">{product.vendor}</div> */}
      <h3>Details</h3>

      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description}
      />
      <div className="px-44  text-right auto-cols-max">
        {product.tags}

        {/* <h6 className="whitespace-pre-wrap">
            {product.tags.slice(0, 3)} <br />
          </h6> */}
      </div>
      <div className="flex flex-row justify-between items-center">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
      </div>
      <div>
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'}
          </Button>
        )}
      </div>
      <div className="mt-6">
        <Collapse title="CARE INSTRUCTIONS">
          {/* {product.vendor} */}
          {/* This is a limited edition production run. Printing starts when the
          drop ends. */}
          <ul className="list-disc">
            <li>Dry clean only.</li>
            <li>
              Store garment in a muslin cloth in a dry environment, as - the
              zari tends to react to the weather changes.
            </li>
            <li>Avoid spraying perfume directly on the garment.</li>
            <li>Air the textiles every few months.</li>
          </ul>
        </Collapse>
        <Collapse title="SHIPPING & RETURN POLICY">
          {/* This is a limited edition production run. Printing starts when the
          drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
          to COVID-19. */}
          <ul className="list-disc">
            <li>
              Once the order is placed, products which are ready to ship will be
              couriered within three business working days. However, the
              delivery timeline may vary subject to product availability.
            </li>
            <li>
              If you want to return your product, then it should be initiated
              within 48 hours of the product delivered.
            </li>
            <li>All products which are custom-made will be non-returnable.</li>
          </ul>
        </Collapse>
        <Collapse title="DISCLAIMER">
          {/* This is a limited edition production run. Printing starts when the
          drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
          to COVID-19. */}
          <ul className="list-disc">
            <li>
              Product color may slightly vary due to photographic lighting
              sources or your monitor setting.
            </li>
            <li>
              Please note that our textiles are handloom and due to that you may
              find slight irregularities from one product to another.
            </li>
            <li>
              However, if the product has a genuine quality manufacturing defect
              then we are open to extending a full refund or fulfilling your
              order.
            </li>
          </ul>
        </Collapse>
      </div>
      <div>
        {/* <div className="mr-9">{product.productType}</div> */}
        {/* {product.description} */}

        <ProductDetailTag
          name={product.name}
          vendor={product.vendor}
          price={`${price} ${product.price?.currencyCode}`}
          fontSize={32}
        />
      </div>
    </div>
  )
}

export default ProductSidebar
