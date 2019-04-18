import React from 'react'
import AppBar from './components/appbar'
import { Navbar } from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <AppBar />
      <Routes />
    </div>
  )
}

export default App
