import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function OrderDeliveryStatus(props) {
    let navigate = useNavigate();
    let { userInfo, isLoggedIn, isLoading } = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);

    // 주문 상태 코드를 문자열로 매핑
    const statusLabels = {
        0: "상품 준비",
        1: "배송 준비",
        2: "배송 중",
        3: "배송 완료",
        4: "반품 신청",
        5: "반품 완료"
    };

    // useEffect(() => {
    //     if (!isLoggedIn || !userInfo) {
    //         return; // 로그인 상태나 userInfo가 유효하지 않은 경우 early return을 사용
    //     }
    //     if (!isLoggedIn) {
    //         alert('로그인 후 이용해주세요.');
    //         navigate('/login');
    //     }
    // }, [isLoggedIn, userInfo, navigate]);

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            alert('로그인 후 이용해주세요.');
            navigate('/login');
        }
    }, [isLoggedIn, isLoading, navigate]);




    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/receipt/${userInfo.email_id}`);
                const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신 날짜부터 정렬
                setOrders(sortedData);
            } catch (error) {
                console.error('Error fetching orders:', error);
                alert('주문 데이터를 불러오는데 실패했습니다.');
            }
        };

        if (userInfo && userInfo.email_id) {
            fetchOrders();
        }
    }, [userInfo]);


    const handleViewDetails = (receiptId, date, status) => {
        // navigate(`orderdetails/${receiptId}`, {
        //     state: { date: date, status: status } // 여기에 필요한 정보를 넣어서 전달합니다.
        // });
        navigate(`orderdetails/${receiptId}`);
    };


    return (
        <div>
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 1 }} xs={12}>
                        <h1 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '60px' }}>주문/배송 현황</h1>
                    </Col>
                </Row>
                <Row>
                    <Table striped bordered hover style={{ verticalAlign: 'middle' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th style={{ whiteSpace: 'nowrap' }}>주문번호</th>
                                <th>주문일</th>
                                <th>주문상태</th>
                                <th>주문상세</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{order.receiptId}</td>
                                    <td>{order.date}</td>
                                    <td>{statusLabels[order.status] || '상태 정보 없음'}</td>
                                    <td><Button
                                        variant="outline-secondary"
                                        style={{ whiteSpace: 'nowrap' }}
                                        onClick={() => handleViewDetails(order.receiptId, order.date, order.status)}
                                    >
                                        상세보기
                                    </Button>{' '}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    );
}

export default OrderDeliveryStatus;