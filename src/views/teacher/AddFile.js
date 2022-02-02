import React from 'react'
//import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
//import {Button} from 'react-bootstrap'
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAuth} from '../../contexts/AuthContext'
import {storage} from '../../firebase'
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { doc,collection,arrayUnion,updateDoc,setDoc,getDoc} from "firebase/firestore"; 
import {db} from '../../firebase'
import {Card,Alert} from 'react-bootstrap'
import {ToastContainer ,toast } from 'react-toastify';

export default function AddFile() {
    const {currentUser}=useAuth();
   async function handleupload(e)
    {
        const file=e.target.files[0];
        if(file==null)return
        const storageRef=ref(storage,`Resource/${currentUser.email}/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',(snapshot) => {
            console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        })
        setTimeout(async() => {
          uploadTask.then( await getDownloadURL(ref(storage,`Resource/${currentUser.email}/${file.name}` ))
          .then(async(url) => {
            console.log(url);
            const cref=collection(db,'info')
                const pref=doc(cref,currentUser.email);
                const docSnap= await getDoc(pref);
              if (docSnap.exists()) {
                await updateDoc(pref,{
                    u:arrayUnion(url)
                });
              }
              else
              {
                await  setDoc(pref,{
                  u:''
                })
              
                await updateDoc(pref,{
                  u:arrayUnion(url)
              })


            }
                
          })
          .catch((error) => {
            // Handle any errors
          })
               )
        }, 25000);
  
  /*const cref=collection(db,'info',currentUser.email,'attendance')
  const pref=doc(cref,rollno);
  */
        toast.success('success!', {
            position: "top-center"});
    }
    return (
       
            <Card className='w-70 '  bg={'light'} text={'black'}>
            <Card.Body>
            <ToastContainer
    position="top-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
            <label> 
                
                <input type='file'  onChange={handleupload} multiple/>
                <span><Alert variant='warning'>(Once Uploaded ,can't Revert)</Alert> </span>
            </label>
            </Card.Body>
            </Card>
    )
}
