import { lazy, Suspense, useEffect, useState } from "react";
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './../App.css';
import bg from './../img/bg.png';
import data from './../data.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useQuery } from "react-query";
import { setShoes } from './../store.js'

function ItemList(props) {

    // Redux
    let shoes = useSelector((state) => { return state.shoes })
    let dispatch = useDispatch()


  // 상품 state
  // data.js 에서 state 초기화
  // let [shoes, setShoes] = useState(data)


  // 더보기 버튼 카운트
  let [btnCount, setBtnCount] = useState(0);

  // 더보기 로딩
  let [loading, setLoading] = useState(false);

  let navigate = useNavigate();

    return (
        <div>
            <div className="main-bg" style={{ backgroundImage: 'url(' + bg + ')' }}></div>

            <Container>
              <Row>
                {
                  shoes.map(function (a, i) {
                    return (
                      <Carditem shoes={shoes[i]} index={i} key={i} navigate={navigate}></Carditem>
                    )
                  })
                }
              </Row>
            </Container>

            {/* 더보기 버튼 처음 누르면 "https://codingapple1.github.io/shop/data2.json", 
            "https://codingapple1.github.io/shop/data3.json" 서버에서 데이터를 가져옴 */}
            {(btnCount < 2)
              ?
              <div>
                {loading && <p>@@ 로딩중입니다 @@</p>}
                <button onClick={() => {
                  setLoading(true);
                  axios.get('https://codingapple1.github.io/shop/data' + (btnCount + 2) + '.json')
                    .then((result) => {
                      setLoading(false);
                      let copy = [...shoes, ...result.data];
                      dispatch(setShoes(copy));
                      setBtnCount(btnCount + 1);
                    })
                    .catch(() => {
                      setLoading(false);
                      console.log('데이터 가져오기 실패')
                    })
                }}>더보기</button>
              </div>
              : null
            }
          </div>
    )
}


function Carditem(props) {
    return (
      <Col md={4} onClick={() => { props.navigate('/detail/' + props.index) }}>
        <img src={process.env.PUBLIC_URL + '/img/shoes' + (props.index + 1) + '.jpg'} width="80%" />
        <h4> {props.shoes.title} </h4>
        <p> {props.shoes.price}원 </p>
      </Col>
    )
  }

export default ItemList;