import React from 'react';
import {useState,useRef} from 'react';
import {Card,Form,Button,Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
//import {db} from '../firebase'
//import { collection, addDoc } from "firebase/firestore"; 
import {Link,useNavigate} from 'react-router-dom';
import CenteredC from './CenteredC';




export default function Login()
{
    const emailRef=useRef();
    const passRef=useRef();
  /*  const passconfirmRef=useRef();
    const branchtRef=useRef();
    const teacherRef=useRef();
    const branchsRef=useRef();
    const rollRef=useRef();
    const [teacher,teac]=useState(false);
    const[student,stu]=useState(false);*/
    const {login}=useAuth();
    const[error,seterror]=useState('')
    const [loading,setloading]=useState(false)
    const history=useNavigate()

  

    async function handleSubmit(e)
    {
        e.preventDefault();
       console.log('entered here');
        try
        {
            seterror('')
            setloading(true)
            await login(emailRef.current.value,passRef.current.value)
            
                    
                /*catch(e)
                {
                    console.log(e)  
                }   */
                 history('/dashboard')
        } 
        catch(error)
        {
            console.log(error)
            seterror('failed to sign in')
        }
        setloading(false);
       
        
    }
       return( <>
       <CenteredC>
        <Card className='w-70 '  bg={'secondary'} text={'white'}>
            <Card.Body>
                <h1 className='text-center mb-4'>LogIn</h1>
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
                                     
                    <Button disabled={loading} type='submit' className='w-100'>Login</Button>
                </Form>
                <div className='w-100 text-center mt-2'>
                    <Link to='/forgot' style={{ color: '#FFF' }}>Forgot Password?</Link>
                </div>
            </Card.Body>

        </Card>
        <div className='w-100 text-center mt-2'>
            Didnt Register? <Link to='/signup'>Register</Link>
        </div>
        </CenteredC>
        </>

       );   
                    }
