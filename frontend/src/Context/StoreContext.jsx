import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const StoreContext = createContext();
const StoreContextProvider = ({children}) => {
    // const url = "http://localhost:4003" ; 
    const url = "https://tinytrack.onrender.com" ; 
    const [isAuthenticated , setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setIsAuthenticated(true);
            navigate("/dashboard");
        }
    },[]);

  



    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        navigate('/dashboard');
    }

    const logout = () => {
      localStorage.removeItem("mainUrl");
      localStorage.removeItem("shortId");
      localStorage.removeItem("shortUrl");
      localStorage.removeItem("token");
      navigate("/login");
      setIsAuthenticated(false);
    };
  

    const contextValue = {
        url,
        login, 
        logout,
        isAuthenticated
    };

  return (
   <StoreContext.Provider value={contextValue}>
    {children}
   </StoreContext.Provider>
  )
}

export default StoreContextProvider