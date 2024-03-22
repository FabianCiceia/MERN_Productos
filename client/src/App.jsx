import { useEffect, useState } from 'react'
import Manager from './components/Manager'
import List from './components/List'
import Product from './components/Product'
import Edit from './components/Edit'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  Routes,
  Route
} from "react-router-dom";
function App() {
  const[listaActualizada,useListaActualizada] = useState(false);
  return (
    <>
      <Routes> 
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/" element={
          <div className=' d-flex position-absolute top-50 start-50 translate-middle '>
            <div className="mx-5">
              <Manager  useListaActualizada={useListaActualizada} />
            </div>
            <div className="mx-5">
              <List   listaActualizada={listaActualizada} useListaActualizada={useListaActualizada}/>
            </div>
          </div>
        }/>
          <Route  path='/:id/edit' element={
            <div  className='containerform'>
              <Edit/>
            </div>
          }/>
      </Routes>
    </>
  )
}

export default App
