import { FormControlLabel, FormGroup, Checkbox } from '@mui/material'
import { useContext } from 'react'
import { TicketsContext } from '../context'

export const CheckAllParams = () => {
  const { isAllParams, handleCheckAllParams } = useContext(TicketsContext) ?? {}
  return (
    <FormGroup id="group-params">
      <FormControlLabel
        key={'all-params'}
        control={
          <Checkbox checked={isAllParams} onChange={handleCheckAllParams} />
        }
        label={'Все'}
      />
    </FormGroup>
  )
}
