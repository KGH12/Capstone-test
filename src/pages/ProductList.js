import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Hidden } from "react-grid-system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




function ProductItem(props) {

    // let dispatch = useDispatch();
    // let { userInfo, isLoggedIn } = useSelector((state) => state.user);

    return (
        <div style={{ fontSize: '18px', fontWeight: '600' }}>
            <Row>

                <Col md={{ span: 1, offset: 1 }}>
                    <img style={{ width: '100px', height: '132px' }} src={props.item.imageUrl} alt={props.item.name} />
                </Col>
                <Col md={7}>
                    <div>
                        <div>{props.item.name}</div>
                        {props.item.genderCategory == 0 ? <div>성별 : 남자</div> :
                            props.item.genderCategory == 1 ? <div>성별 : 여자</div> :
                                <div>성별 : 성별무관</div>}
                        <div> 대분류 : {props.categories.majors[props.item.majorCategoryId] || 'Loading...'} </div>
                        <div> 소분류 : {props.categories.subs[props.item.subCategoryId] || 'Loading...'} </div>
                    </div>
                </Col>
                <Col md={1} style={{ marginTop: '12px', whiteSpace: 'nowrap', fontSize: '17px', fontWeight: '700' }}  >
                    <span>{props.item.price ? props.item.price.toLocaleString() : '0'}원</span>
                </Col>
                <Col md={1} style={{ marginTop: '12px', whiteSpace: 'nowrap', fontSize: '17px', fontWeight: '700' }}  >
                    <Button variant="dark" style={{ fontWeight: '700' }} onClick={() => { props.navigate(`/seller/productedit/${props.item.clothesId}`) }}>상품 수정</Button>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <hr style={{ border: 0, height: '2px', background: 'gray' }} />
                </Col>
            </Row>

        </div>
    )
}



function ProductList(props) {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { sellerInfo, isLoggedIn } = useSelector((state) => state.seller);
    let [productItems, setProductItems] = useState([]);

    const [categories, setCategories] = useState({ majors: {}, subs: {} }); // 모든 카테고리 정보 저장.


    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         alert('로그인 후 이용해주세요.');
    //         navigate('/seller/login');
    //     } else {
    //         axios.get(`${process.env.REACT_APP_API_URL}/clothes/seller/${sellerInfo.email_id}`)
    //             .then(result => {
    //                 setProductItems(result.data);
    //             })
    //             .catch(error => {
    //                 console.log('등록 상품 불러오기 실패', error);
    //             })
    //     }
    // }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (!isLoggedIn || !sellerInfo) {
            return; // 로그인 상태나 sellerInfo가 유효하지 않은 경우 early return을 사용
        }

        // 카테고리 정보를 가져오기
        axios.get(`${process.env.REACT_APP_API_URL}/major_category`)
            .then(response => {
                const majorCategories = {};
                response.data.forEach(cat => {
                    majorCategories[cat.majorCategoryId] = cat.name;
                });
                setCategories(prev => ({ ...prev, majors: majorCategories }));
            });

        // 카테고리 정보를 가져오기
        axios.get(`${process.env.REACT_APP_API_URL}/sub_category`)
            .then(response => {
                const subCategories = {};
                response.data.forEach(cat => {
                    subCategories[cat.subCategoryId] = cat.name;
                });
                setCategories(prev => ({ ...prev, subs: subCategories }));
            });

        // 상품 목록을 가져오기
        axios.get(`${process.env.REACT_APP_API_URL}/clothes/seller/${sellerInfo.email_id}`)
            .then(result => {
                const itemsWithImages = result.data.map(item => ({
                    ...item,
                    imageUrl: 'Loading...' // Initial temporary imageUrl
                }));
                setProductItems(itemsWithImages);
                return itemsWithImages;
            })
            .then(itemsWithImages => {
                itemsWithImages.forEach(item => {
                    axios.get(`http://localhost:8080/clothes_images/${item.clothesId}`)
                        .then(imageResult => {
                            const image = imageResult.data.find(img => img.order === 1);
                            if (image) {
                                setProductItems(currentItems => currentItems.map(currItem =>
                                    currItem.clothesId === item.clothesId ? { ...currItem, imageUrl: image.imageUrl } : currItem
                                ));
                            }
                        });
                });
            })
            .catch(error => {
                console.error('등록 상품 불러오기 실패', error);
            })

    }, []);

    return (
        <div>
            <br /> <br />

            <Container>
                <Row>
                    <Col xs={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
                        <h1 style={{ fontSize: '30px', fontWeight: '700' }}>등록 상품</h1>
                        <br /><br />
                    </Col>
                </Row>
                <Row>
                    <Hidden xs sm>
                        <Col md={{ span: 7, offset: 2 }} style={{ fontSize: '20px', fontWeight: '700' }}>
                            상품 정보
                        </Col>
                    </Hidden>
                    {/* <Hidden xs sm>
                        <Col md={1} style={{ fontSize: '20px', fontWeight: '700' }}>
                            수량
                        </Col>
                    </Hidden> */}
                    <Hidden xs sm>
                        <Col md={1} style={{ whiteSpace: 'nowrap', fontSize: '20px', fontWeight: '700' }}>
                            상품 가격
                        </Col>
                    </Hidden>
                </Row>
                {/* <Row>
                    <Col xs={12} md={{ span: 10, offset: 1 }}>
                        <div style={{ height: '2px', backgroundColor: '#000000' }}></div>
                    </Col>
                </Row> */}
                <Row>
                    <Col xs={12} md={{ span: 10, offset: 1 }}>
                        <hr style={{ border: 0, height: '2px', background: '#000000' }} />
                    </Col>
                </Row>



                <Row>
                    {productItems.map(item => (
                        <ProductItem
                            key={item.clothesId}
                            item={item}
                            categories={categories}
                            navigate={navigate}
                        />
                    ))}
                </Row>
                <br></br>
                <br></br>
            </Container>
        </div >
    )
}

export default ProductList;