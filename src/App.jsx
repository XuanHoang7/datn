import './App.css'
import Login from './Components/LoginSignup/Login.jsx'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Signup from "./Components/LoginSignup/Signup.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
