import Cookies from "js-cookie"
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

interface AuthContextProps {
    isLoggedIn:boolean,
    login:()=>void,
    logout:()=>void
}
const AuthContext = createContext<{
    isLoggedIn:boolean,
    login:()=>void,
    logout:()=>void
}>({
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{}
});



export  const Authprovider:React.FC<PropsWithChildren<{}>> =({children}) =>{
    const [isLoggedIn,setLoggedIn] = useState<boolean>(false);
    const login = async ()=>{
        setLoggedIn(true)
    }
    const logout = async() =>{
        Cookies.remove("token")
        setLoggedIn(false);
    }
    useEffect(()=>{
       const tokenExists  =  !!Cookies.get('token') 
       if (tokenExists) {
           setLoggedIn(true)
       }else {
        setLoggedIn(false)
       }
    },[])
          return (
            <AuthContext.Provider value={{isLoggedIn,login,logout}}>
                {children}
            </AuthContext.Provider>
          )
}

export const useAuth = ():AuthContextProps =>{
    return useContext(AuthContext)
}

