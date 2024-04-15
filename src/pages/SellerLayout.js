import { Button, Col, Container, Nav, NavLink, Navbar, Row } from "react-bootstrap";
import styled from 'styled-components';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavLink as ReactRouterNavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellerLogout } from "../store/sellerSlice";


const StyledNavLink = styled(ReactRouterNavLink)`
  display: block;
  margin: 10px 0;
  color: white;
  font-weight: 700;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;

  &:hover {
    color: lightgray;  // 호버 시 색상 변경
  }

  @media (max-width: 768px) {
    font-size: 16px;  // 반응형 폰트 크기 조정
  }
`;

function SellerLayout(props) {

    const location = useLocation();
    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [sidebarStyle, setSidebarStyle] = useState({ minHeight: '100vh' });

    let dispatch = useDispatch();
    let { sellerInfo, isLoggedIn } = useSelector((state) => state.seller);

    const toggleSidebar = () => setIsOpen(!isOpen);

    useEffect(() => {
        // function handleResize() {
        //     
        // }
        function handleResize() {
            setIsOpen(window.innerWidth >= 768);
            if (window.innerWidth < 768) {
                setSidebarStyle({ minHeight: 'auto' });  // xs 사이즈에서 내용에 맞춰 높이 조정
            } else {
                setSidebarStyle({ minHeight: '100vh' });  // 그 외 사이즈에서는 전체 높이 유지
            }
        }

        // 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);
        // 초기 실행
        handleResize();

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         alert('로그인 후 이용해주세요.');
    //         navigate('/seller/login');
    //     }
    // }, [isLoggedIn, navigate]);

    useEffect(() => {
        // 로그인 상태가 아니고 현재 위치가 로그인 페이지가 아니라면 로그인 페이지로 리디렉션
        if (!isLoggedIn && location.pathname !== '/seller/login' && location.pathname !== '/seller/sellerjoin') {
            alert('로그인 후 이용해주세요.');
            navigate('/seller/login');
        }
    }, [isLoggedIn, navigate, location.pathname]);

    return (
        <div>
            {/* 판매자 레이아웃
            <Outlet></Outlet> */}


            <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <div className="content" style={{ flex: 1 }}>

                    <Navbar bg="light" data-bs-theme="light" style={{ marginLeft: '20px' }} >
                        <Button style={{ background: '#003458' }} onClick={toggleSidebar}>☰</Button>
                        <Navbar.Brand onClick={() => navigate('/')} style={{ fontSize: '24px', fontWeight: '700', color: '#1263CE', cursor: 'pointer', marginLeft: '10px' }}>
                            D<span style={{ fontSize: '20px', fontWeight: '600' }}>esign </span>
                            T<span style={{ fontSize: '20px', fontWeight: '600' }}>he </span>
                            S<span style={{ fontSize: '20px', fontWeight: '700' }}>tyle 판매자 대시보드</span>
                        </Navbar.Brand>
                    </Navbar>

                    {/* <Container fluid style={{ paddingLeft: '0', paddingRight: '0' }}> */}
                    <Container style={{ maxWidth: '100%', paddingLeft: '0px', paddingRight: '15px' }}>
                        <Row>
                            <Col xs={isOpen ? 12 : 0} md={isOpen ? 2 : 0} className="sidebar">
                                <div style={{ display: isOpen ? 'block' : 'none' }}>
                                    <ul className="nav flex-column" style={{ backgroundColor: '#003458', minHeight: '100vh', ...sidebarStyle, padding: '1rem' }}>
                                        <li className="nav-item">
                                            <StyledNavLink to="/seller/ordermanagement">주문 관리</StyledNavLink>
                                        </li>
                                        <li className="nav-item">
                                            <StyledNavLink to="/seller/productregistration">상품 등록</StyledNavLink>
                                        </li>
                                        <li className="nav-item">
                                            <StyledNavLink to="/seller/productlist">상품 조회</StyledNavLink>
                                        </li>
                                        <li className="nav-item">
                                            <StyledNavLink to="/seller/statisticsanalysis">통계 분석</StyledNavLink>
                                        </li>
                                        <li className="nav-item">
                                            {isLoggedIn ? <StyledNavLink onClick={() => {
                                                dispatch(sellerLogout());
                                                alert('로그아웃되었습니다.');
                                            }}>로그아웃</StyledNavLink> : <StyledNavLink to="/seller/login">로그인</StyledNavLink>}
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={12} md={isOpen ? 10 : 12}>
                                <Outlet></Outlet>
                            </Col>
                        </Row>
                    </Container>
                </div>


                <Navbar bg="light" data-bs-theme="light" style={{ width: '100%' }}>
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link href="/" style={{ fontWeight: '700' }}>구매자 페이지</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default SellerLayout;