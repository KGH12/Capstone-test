import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouseImage';
import CardItem from './CardItem';
import { Container, Row } from 'react-bootstrap';
import './../App.css';
import styled from 'styled-components'
import { useEffect, useState } from "react";


import { useNavigate } from 'react-router-dom';
import axios from 'axios';

let RankingButton = styled.button`
    background : white;
    color : ${props => props.isActive ? 'black' : 'grey'};
    font-size: 18px;
    font-weight: 700;
    padding: 0px 20px 0px 20px;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
    text-decoration: ${props => props.isActive ? 'underline' : 'none'};

    &:hover {
        color: black;
        text-decoration: underline;
      }
`

function Main(props) {

    const [maleBestProducts, setMaleBestProducts] = useState([]);
    const [femaleBestProducts, setFemaleBestProducts] = useState([]);
    const [maleNewProducts, setMaleNewProducts] = useState([]);
    const [femaleNewProducts, setFemaleNewProducts] = useState([]);

    // 상품 데이터를 가져오고 정렬하는 함수
    const fetchAndSortProducts = async (gender, sortType) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/clothes?gender=${gender}`);
            const sortedResponse = await axios.put(`${process.env.REACT_APP_API_URL}/clothes/sort/${sortType}`, response.data);
            return sortedResponse.data;
        } catch (error) {
            console.error(`Failed to fetch or sort products: ${error}`);
            // 여기에서 사용자에게 에러 상황을 알리는 UI 처리를 할 수 있습니다.
            return [];
        }
    }

    useEffect(() => {
        const initProducts = async () => {
            setMaleBestProducts(await fetchAndSortProducts(0, 1) || []);
            setFemaleBestProducts(await fetchAndSortProducts(1, 1) || []);
            setMaleNewProducts(await fetchAndSortProducts(0, 2) || []);
            setFemaleNewProducts(await fetchAndSortProducts(1, 2) || []);
        }
        initProducts();
    }, []);


    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    let navigate = useNavigate();

    let [loading, setLoading] = useState(false);


    let [bestTap, setBestTap] = useState(0); // 클릭한 인기 카테고리
    let [newTap, setNewTap] = useState(0); // 클릭한 랭킹 카테고리

    return (
        <div>
            {/* <div className="main-bg" style={{ backgroundImage: 'url(' + bg + ')', marginBottom: '20px' }}></div> */}
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item interval={3000}>
                    <ExampleCarouselImage text="First slide" productName='main1' />
                    <Carousel.Caption>
                        {/* <h3 style={{ fontSize:'32px', fontFamily:'Pretendard,sans-serif', fontWeight:'700'}}>페스티벌을 더욱 화려하게 즐기는 방법</h3> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <ExampleCarouselImage text="Second slide" productName='main2' />
                    <Carousel.Caption>
                        {/* <h3 style={{ fontSize:'32px', fontFamily:'Pretendard,sans-serif', fontWeight:'700'}}>MD가 추천하는 주간 PICK!</h3> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <ExampleCarouselImage text="Third slide" productName='main3' />
                    <Carousel.Caption>
                        {/* <h3 style={{ fontSize:'32px', fontFamily:'Pretendard,sans-serif', fontWeight:'700'}}>FILA 인기 상품 할인중!</h3> */}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <br /> <br /> <br />


            {/* 인기상품 */}
            <h1 style={{ fontSize: '30px', fontWeight: '700' }}>인기상품</h1>
            <br />

            <RankingButton onClick={() => { setBestTap(0) }} isActive={bestTap === 0}>남성 의류</RankingButton>
            <RankingButton onClick={() => { setBestTap(1) }} isActive={bestTap === 1}>여성 의류</RankingButton>
            <br></br>
            <RankingConTent products={(bestTap === 0 ? maleBestProducts : femaleBestProducts).slice(0, 12)} />
            <br></br>


            {/* 여기부터 신상품 */}

            <br />
            <br />
            <br />
            <h1 style={{ fontSize: '30px', fontWeight: '700' }}>신상품</h1>
            <br />



            <RankingButton onClick={() => { setNewTap(0) }} isActive={newTap === 0}>남성 의류</RankingButton>
            <RankingButton onClick={() => { setNewTap(1) }} isActive={newTap === 1}>여성 의류</RankingButton>
            <br></br>
            {/* <RankingConTent ranking={newTap}></RankingConTent> */}
            <RankingConTent products={(newTap === 0 ? maleNewProducts : femaleNewProducts).slice(0, 12)} />

            <br></br>

        </div>
    )
}

function RankingConTent({ products }) {
    let navigate = useNavigate();
    const safeProducts = products || [];
    return (
        <Container>
            <Row>
                {safeProducts.length > 0 ? (
                    safeProducts.slice(0, 12).map((product, index) => (
                        <CardItem products={product} key={product.clothesId} alt={product.name} navigate={navigate}></CardItem>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </Row>
        </Container>
    );
}

export default Main;