// 2000 -> "2,000"
export function formatPrice(amount: number): string {
  return amount.toLocaleString("en-US")
}

// 11000 -> "11,000.00"
export function formatPriceWithDecimals(amount: number): string {
  return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
