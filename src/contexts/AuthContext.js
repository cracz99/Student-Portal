import React,{useContext,useState ,useEffect} from 'react'
import {auth} from '../firebase'
import {createUserWithEmailAndPassword , signInWithEmailAndPassword,sendPasswordResetEmail,updateEmail,updatePassword,signOut} from '@firebase/auth'

const AuthContext=React.createContext()

export function useAuth()
{
    return useContext(AuthContext);
}
export function AuthProvider({children}) {
    const [currentUser,setcurrentUser]=useState();
    const [loading,setLoading]=useState(true);
    function register(email,password)
    {
        
            return createUserWithEmailAndPassword(auth,email, password);
    }
    function login(email,password)
    {
         return signInWithEmailAndPassword(auth,email,password);
    }
    function logout()
    {
        return signOut(auth)
    }
    function resetPassword(email)
    {
        return sendPasswordResetEmail(auth,email);
    }

    function updateemail(email)
    {
       return updateEmail(auth.currentUser,email)
    }
    function updatepassword(password)
    {
        return updatePassword(auth.currentUser,password)
    }

    useEffect(()=>{
       const unsubscribe=auth.onAuthStateChanged(user=>{
            setcurrentUser(user);
            setLoading(false);
            return () => {
                setcurrentUser();
                setLoading(true); 
              };
            
        })
        return unsubscribe;
    },[])
    const value={
        currentUser,
        register,
        login,
        logout,
        resetPassword,
        updateemail,
        updatepassword
    }
    return (
        <div>
            <AuthContext.Provider value={value}>
                {!loading&&children}
            </AuthContext.Provider>
        </div>
    )
}
