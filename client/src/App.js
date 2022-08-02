import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useEffect } from 'react';
import './App.css';

import Homepage from './components/Homepage/Homepage.js';
import Main from './components/Main/Main.js';
import Dogs from './components/Dogs/Dogs.js'
import DogDetail from './components/DogDetail/DogDetail';
import DogCreate from "./components/CreateDog/CreateDog.js"
import NotFound from "./components/NotFound/NotFoundPage.js"

import { resetFilter, getAllDogTemperaments } from './redux/actions/actions.js'


function App() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllDogTemperaments())
    // RESETEAMOS LOS FILTROS CUANDO SE DESMONTE
    return function resetFilters() {
      dispatch(resetFilter())
    }
  }, [dispatch]
  )


  return (
    <div id='APP' className="App">
      <Routes>
        <Route path='/' element={ <Homepage /> } />

        <Route path='/home' element={ <Main /> } >
          <Route path='' element={ <Navigate to="dogs" /> } />
          <Route path='dogs' element={ <Dogs /> } />
          <Route path='dog-detail/:dogId' element={ <DogDetail /> } />
          <Route path='create-breed' element={ <DogCreate /> } />

        </Route>




        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;
