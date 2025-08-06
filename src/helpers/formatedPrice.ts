import type { ITypesProducts } from "@/types/products"

export function formatedPrice (price: number|string|string[], type?: string): string|string[] {
  if (price === undefined || null) return ''
  let valorFinal = ''
  if (price === 0) {
    valorFinal = '0,00'
  } else {
    const p = price.toString()
    if (/\.|,/.test(p)) {
      valorFinal = `${p.substring(0, p.length - 2).replace(/\W/g, '')},${p.substring(p.length - 3).replace(/\W/g, '')}`
    } else {
      valorFinal = `${p.substring(0, p.length - 2).replace(/\W/g, '')},${p.substring(p.length - 2).replace(/\W/g, '')}`
    }
  }

  if (type) {
    if (/float|dot/.test(type)) {
      return valorFinal.replace(/\.|,/, '.')
    } else if (/split/.test(type)) {
      return String(valorFinal || '').split(/\.|,/)
    } else {
      return valorFinal
    }
  } else {
    return `R$ ${valorFinal}`
  }
}

export function getPriceWithDifferencesActived (p: ITypesProducts): number {
  const DIFFERENCE = p.differences[Object.keys(p.differences)[0]]

  const {
    status,
    value
  } = DIFFERENCE ?? {}

  if (status) {
    return Number(p.price.default) + Number(value)
  }

  return Number(p.price.default)
}

export function getPriceWithDiscount (price: {
  default: number
  discount: {
    status: boolean,
    percentage: number
  }
}): number {
  const {
    default: priceUnit,
    discount
  } = price ?? {}

  let finalPrice = priceUnit

  if (discount && discount.status) {
    const discountPercentage = discount.percentage / 100
    finalPrice = finalPrice * (1 - discountPercentage)
  }

  return Math.round(finalPrice)
}
