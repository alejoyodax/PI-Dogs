import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';

import Homepage from './components/Homepage/Homepage.js';
import Main from './components/Main/Main.js';
import Dogs from './components/Dogs/Dogs.js'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Homepage /> } />

        <Route path='/home' element={ <Main /> } >
          <Route path='' element={ <Navigate to="dogs" /> } />
          <Route path='dogs' element={ <Dogs /> } />

        </Route>





      </Routes>
    </div>
  );
}

export default App;
