import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


function DeleteCustomer(props) {

    let navigate = useNavigate();
    let [user, setUser] = useState('erw@naver.com');

    let deleteCustClicked = () => {
        axios.delete(`http://localhost:8080/customers/${user}`)
        .then((result)=>{
            console.log('회원탈퇴 성공');
            alert('회원탈퇴 성공');
            navigate('/');
        })
        .catch((error)=>{
            console.error('회원탈퇴 실패', error);
        })
    }

    return(
        <div>
            <div style={{ fontSize: '15px', fontWeight: '500', textAlign:'left' }}>
            회원님은 현재 {user}로 로그인하셨습니다.<br></br>
            정말로 회원 탈퇴하시겠습니까?
            </div>
            <div style={{textAlign:'left'} }>
            <Button variant="danger" onClick={deleteCustClicked}>회원탈퇴</Button>
            </div>
        </div>
    )
}

export default DeleteCustomer;