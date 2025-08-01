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

export function getFinalPrice (price: {
  default: number
  discount: {
    status: boolean,
    percentage: number
  }
}): number {
  let finalPrice = price.default

  if (price.discount && price.discount.status) {
    const discountPercentage = price.discount.percentage / 100
    finalPrice = finalPrice * (1 - discountPercentage)
  }

  return Math.round(finalPrice)
}
