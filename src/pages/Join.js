import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

let User = {
  email: 'capstone2024@hansung.ac.kr',
  pw: 'web2024!'
}

function Join(props) {

    let [email, setEmail] = useState('');
    let [pw, setPw] = useState('');
    let [pwConfirm, setPwConfirm] = useState('');
  
    let [emailValid, setEmailValid] = useState(true);
    let [pwValid, setPwValid] = useState(false);
    let [pwConfirmValid, setPwConfirmValid] = useState(false);
    let [notAllow, setNotAllow] = useState(true);
  
    let navigate = useNavigate();
  
    let handleEmail = (e) => {
      setEmail(e.target.value);
      let regex =
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (regex.test(e.target.value)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    }
  
    let handlePw = (e) => {
      setPw(e.target.value);
      let regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      if (regex.test(e.target.value)) {
        setPwValid(true);
      } else {
        setPwValid(false);
      }
    }

    let handlePwConfirm = (e) => {
        setPwConfirm(e.target.value);
    }
  
    let onClickConfirmButton = () => {
      if(email === User.email && pw === User.pw) {
        alert('로그인 성공');
      } else {
        alert('아이디, 비밀번호를 확인하세요.')
      }
    }
  
    useEffect(()=>{
      if(emailValid && pwValid && pwConfirmValid){
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    },[emailValid,pwValid,pwConfirmValid])

    useEffect(()=>{
        if(pw === pwConfirm) {
            setPwConfirmValid(true);
        } else {
            setPwConfirmValid(false);
        }
    },[pw, pwConfirm])
  
    return (
      <Form className='login-ContentWrap'>
        <Form.Text className="login-InputTitle">
            회원정보를 입력해주세요
        </Form.Text>
        <Form.Group className="mb-3 text-start" controlId="formBasicEmail" style={{marginTop:'20px'}}>
          <Form.Label className='login-InputTitle'>아이디(이메일)</Form.Label>
          <div className='login-InputWrap'>
            <Form.Control
              value={email}
              onChange={handleEmail}
              type="email"
              placeholder="아이디(이메일)를 입력하세요."
              className='login-Input' />
          </div>
          <Form.Text className="login-ErrorMessageWrap">
            {
              !emailValid && email.length > 0 && (
                <div>이메일을 올바르게 입력해주세요.</div>
              )
            }
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
          <Form.Label className='login-InputTitle'>비밀번호</Form.Label>
          <div className='login-InputWrap'>
            <Form.Control
              value={pw}
              onChange={handlePw}
              type="password" placeholder="비밀번호를 입력하세요." className='login-Input' />
          </div>
          <Form.Text className="login-ErrorMessageWrap">
            {
              !pwValid && pw.length > 0 && (
                <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
              )
            }
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
          <Form.Label className='login-InputTitle'>비밀번호 확인</Form.Label>
          <div className='login-InputWrap'>
            <Form.Control
              value={pwConfirm}
              onChange={handlePwConfirm}
              type="password" placeholder="비밀번호를 입력하세요." className='login-Input' />
          </div>
          <Form.Text className="login-ErrorMessageWrap">
            {
              !pwConfirmValid && pwConfirm.length > 0 && (
                <div>비밀번호가 일치하지 않습니다.</div>
              )
            }
          </Form.Text>
        </Form.Group>

        <Button onClick={onClickConfirmButton} disabled={notAllow} variant="primary" className='login-Button'>
          {/* type="submit"  */}
          가입하기
        </Button>
      </Form>
      
    )
  }

export default Join;