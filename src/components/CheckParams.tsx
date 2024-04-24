import { FormControlLabel, FormGroup, Checkbox } from '@mui/material'
import { useContext } from 'react'
import { TParam, TicketsContext } from '../context'

export const CheckParams = () => {
  const { paramsOptions, handleCheckOneParam } =
    useContext(TicketsContext) ?? {}

  const result = paramsOptions?.map((el: TParam) => {
    return (
      <FormControlLabel
        key={el.stop}
        control={
          <Checkbox
            checked={el.checked}
            onChange={handleCheckOneParam}
            id={el.stop.toString()}
          />
        }
        label={el.label}
      />
    )
  })
  return <FormGroup id="group-params">{result}</FormGroup>
}
