import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import {AuthContextProvider} from './Components/Firebase/AuthContext';
import Contact from './Components/Contact/Contact'; 
import Feedback from "./Components/Feedback/Feedback";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { useState } from "react";

const RoutePath = ({ isEnterPrsd, setIsEnterPrsd, searchText, setSearchText }) =>

  useRoutes([
    { path: "/", element: <Home isEnterPrsd = {isEnterPrsd} setIsEnterPrsd = {setIsEnterPrsd} searchText = {searchText} setSearchText = {setSearchText}/> },
    { path: "/home", element: <Home isEnterPrsd = {isEnterPrsd} setIsEnterPrsd = {setIsEnterPrsd} searchText = {searchText} setSearchText = {setSearchText}/> }, 
    { path: "/contact", element: <Contact/> },
    { path: "/feedback", element: <Feedback /> }
  ]);
 
function App() {
  
  const [isEnterPrsd, setIsEnterPrsd] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    
      <AuthContextProvider>
        <Router> 
          <NavBar isEnterPrsd = {isEnterPrsd} setIsEnterPrsd = {setIsEnterPrsd} searchText = {searchText} setSearchText = {setSearchText}/> 
          <RoutePath isEnterPrsd = {isEnterPrsd} setIsEnterPrsd = {setIsEnterPrsd} searchText = {searchText} setSearchText = {setSearchText}/>
        </Router>
      </AuthContextProvider>
  );
}

export default App;
