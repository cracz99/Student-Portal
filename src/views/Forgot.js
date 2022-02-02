import React ,{useRef} from 'react';
import {useState} from 'react';
import {Card,Form,Button,Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
//import {db} from '../firebase'
//import { collection, addDoc } from "firebase/firestore"; 
import {Link,} from 'react-router-dom';
import CenteredC from './CenteredC';




export default function Forgot()
{
    const emailRef=useRef();
    const {resetPassword}=useAuth();
    const[error,seterror]=useState('')
    const [loading,setloading]=useState(false)
    //const history=useNavigate()
    const[message,setMessage]=useState('')
  

    async function handleSubmit(e)
    {
        e.preventDefault();
       console.log('entered here');
        try
        {
            setMessage('')
            seterror('')
            setloading(true)
      //          await login(emailRef.current.value,passRef.current.value)
                await resetPassword(emailRef.current.value)
            setMessage('Instructions sent to mail,Please check');
        } 
        catch(error)
        {
            console.log(error)
            seterror('failed to Reset Password')
        }
        setloading(false);
       
        
    }
       return( <>
       <CenteredC>
        <Card className='w-70 '  bg={'secondary'} text={'white'}>
            <Card.Body>
                <h1 className='text-center mb-4'>Password Reset</h1>
                {error && <Alert variant='danger'>{error}</Alert> }
                {message && <Alert variant='success'>{message}</Alert> }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'className='mb-4'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group>

                    <Button disabled={loading} type='submit' className='w-100'>Reset Password</Button>
                </Form>
                <div className='w-100 text-center mt-2' >
                    <Link to='/' style={{ color: '#FFF' }} >Login</Link>
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
