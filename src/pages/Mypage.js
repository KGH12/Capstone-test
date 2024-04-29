import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function Mypage(props) {

  let dispatch = useDispatch()
  let navigate = useNavigate();
  let { userInfo, isLoggedIn } = useSelector((state) => state.user);
  let [currentPage, setCurrentPage] = useState('마이페이지');


  // 로그인하지 않은 상태라면 로그인 페이지로 리디렉션
  useEffect(() => {
    if (!isLoggedIn || !userInfo) {
      return; // 로그인 상태나 sellerInfo가 유효하지 않은 경우 early return을 사용
    }
    if (!isLoggedIn) {
      // 로그인하지 않은 상태라면 로그인 페이지로 리디렉션
      alert('로그인 후 이용해주세요.')
      navigate('/login');
    }
  }, [isLoggedIn, userInfo]);

  return (
    <div>

      <br /> <br />
      {/* <hr style={{ border: '0', height: '2px', backgroundColor: '#333'}} /> */}

      <Container>
        <Row>
          <Col><h1 style={{ fontSize: '30px', fontWeight: '700' }}>{currentPage}</h1>
            <br /><br /></Col>
        </Row>
        <Row>
          <Col xs={12} md={2}>
            <ListGroup style={{ marginBottom: '20px' }}>
              {/* defaultActiveKey="#link1" */}
              <ListGroup.Item action onClick={() => {
                navigate('/Mypage/orderDeliveryStatus')
                setCurrentPage('주문/배송 조회')
              }}
                href="#link1">
                주문/배송 조회
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => {
                navigate('/mypage/updateCustomer')
                setCurrentPage('회원정보 수정')
              }}>
                회원정보 수정
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => {
                navigate('/mypage/deleteCustomer')
                setCurrentPage('회원 탈퇴')
              }} style={{ color: 'red' }}>
                회원 탈퇴
              </ListGroup.Item>
            </ListGroup>
            <div style={{ height: '2px', backgroundColor: 'gray', marginBottom: '20px' }}></div>
          </Col>
          <Col xs={12} md={10}>
            <Outlet></Outlet>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Mypage;