import { lazy, Suspense, useEffect, useState } from "react";
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'
import { useQuery } from "react-query";
import Main from "./pages/Main.js";
import ItemList from "./pages/ItemList.js";

const Cart = lazy(() => import('./pages/Cart.js'));
const Detail = lazy(() => import('./pages/Detail.js'));

function App() {

  // 최근 본 상품 초기화
  useEffect(() => {
    let a = JSON.parse(localStorage.getItem('watched'))

    if (a == null || a.length === 0) {
      localStorage.setItem('watched', JSON.stringify([]))
    }

  }, [])

  let recentItemId = JSON.parse(localStorage.getItem('watched'))


  let navigate = useNavigate();

  // 서버에서 유저 정보 가져오기
  let user = useQuery('user', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      return a.data
    })
  })

  return (
    <div className="App" >

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/about') }}>회사정보</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>장바구니</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>로그인</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>마이페이지</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {user.isLoading && '로딩중'}
            {user.error && '에러!'}
            {user.data && user.data.name} 님 환영합니다.
          </Nav>
        </Container>
      </Navbar>

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/about') }}>브랜드</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>품목별</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>신상품</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>인기상품</Nav.Link>
            <Nav.Link onClick={() => { navigate('/itemlist') }}>상품목록 확인</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중.......</div>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<div>없는 페이지입니다.</div>} />
          <Route path="/about" element={<About />} >
            <Route path="member" element={<div> 멤버 페이지입니다. </div>} />
            <Route path="location" element={<div> 위치정보 페이지입니다. </div>} />
          </Route>
          <Route path="itemlist" element={<ItemList />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </Suspense>

      <div className="col-md-3 recent-items">
        <h5>최근 본 상품</h5>
        {recentItemId && recentItemId.length > 0 ? (
          <div>
            {recentItemId.map(function (a, i) {
              return (
                <div key={i}>
                  <img src={process.env.PUBLIC_URL + '/img/shoes' + (recentItemId[i] + 1) + '.jpg'} alt={`Shoe ${recentItemId[i] + 1}`} style={{ width: '100%', cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/detail/${recentItemId[i]}`)
                    }} />
                </div>
              );
            })}
          </div>
        ) : (
          <p>최근 본 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사 정보 페이지입니다.</h4>
      <Outlet></Outlet>
    </div>
  )
}



export default App;
