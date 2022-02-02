import React,{useState} from 'react'
import {Card} from 'react-bootstrap'
import {useAuth} from '../../contexts/AuthContext'
import {db} from '../../firebase'
import { doc, getDoc } from "firebase/firestore";


export default function GetResult() {


    
    const[d,setd]=useState({})
    const {currentUser}=useAuth();
    async function handlesubmit(e)
    {
        e.preventDefault();
      //console.log(currentUser.email);
      const docRef = doc(db, "users", currentUser.email);
      const docSnap=await getDoc(docRef);
      if (docSnap.exists()) {
          const data= docSnap.data();
          const rollno=data.rollno;
          const tem=data.teacheremail;
          const docRef1 = doc(db, "info",tem,'attendance', rollno);
          const docSnap1=await getDoc(docRef1);
          if(docSnap1.exists())
          {
              const data1=docSnap1.data()
              //console.log(data1);
              setd(data1)
          }
      }

      
    }

 
 
    return (
        <Card className='w-70 '  bg={'light'} text={'black'}>
        <Card.Body>
        <label> 
        <h2 >Attendance:</h2>
<input type='submit' value='Get Attendance' onClick={handlesubmit} />
        <ul>
           {
               /*
            }*/

            Object.entries(d).map((d )=>{
                if(d[0]!=='roll') 
                {
                    return <li key={d}> {d[0]}:{d[1]} </li>
                }
                return null;
            }
            )  

           }
        </ul>

            
        </label>
        </Card.Body>
        </Card>
    )
}
