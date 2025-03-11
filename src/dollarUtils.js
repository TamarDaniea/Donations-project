export const fromShekelToX = (sum, coin) => {
    if (coin.type == "s")
        return sum
    return sum / coin.dollarRate
}
export const fromXlToShekel= (sum, coin) => {
    if (coin.type == "s")
        return sum
    return sum * coin.dollarRate
}