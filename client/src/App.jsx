import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Manager from './components/Manager'
import List from './components/List'
import Product from './components/Product'
import {
  Link,
  Routes,
  Route
} from "react-router-dom";
function App() {

  return (
    <>

      <Routes> 
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/" element={
          <div className='containerManager'>
            <Manager />
            <List />
          </div>
        }/>
      </Routes>
    </>
  )
}

export default App
