import React,{useState} from 'react'
import {Card} from 'react-bootstrap'
import {useAuth} from '../../contexts/AuthContext'
import {db} from '../../firebase'
import { doc, getDoc } from "firebase/firestore";
import {storage} from '../../firebase'
import {ref,listAll  } from "firebase/storage";
export default function GetResource() {
  const{currentUser}=useAuth();
   const[items,setitems]=useState([]);
  // const[path,setpath]=useState('');
   const[url,seturl]=useState('');
    async function handlesubmit(e)
    {
        e.preventDefault();
      //console.log(currentUser.email);
      
     //const cref=collection(db,'info',currentUser.email)
     // const te=currentUser.email;

      const docRef1 = doc(db, "users", currentUser.email);
      const docSnap1=await getDoc(docRef1);
      if (docSnap1.exists()) {
          const data= docSnap1.data();
          const tem=data.teacheremail;
      
    
      const docRef = doc(db, "info", tem);
      const docSnap=await getDoc(docRef);
      if (docSnap.exists()) {
         //  const te=currentUser.teacheremail
          const data= docSnap.data();  
          const listRef = ref(storage, 'Resource/'+tem);
          listAll(listRef).then((res)=>{
              console.log(res.items)
       
              setitems(res.items.reverse())
              
            })

              console.log(data.u);  
              
              seturl(data.u)/*for(var i=0;i<data.u.length;i++)
              {
                seturl(data.u[i]);
              } */ 

            }
        
          }
      }
      
      function par(x)
      {
        var c=x.slice(x.lastIndexOf('/')+1,x.length);
        //console.log(x,c);
        return c;
      }
   


  //u(item._location.path)
  //url.map((item)=>{ return <ul key={item}><li ><a href={item} rel="noreferrer" target="_blank">x</a></li></ul>})
    return (
        <Card className='w-70 '  bg={'light'} text={'black'}>
        <Card.Body>
        <label> 
        <h2 > Get Resources:</h2>
        <input type='submit' value='Get Resources' onClick={handlesubmit} />
        
          {
            //items.forEach((item)=>{<h1>item._location.path</h1>})
            /*items.map((item)=>{ return <ul key={item}><li ><a href={url} rel="noreferrer" target="_blank">{par(item._location.path)}</a></li></ul>})*/
            items.map(function(v,i)
            {
              return <ul key={i}><li ><a href={url[i]} rel="noreferrer" target="_blank">{par(v._location.path)}</a></li></ul>
            })

          }
          
        </label>
        </Card.Body>
        </Card>
    )
}
