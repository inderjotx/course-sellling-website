export function toDollar(value: string) {

    const amount = parseFloat(value)
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount)
    return formatted

}