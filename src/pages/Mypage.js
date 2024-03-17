import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, useNavigate } from 'react-router-dom';


function Mypage(props) {

    let [userData, setUserData] = useState('호날두');

    let navigate = useNavigate();


    const alertClicked = () => {
      alert('You clicked the third ListGroupItem');
    };

    return(
        <div>
            
            <br /> <br />
            {/* <hr style={{ border: '0', height: '2px', backgroundColor: '#333'}} /> */}

            <Container>
              <Row>
                <Col><h1 style={{ fontSize: '30px', fontWeight: '700' }}>마이페이지</h1>
                <br/><br/></Col>
              </Row>
              <Row>
                <Col xs={2} md={2}>
                {/* <table style={{border:'none', fontSize: '18px', fontWeight: '500' }}>
                  <tr>
                    <td>주문/배송 조회</td>
                  </tr>
                  <tr>
                  <td>회원정보 수정</td>
                  </tr>
                  <tr>
                    <td>회원 탈퇴</td>
                  </tr>
                </table> */}
                <ListGroup defaultActiveKey="#link1">
                  <ListGroup.Item action href="#link1">
                    주문/배송 조회
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link2">
                    회원정보 수정
                  </ListGroup.Item>
                  <ListGroup.Item action onClick={()=>{navigate('/mypage/deleteCustomer')}} style={{color:'red'}}>
                    회원 탈퇴
                  </ListGroup.Item>
                </ListGroup>

                  
                </Col>
                <Col xs={10} md={10}>
                  {/* <Image src={process.env.PUBLIC_URL + '/img/ronaldo.jpg'} style={{ width: '170px', height: '170px', borderRadius: '50%' }} roundedCircle />
                  <h1 style={{ fontSize: '20px', fontWeight: '500' }}>홍길동 님<br /> qwer@hansung.ac.kr</h1>
                  <br />
                  <h1 style={{ fontSize: '20px', fontWeight: '500' }}>첫 구매하고 포인트 받으세요!</h1>

                  <br />
                  <Button variant="primary">회원정보 수정</Button>{' '}
                  <Button variant="danger">회원탈퇴</Button>{' '} */}
                  <Outlet></Outlet>
                </Col>
              </Row>
            </Container>
            
        </div>
    )
}

export default Mypage;