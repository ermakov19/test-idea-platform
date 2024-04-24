import { Box, Button, Card, List } from '@mui/material'
import LogoTK from '../logo-turkish.jpeg'
import LogoS7 from '../logo-s7.png'
import { useContext } from 'react'
import { TParam, TicketsContext } from '../context'

export const TicketItems = () => {
  const { tickets, currentCurrency, paramsOptions } =
    useContext(TicketsContext) ?? {}
  const result: any[] = []
  if (!tickets) return <></>
  if (!currentCurrency) return <></>

  for (let i = 0; i < tickets.length; i++) {
    const paramElement = paramsOptions?.find(
      (el: TParam) => +el.stop === +tickets[i].stops
    )
    const price = +tickets[i].price / +currentCurrency.rate
    const resultPrice = price.toFixed(2)
    result.push(
      <Card
        key={i}
        id={i.toString()}
        sx={{ margin: '10px 0', display: 'flex', width: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRight: '1px gray solid',
            flexBasis: '30%',
          }}
        >
          <Box
            style={{
              backgroundImage: LogoTK,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '100px',
              width: '100px',
            }}
          >
            <img
              src={tickets[i].carrier === 'S7' ? LogoS7 : LogoTK}
              alt=""
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </Box>
          <Box>
            <Button
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                color: 'white',
                marginBottom: '20px',
                backgroundColor: 'orange',
              }}
            >
              <span>{`Купить за`}</span>
              <span>{`${resultPrice} ${currentCurrency.sym}`}</span>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            height: '130px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              height: '60px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flex: '1 70%',
            }}
          >
            <Box
              sx={{
                flexBasis: '33%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                fontSize: '48px',
                marginLeft: '5px',
              }}
            >
              {tickets[i].departure_time}
            </Box>
            <Box
              sx={{
                flexBasis: '33%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'gray',
              }}
            >
              {paramElement?.label}
            </Box>
            <Box
              sx={{
                flexBasis: '33%',
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                fontSize: '48px',
                marginRight: '5px',
              }}
            >
              {tickets[i].arrival_time}
            </Box>
          </Box>
          <Box
            sx={{
              height: '35px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              // backgroundColor: "green",
            }}
          >
            <span
              style={{ margin: '0 5px', fontWeight: 'bold' }}
            >{`${tickets[i].origin_name} , ${tickets[i].origin}`}</span>
            <span
              style={{ margin: '0 5px', fontWeight: 'bold' }}
            >{`${tickets[i].destination_name} , ${tickets[i].destination}`}</span>
          </Box>
          <Box
            sx={{
              height: '35px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ margin: '0 5px' }}>{tickets[i].departure_date}</span>
            <span style={{ margin: '0 5px' }}>{tickets[i].arrival_date}</span>
          </Box>
        </Box>
      </Card>
    )
  }

  return (
    <List
      style={{
        margin: 0,
        width: '700px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {result}
    </List>
  )
}
