//import react from 'react'
//import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
//import {Button} from 'react-bootstrap'
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAuth} from '../../contexts/AuthContext'
//import {storage} from '../../firebase'
//import {ref,uploadBytesResumable} from "firebase/storage";
//import readXlsxFile from 'read-excel-file'
//xlsj=require('xlsx-to-json');
import XLSX from 'xlsx';
import {db} from '../../firebase'
import { doc, setDoc,collection } from "firebase/firestore"; 
import {Card,Alert} from 'react-bootstrap'
//import { useState } from 'react';
import {ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddResults() {
    const {currentUser}=useAuth();
   // const[u,setu]=useState(false);
    function handleupload(e)
    {
     //   setu(true)
        const file=e.target.files[0];   
        console.log(file.name)
        if(file==null)return
        //const storageRef=ref(storage,`/Resource/${currentUser.uid}/${file.name}`)
        //const wb=xlsx.readFile(file.name);
        //const read = new FileReader();
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer( file );
    
        fileReader.onload = ( e ) =>
        {
            const bufferArray = e.target.result;
    
            const wb = XLSX.read( bufferArray, { type: "buffer" } );
    
            const wsname = wb.SheetNames[ 0 ];
    
            const ws = wb.Sheets[ wsname ];
    
            const data = XLSX.utils.sheet_to_json( ws );
            //console.log(data);
            adb(data);
        };
       async function adb(data)
        {
            for(var i=0;i<data.length;i++)
            {
                var rollno=data[i].roll.toString();

                var da=data[i];
                const cref=collection(db,'info',currentUser.email,'result')
                const pref=doc(cref,rollno);
                setDoc(pref,da);
            }
        }
        toast.success('success!', {
            position: "top-center"});
    }
    return (
    <Card className='w-70 '  bg={'light'} text={'black'}>
    <Card.Body>
    <label> 
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
        <input type='file' accept='.xlsx' onChange={handleupload} />
        <span><Alert variant='warning'>(Once Uploaded ,can't Revert)</Alert> </span>
        </label>
    </Card.Body>
    </Card>
    )
}
