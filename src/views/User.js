import React from 'react';
import {useState,useRef} from 'react';
import {Card,Form,Button,Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
//import {db} from '../firebase'
//import { collection, addDoc } from "firebase/firestore"; 
import {Link,useNavigate} from 'react-router-dom';
import CenteredC from './CenteredC';
 



export default function User()
{
    const emailRef=useRef();
    const passRef=useRef();
   const passconfirmRef=useRef();
   const[error,seterror]=useState('')
   const [loading,setloading]=useState(false)
  /*  const branchtRef=useRef();
    const teacherRef=useRef();
    const branchsRef=useRef();
    const rollRef=useRef();
    const [teacher,teac]=useState(false);
    const[student,stu]=useState(false);*/
    const {currentUser,updatepassword}=useAuth();

    const history=useNavigate()

  

  function handleSubmit(e)
    {
        e.preventDefault();
        if(passRef.current.value!==passconfirmRef.current.value)
        {
            return seterror('pass dont match');
        }
        
        const promises=[]
        setloading(true)
        seterror('')
        if(passRef.current.value)
        {
            promises.push(updatepassword(passRef.current.value));
        }
        Promise.all(promises).then(()=>{
            history('/dashboard');
        }).catch(()=>{
            seterror('failed to update account')
        }).finally(()=>{
            setloading(false)
        })     
    }
       return( <>
       <CenteredC>
        <Card className='w-70 '  bg={'secondary'} text={'white'}>
            <Card.Body>
                <h1 className='text-center mb-4'>Update Profile</h1>
                {error && <Alert variant='danger'>{error}</Alert> }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'className='mb-4'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='email' ref={emailRef}  defaultValue={currentUser.email} disabled/>
                    </Form.Group>
  
                    <Form.Group id='password' className='mb-4'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' ref={passRef} placeholder='leave blank /update' />
                    </Form.Group>
                    <Form.Group id='passconfirm' className='mb-4'>
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type='password' ref={passconfirmRef} placeholder='leave blank /update' />
                    </Form.Group>
                    <Button disabled={loading} type='submit' className='w-100'>Update</Button>
                </Form>
                <div className='w-100 text-center mt-2'>
                    <Link to='/dashboard' style={{ color: '#FFF' }}>Cancel</Link>
                </div>
            </Card.Body>

        </Card>
        </CenteredC>
        </>

       );   
                    }
