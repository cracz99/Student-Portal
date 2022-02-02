import React from 'react'
import Navbar from '../Navbar'
import {Container} from 'react-bootstrap'
//import AddFolder from './AddFolder'
//import {useFolder} from '../hooks/useFolder'
import CenteredC from '../CenteredC'
import AddFile from './AddFile'
import AddResults from './AddResults'
import AddAttendance from './AddAttendance'
import {Card} from 'react-bootstrap'

export default function TDashboard() {
    //const {folder}=useFolder('K3SVPI7Ol5L5W10bVrNr')

    return (
        <>
        <Navbar/>
        <Container fluid >
            <CenteredC>
                <Card className='w-70 '  bg={'light'} text={'dark'}>
                <Card.Body>
                <h2 >Upload Results:</h2>
                <AddResults/>
                <h2>Upload Attendance:</h2>
                <AddAttendance/>
                <h2>Upload Resource:</h2>
                <AddFile/>
                </Card.Body>
                </Card>
            </CenteredC>
           
        </Container>
        </>
    )
}
