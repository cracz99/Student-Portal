import React ,{useState}from 'react'
import {Navbar,Nav,Button} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
//import {Navigate} from 'react-router-dom'


export default function NavbarComponent() {
    const [error,seterror]=useState('')
    const{logout}=useAuth() 
    const history=useNavigate()

    async function handlelogout()
    {
        seterror('')
        try{
           
            await logout()
            history('/')
        }
        catch{
            seterror('failed to logout')    
        }
    }

    return (    
     <Navbar className='flex-direction-row justify-content-around'bg='dark' expand='xxxl' style={{color:'white',minHeight:'10vh'}}>
        <Navbar.Brand as={Link}  to='/dashboard' style={{color:"white"}}>
            Student View
        </Navbar.Brand>
    <Nav className='d-flex flex-row justify-content-around w-100'>
        <Nav.Link as={Link}   to='/user' style={{color:"white"}}> 
        <Button variant='link' style={{textDecoration:'none',color:'white'}}>Profile</Button> 
        </Nav.Link>
        
        <Nav.Link style={{color:"white"}}> 
            <Button variant='link' style={{textDecoration:'none',color:'white'}}onClick={handlelogout}>Logout {error}</Button> 
        </Nav.Link>
    </Nav>
     </Navbar>
    )
}
