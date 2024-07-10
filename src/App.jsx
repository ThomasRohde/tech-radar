import React, { useState } from 'react'
import AdminPage from './components/AdminPage'
import BurgerMenu from './components/BurgerMenu'
import { TechnologiesProvider } from './components/DataManager'
import Radar from './components/Radar'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <TechnologiesProvider>
      <div className="App">
        <BurgerMenu onNavigate={handleNavigation} />
        {currentPage === 'home' && <Radar />}
        {currentPage === 'admin' && <AdminPage />}
      </div>
    </TechnologiesProvider>
  )
}

export default App