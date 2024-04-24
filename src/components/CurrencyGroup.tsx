import { Button, ButtonGroup } from '@mui/material'
import { memo, useContext } from 'react'
import { TCurrency, TicketsContext } from '../context'

export const CurrencyGroup = () => {
  const { allCurrencies, currentCurrency, handleChangeCurrency } =
    useContext(TicketsContext) ?? {}

  const result = allCurrencies?.map((el: TCurrency) => {
    const btnView =
      el.label === currentCurrency?.label ? 'contained' : 'outlined'
    return (
      <Button
        variant={btnView}
        key={el.label}
        id={el.label}
        onClick={handleChangeCurrency}
      >
        {el.label}
      </Button>
    )
  })

  return (
    <ButtonGroup variant="contained" aria-label="currency button group">
      {result}
    </ButtonGroup>
  )
}

export const MemoCurrencyGroup = memo(CurrencyGroup)
