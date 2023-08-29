export interface Transaction {
  id: string
  type: string
  entity: string
  paymentMethod: string
  recurring: string
  name: string
  amount: number
  location: string
  notes: string
  receipt: string
  bankAccount: string
  userId: string
  categories: Category[]
  updatedAt: Date
  createdAt: Date
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  username: string
  password: string
  avatarUrl: string | null
  createdAt: Date
  updatedAt: Date
}
