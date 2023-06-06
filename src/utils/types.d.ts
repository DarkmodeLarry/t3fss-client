import type { categories } from 'src/constants/config'

type DateTime = {
  justDate: Date | null
  dateTime: Date | null
}

export type Categories = (typeof categories)[number]
