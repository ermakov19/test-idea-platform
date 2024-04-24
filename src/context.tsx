import React, { createContext, useCallback, useState } from 'react'
import ticketsData from './tickets.json'

export type TParam = {
  stop: number
  label: string
  checked: boolean
}
// TODO: тип даты, времени
export type TTicketData = {
  origin: string
  origin_name: string
  destination: string
  destination_name: string
  departure_date: string
  departure_time: string
  arrival_date: string
  arrival_time: string
  carrier: string
  stops: number
  price: number
}

export enum TSort {
  ASC = 'ASC',
  DESC = 'DESC',
}
export enum TCurrencySymbol {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
}
export type TCurrency = {
  label: TCurrencySymbol
  sym: string
  rate: number
}
const defaultCurrency = [
  {
    label: TCurrencySymbol.RUB,
    sym: `₽`,
    rate: 1,
  },
  {
    label: TCurrencySymbol.USD,
    sym: `$`,
    rate: 92.11,
  },
  {
    label: TCurrencySymbol.EUR,
    sym: `€`,
    rate: 102.22,
  },
]

const defaultParamsOptions = [
  { stop: 0, label: 'Без пересадок', checked: true },
  { stop: 1, label: '1 пересадка', checked: true },
  { stop: 2, label: '2 пересадки', checked: true },
  { stop: 3, label: '3 пересадки', checked: true },
]

type TTicketContext = {
  tickets: TTicketData[]
  setTickets: (tickets: TTicketData[]) => void
  handleCheckOneParam: (e: any) => void
  paramsOptions: TParam[]
  isAllParams: boolean
  handleCheckAllParams: (e: any) => void
  allCurrencies: TCurrency[]
  currentCurrency: TCurrency
  handleChangeCurrency: (e: any) => void
}

export const TicketsContext = createContext<TTicketContext | null>(null)

export const Context = ({ children }: any) => {
  const [tickets, setTickets] = useState<TTicketData[]>(ticketsData.tickets)
  const [paramsOptions, setParamsOptions] =
    useState<TParam[]>(defaultParamsOptions)
  const [isAllParams, setIsAllParams] = useState<boolean>(true)
  const [allCurrencies, setAllCurrencies] =
    useState<TCurrency[]>(defaultCurrency)
  const [currentCurrency, setCurrentCurrency] = useState<TCurrency>(
    defaultCurrency[0]
  )

  const sortTickets = (data: TTicketData[], sortParam: TSort) => {
    switch (sortParam) {
      case TSort.ASC:
        return data.sort((a, b) => a.price - b.price)
      default:
        return data.sort((a, b) => b.price - a.price)
    }
  }
  const filterTickets = (paramStops: number[], data: TTicketData[]) => {
    const result = []
    for (let t of data) {
      if (paramStops.includes(t.stops)) result.push(t)
    }
    return result
  }

  const handleCheckOneParam = useCallback(
    (e: any) => {
      if (isAllParams) {
        setIsAllParams(false)
      }
      const id = e.currentTarget.id
      const isChecked = e.target.checked
      const checkedStops: number[] = []
      const correctedParams = paramsOptions.map((el) => {
        if (el.stop === +id) {
          el.checked = isChecked
        }
        if (el.checked) {
          checkedStops.push(el.stop)
        }
        return el
      })
      setParamsOptions(() => {
        return correctedParams
      })

      const newTickets = filterTickets(checkedStops, ticketsData.tickets)
      const sortedNewTickets = sortTickets(newTickets, TSort.ASC)

      setTickets(sortedNewTickets)
    },
    [isAllParams, paramsOptions]
  )

  const handleCheckAllParams = useCallback(
    (e: any) => {
      setIsAllParams(e.target.checked)
      if (e.target.checked) {
        const checkedStops: number[] = []

        const newParams = paramsOptions.map((el) => {
          checkedStops.push(el.stop)
          return { ...el, checked: true }
        })
        setParamsOptions(() => {
          return newParams
        })
        const newTickets = filterTickets(checkedStops, ticketsData.tickets)
        const newSortedTickets = sortTickets(newTickets, TSort.ASC)
        setTickets(newSortedTickets)
      }
    },
    [paramsOptions]
  )

  const handleChangeCurrency = useCallback(
    (e: any) => {
      const newCurrentCurrency = allCurrencies.find(
        (el) => el.label === e.currentTarget.id
      )
      if (!newCurrentCurrency) return
      setCurrentCurrency(newCurrentCurrency)
    },
    [allCurrencies]
  )

  const value: TTicketContext = {
    tickets,
    setTickets,
    handleCheckOneParam,
    paramsOptions,
    isAllParams,
    handleCheckAllParams,
    allCurrencies,
    currentCurrency,
    handleChangeCurrency,
  }
  return (
    <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
  )
}
