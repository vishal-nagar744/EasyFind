export const arrPriceRanges = [
    "0-1500",
    "1500-3000",
    "3000-4000",
    "5000-6000",
    "6000-7000"
]

export const priceRangeToIndex = (priceRange) => {
   const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

   return index
}