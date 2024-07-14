import { Box, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdminPage from './components/AdminPage'
import BurgerMenu from './components/BurgerMenu'
import { TechnologiesProvider } from './components/DataManager'
import QuadrantPage from './components/QuadrantPage'
import Radar from './components/Radar'
import CustomRadarPage from './components/CustomRadarPage'
import theme from './theme'

const globalStyles = (
  <GlobalStyles
    styles={{
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      'body': {
        margin: 0,
        padding: 0,
      },
      '*:focus': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
      },
      '*:focus:not(:focus-visible)': {
        outline: 'none',
        boxShadow: 'none',
      },
      '*:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
      },
    }}
  />
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <TechnologiesProvider>
        <Router>
          <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <BurgerMenu />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Routes>
                <Route path="/" element={<Radar />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/quadrant/:id" element={<QuadrantPage />} />
                <Route path="/custom-radars" element={<CustomRadarPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </TechnologiesProvider>
    </ThemeProvider>
  )
}

export default App