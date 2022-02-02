import React from 'react'
import Navbar from './Navbar'
import {Container} from 'react-bootstrap'
//import AddFolder from './AddFolder'
//import {useFolder} from '../hooks/useFolder'
import CenteredC from '../CenteredC'
/*import AddFile from './AddFile'
import AddResults from './AddResults'
import AddAttendance from './AddResults'*/
import {Card} from 'react-bootstrap'
import GetResult from './GetResult'
import GetAttendance from './GetAttendance'
import GetResource from './GetResource'
export default function CDashboard() {
    //const {folder}=useFolder('K3SVPI7Ol5L5W10bVrNr')

    return (
        <>
        <Navbar/>
        <Container fluid >
            <CenteredC>
                <Card className='w-70 '  bg={'light'} text={'dark'}>
                <Card.Body>
                <GetResult/>
                <GetAttendance/>
                <GetResource/>
                </Card.Body>
                </Card>
            </CenteredC>
           
        </Container>
        </>
    )
}
