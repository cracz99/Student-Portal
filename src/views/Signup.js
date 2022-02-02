import React ,{useRef} from 'react';
import {useState} from 'react';
import {Card,Form,Button,Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {db} from '../firebase'
import { setDoc,doc } from "firebase/firestore"; 
import {Link,useNavigate} from 'react-router-dom';
import CenteredC from './CenteredC';



export default function Signup()
{
    const emailRef=useRef();
    const passRef=useRef();
    const passconfirmRef=useRef();
    const branchtRef=useRef();
    const teacherRef=useRef();
    const branchsRef=useRef();
    const TeRef=useRef();
    const rollRef=useRef();
    const [teacher,teac]=useState(false);
    const[student,stu]=useState(false);
    const {register}=useAuth();
    const[error,seterror]=useState('')
    const [loading,setloading]=useState(false)
    //const [suc,sucfn]=useState(false)
    const history=useNavigate()
    //const {currentUser}=useAuth();  

  
    async function  a()
    {
        try
        {
        register(emailRef.current.value,passRef.current.value)
        if(student )
        { try {
         const data={
             email:emailRef.current.value,
             branch:branchsRef.current.value
             ,rollno:rollRef.current.value,
             teacheremail:TeRef.current.value
         };

         await setDoc(doc(db, "users",emailRef.current.value), data);
         history('/')
         
         //console.log("Document written with ID: ", docRef.id);
       } catch (e) {
         console.error("Error adding document: ", e);
       }  
     }      
     else if(teacher)
     {
         try {

             const data={
                 email:emailRef.current.value,
                 branch:branchtRef.current.value
                 ,teacherid:teacherRef.current.value
             };
             await setDoc(doc(db, "users",emailRef.current.value), data);
             history('/')
             
             //console.log("Document written with ID: ", docRef.id);
             
           } catch (e) {
             console.error("Error adding document: ", e);
           }
        }
    }
        catch(e)
        {
            console.log(e)
        }
       
              
        }
    

    async function handleSubmit(e)
    {
        e.preventDefault();
        if(passRef.current.value!==passconfirmRef.current.value)
        {
            return seterror('pass dont match');
        }
        try
        {
            seterror('')
            setloading(true)

         await a()
        // sucfn(true)
        }
        catch(error)
        {
            console.log(error)
            seterror('failed to create acc')
        }
        setloading(false);
        
    
    }



    function disteach()
    {
        if(student===true)
        {
            stu(!student)
        }
        teac(!teacher)

    }


    function disstu()
    {
        if(teacher===true)
        {
            teac(!teacher)
        }
        stu(!student)
    }


       return( <>
       <CenteredC>
        <Card className='w-70 '  bg={'secondary'} text={'white'}>
            <Card.Body>
                <h1 className='text-center mb-4'>Register</h1>
                {error && <Alert variant='danger'>{error}</Alert> }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'className='mb-4'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group>
  
                    <Form.Group id='password' className='mb-4'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' ref={passRef} required/>
                    </Form.Group>
                    <Form.Group id='passconfirm' className='mb-4'>
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type='password' ref={passconfirmRef} required/>
                    </Form.Group>
                                     
                   <Form.Group className='mb-4'>
                       {
                           ['radio'].map((type)=>(
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                              inline
                              label="Teacher"
                              name="group1"
                              type={type}
                              id={`inline-${type}-1`}
                              onClick={disteach}
                            />
                            
                            <Form.Check
                              inline
                              label="Student"
                              name="group1"
                              type={type}
                              id={`inline-${type}-2`}
                              onClick={disstu}
                            />
                            </div>
                           ))
                       }
                   </Form.Group>
                   {teacher?
                    <div>
                        <Form.Group id='teacherid' className='mb-4'>
                            <Form.Label>Teacher Id:</Form.Label>
                            <Form.Control type='text' ref={teacherRef} required/>
                        </Form.Group>
                    <Form.Group id='brancht' className='mb-4'>
                        <Form.Label>Branch:</Form.Label>
                        <Form.Control type='text' ref={branchtRef} required/>
                    </Form.Group>
                   </div>:null}
                   {student?  
                    <div>
                        <Form.Group id='rollno' className='mb-4'>
                            <Form.Label>Rollno:</Form.Label>
                            <Form.Control type='text' ref={rollRef} required/>
                        </Form.Group>
                        <Form.Group id='branchs' className='mb-4'>
                            <Form.Label>Branch:</Form.Label>
                            <Form.Control type='text' ref={branchsRef} required/>
                        </Form.Group>
                        <Form.Group id='temail' className='mb-4'>
                            <Form.Label>Teacher Email:</Form.Label>
                            <Form.Control type='text' ref={TeRef} required/>
                        </Form.Group>
                        </div>:null}

                    <Button disabled={loading} type='submit' className='w-100'>Register</Button>
                </Form>
            </Card.Body>

        </Card>
        <div className='w-100 text-center mt-2'>
            Registered? <Link to='/'>Log In</Link>
        </div>
        </CenteredC>
        </>

       );   
                    }
