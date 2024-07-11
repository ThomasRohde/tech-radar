import { Box, createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import AdminPage from './components/AdminPage'
import BurgerMenu from './components/BurgerMenu'
import { TechnologiesProvider } from './components/DataManager'
import Radar from './components/Radar'

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Disable the ripple effect globally
      },
    },
  },
});

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
      // Modify focus styles
      '*:focus': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
      },
      // Remove focus styles for mouse users
      '*:focus:not(:focus-visible)': {
        outline: 'none',
        boxShadow: 'none',
      },
      // Apply focus styles only for keyboard navigation
      '*:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
      },
    }}
  />
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <TechnologiesProvider>
        <Box sx={{ display: 'flex' }}>
          <BurgerMenu onNavigate={handleNavigation} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - 48px)` },
              ml: { sm: `48px` },
            }}
          >
            {currentPage === 'home' && <Radar />}
            {currentPage === 'admin' && <AdminPage />}
          </Box>
        </Box>
      </TechnologiesProvider>
    </ThemeProvider>
  )
}

export default App