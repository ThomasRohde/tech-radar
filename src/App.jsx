import React from 'react'
import { TechnologiesProvider } from './components/DataManager'
import Radar from './components/Radar'

function App() {
  return (
    <TechnologiesProvider>
      <div className="App">
        <Radar />
      </div>
    </TechnologiesProvider>
  )
}

export default App