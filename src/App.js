import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Intro from "./Scenes/Intro"
import Tema_1_figuras from "./Scenes/Tema_1_Figuras"

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path='/' element={<Intro/>}></Route>
          <Route path='/tema_1' element={<Tema_1_figuras/>}></Route>
      </Routes>
    </Router>
)}

export default App;
