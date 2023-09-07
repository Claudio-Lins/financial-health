import dayjs from "dayjs"

export function formatteCurrency(amount: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

export function formatDate(date: Date) {
  return dayjs(date).format("DD/MM/YYYY")
}
