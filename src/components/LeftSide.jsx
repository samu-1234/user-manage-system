import React from 'react';
import {Col, Row,Image} from 'react-bootstrap'
import Singup from './Singup';

function LeftSide() {
  return (
    <div className='container'>
        <Row className='landing'>
        <Col>
         <Image src='./img/bg.jpg' thumbnail style={{border:"none"}} />
        </Col>
        <Col><Singup/></Col>
        </Row>

    </div>

  )
}

 export default LeftSide
