import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';



function Detail(props) {

    // Redux
    // let state = useSelector((state) => { return state })
    // let shoes = state.shoes
    // let dispatch = useDispatch()


    let [clothes, setClothes] = useState({});
    let [details, setDetails] = useState([]);
    let [imgUrls, setImgUrls] = useState([]);
    // 탭 상태
    let [tab, setTab] = useState(0);

    // fade 애니메이션
    // let [fade1, setFade1] = useState('');

    // 2초 이내 구매
    // let [eventAlert, setEventAlert] = useState(true)

    let { clothesId } = useParams();

    // 선택된 상품 데이터
    // let selectedShoes = shoes.find(function (item) {
    //     return item.id == clothesId
    // });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/clothes/${clothesId}`)
            .then(result => {
                setClothes(result.data);
            })
            .catch(error => {
                console.log('clothes 로딩 실패', error);
            })

        axios.get(`${process.env.REACT_APP_API_URL}/detail/clothes/${clothesId}`)
            .then(result => {
                setDetails(result.data);
            })
            .catch(error => {
                console.log('detail 로딩 실패', error);
            })

        axios.get(`${process.env.REACT_APP_API_URL}/clothes_images/${clothesId}`)
            .then(result => {
                setImgUrls(result.data);
            })
            .catch(error => {
                console.log('imgurl 로딩 실패', error);
            })
    }, [])

    // 최근 본 상품 추가
    // useEffect(() => {
    //     let a = JSON.parse(localStorage.getItem('watched'))
    //     a.push(selectedShoes.id)
    //     a = new Set(a)
    //     a = Array.from(a)
    //     localStorage.setItem('watched', JSON.stringify(a))

    //     setTimeout(() => { setEventAlert(false) }, 2000)

    //     let t = setTimeout(() => { setFade1('end') }, 100)
    //     return () => {
    //         clearTimeout(t)
    //         setFade1('')
    //     }
    // }, [])


    return (
        // <div className={"container start " + fade1}>
        <div>
            <br></br>
            <Container>
                <Row>
                    <Col md={6} xs={12}>
                        <img src={imgUrls.length > 0 ? imgUrls[0].imageUrl : ''} width="100%" />
                        {/* 추후 캐러셀로 변경 예정 */}
                    </Col>
                    <Col md={6} xs={12} style={{textAlign:'left'}}>
                        <div className="pt-5" style={{ fontSize: '25px', fontWeight: '700' }}>{clothes.name ? clothes.name : '로딩 중...'}</div>
                        <p>{clothes.detail ? clothes.detail : '상세 정보 로딩 중...'}</p>
                        <p>{clothes.price ? `${clothes.price}원` : '가격 로딩 중...'}</p>
                        {
                            details.length > 0
                                ? details.map(function (a, i) {
                                    return <p key={i}>{a.size}</p>;
                                })
                                : <p>사이즈 로딩 중...</p>
                        }
                        <button className="btn btn-danger" onClick={() => {
                            // let item = { id: selectedShoes.id, name: selectedShoes.title, count: 1 }
                            // dispatch(addToCart(item))
                            // alert(item.name + ' 장바구니에 추가되었습니다.')
                        }}>주문하기</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Nav variant="tabs" defaultActiveKey="link0" className="mt-3">
                            <Nav.Item>
                                <Nav.Link eventKey="link0" onClick={() => { setTab(0) }}>상품 정보</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link1" onClick={() => { setTab(1) }}>판매자 정보</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link2" onClick={() => { setTab(2) }}>상품 리뷰</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <TabContent tab={tab} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


function TabContent({ tab }) {

    let [fade2, setFade2] = useState('')
    useEffect(() => {
        let a = setTimeout(() => { setFade2('end') }, 100)

        return () => {
            clearTimeout(a)
            setFade2('')
        }
    }, [tab])

    return (<div className={"start " + fade2}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
    )
}


export default Detail;