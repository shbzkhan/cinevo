import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from 'nativewind'



const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
  const {colorScheme, toggleColorScheme} = useColorScheme()


    //currentUser is tempropry
    const currentUser = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
      
          console.log("Stored Token:", token); // Debugging: Ensure token is correctly retrieved
      
          const response = await fetch(`${process.env.EXPO_PUBLIC_MONGODB}/tokenverify`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
      
          const data = await response.json();
      
          if (response.ok) {
            console.log("User Data:", data.user);
            setUser(data.user)
            setIsLoggedIn(true)
            
            
          } else {
            console.log("Error:", data.error);
            setIsLoggedIn(false)
            setUser(null)
          }
        } catch (error) {
          console.log("Fetch error:", error);
          setIsLoggedIn(false)
        } finally{
            setIsLoading(false)
        }
      };
    useEffect(()=>{
        currentUser()
    }, [])
return(
    <GlobalContext.Provider
    value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        colorScheme,
        toggleColorScheme,
    }}
    >
        {children}
    </GlobalContext.Provider>
    )
}

export default GlobalProvider;