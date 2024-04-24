import React from 'react'
import './App.css'
import { Card, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { CurrencyGroup } from './components/CurrencyGroup'
import { CheckAllParams } from './components/CheckAllParams'
import { CheckParams } from './components/CheckParams'
import { TicketItems } from './components/TicketItems'

function App() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid
          item
          md={12}
          style={{ display: 'flex', width: '100%', marginBottom: '20px' }}
        >
          <Card variant="outlined" style={{ padding: '20px' }}>
            <Typography variant="h6">ВАЛЮТА</Typography>
            <Box sx={{ margin: '20px' }}>
              <CurrencyGroup />
            </Box>
            <Typography variant="h6">КОЛИЧЕСТВО ПЕРЕСАДОК</Typography>
            <CheckAllParams />
            <CheckParams />
          </Card>
          <Card variant="outlined">
            <TicketItems />
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
