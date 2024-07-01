import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from "./Home.jsx"
import AddMeme from "./AddMeme.jsx"
import ViewMeme from "./ViewMeme.jsx"
import './index.css'
import {BrowserRouter,Router,Route,Routes} from "react-router-dom";
import AddStudyMaterial from './AddStudyMaterial.jsx'
import ViewStudyMaterial from './ViewStudyMaterial.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
     <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMeme/>} />
        <Route path="/view" element={<ViewMeme/>} />
        <Route path="/addstudy" element={<AddStudyMaterial/>} />
        <Route path="/viewstudy" element={<ViewStudyMaterial/>} />
        
      </Routes>
      </BrowserRouter>
  </React.StrictMode>,

)
