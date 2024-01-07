import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

let User = {
  email: 'capstone2024@hansung.ac.kr',
  pw: 'web2024!'
}

function Login(props) {

  let [email, setEmail] = useState('');
  let [pw, setPw] = useState('');
  let [rememberMe, setRememberMe] = useState(false);

  let [emailValid, setEmailValid] = useState(true);
  let [pwValid, setPwValid] = useState(false);
  let [notAllow, setNotAllow] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    let savedUserEmail = localStorage.getItem('userEmail');
    let savedRememberMe2 = localStorage.getItem('rememberMe');
    let savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedUserEmail == null) {
      localStorage.setItem('userEmail', '')
    }
    if (savedRememberMe2 == null) {
      localStorage.setItem('rememberMe', 'false')
    }

    if (savedRememberMe) {
      setEmail(savedUserEmail || '');
      setRememberMe(savedRememberMe);
    }
  }, []);

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

  let handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  }

  let onClickConfirmButton = () => {
    if(email === User.email && pw === User.pw) {
      if (rememberMe) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('rememberMe', String(rememberMe))
      } else {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('rememberMe');
      }
      alert('로그인 성공');
    } else {
      alert('아이디, 비밀번호를 확인하세요.')
    }
  }

  useEffect(()=>{
    if(emailValid && pwValid){
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  },[emailValid,pwValid])

  return (
    <Form className='login-ContentWrap'>
      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
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
      <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" checked={rememberMe}
        onChange={handleCheckboxChange}
        label="아이디 저장" />
      </Form.Group>
      <Button onClick={onClickConfirmButton} disabled={notAllow} variant="primary" className='login-Button'>
        {/* type="submit"  */}
        로그인
      </Button>
      <Button onClick={() => { navigate('/join') }} variant="primary" className='join-Button'>
        {/* type="submit"  */}
        회원가입
      </Button>
    </Form>
    
  )
}

export default Login;