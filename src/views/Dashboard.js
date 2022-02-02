import React,{useState,useEffect} from 'react'
import {useAuth} from '../contexts/AuthContext';
import {db} from '../firebase'
import { doc, getDoc } from "firebase/firestore";
import TDashboard from './teacher/Dashboard'
import CDashboard from './student/Dashboard'

export default function Dashboard() {
    const {currentUser}=useAuth();
    const[t,sett]=useState('')
    //checking db
   useEffect(() => {
    async function checkdb()
    {
       try
       { 
           //console.log(currentUser.email);
     const docRef = doc(db, "users", currentUser.email);
     const docSnap=await getDoc(docRef);
     if (docSnap.exists()) {
         const data= docSnap.data();
         //console.log(data)
         if(data.teacherid===undefined)
             {
                sett('f')
                
             } 
            else
            {
                sett('t')
            }
       } 
       //console.log(t)
    }
    catch(e)
    {
        console.log(e);
    }
    }
    checkdb();
   }, [t,currentUser]) 
     
   if(t==='')
   {
       return <h1>Loading..............</h1>
   }
   else 
   {
       if(t==='f')
   {
    return <CDashboard/>
   }
   else if(t==='t')
   {
      
       return <TDashboard/>
   }
}
   /*return(
       t?<TDashboard/>:null
   )
*/
}
