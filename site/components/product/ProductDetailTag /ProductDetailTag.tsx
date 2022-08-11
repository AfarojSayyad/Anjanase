import cn from 'clsx'
import { inherits } from 'util'
import s from './ProductDetailTag.module.css'

interface ProductTagProps {
  className?: string
  name: string
  price: string
  fontSize?: number
  vendor?: string
  // productType?: string
}

const ProductTag: React.FC<ProductTagProps> = ({
  name,
  price,
  className = '',
  fontSize = 32,
  vendor = '',
  // productType = '',
}) => {
  return (
    <div className={cn(s.root, className)}>
      <h3 className={s.name}>
        <span
          className={cn({ [s.fontsizing]: fontSize < 32 })}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize}px`,
          }}
        >
          {/* {productType} */}
          {vendor}
          {name}
        </span>
      </h3>
      <div className={s.price}>{price}</div>
    </div>
  )
}

export default ProductTag
