import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice';
import { setCartItems } from '../store/cartSlice';

function Login(props) {

  let dispatch = useDispatch();
  let { userInfo, isLoggedIn } = useSelector((state) => state.user);
  let cartItems = useSelector((state) => state.cart.items);

  let [email, setEmail] = useState('');
  let [pw, setPw] = useState('');
  let [rememberMe, setRememberMe] = useState(false);

  let [emailValid, setEmailValid] = useState(true);
  let [pwValid, setPwValid] = useState(false);
  let [notAllow, setNotAllow] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    let savedUserEmail = localStorage.getItem('userEmail');
    let savedRememberMe = localStorage.getItem('rememberMe');

    if (savedRememberMe == null) {  // 첫 접속으로 null 일 경우
      localStorage.setItem('rememberMe', 'false');
      localStorage.setItem('userEmail', '');
    } else if (savedRememberMe === 'true') { // true 일 경우
      setEmail(savedUserEmail || '');
      setRememberMe(savedRememberMe);
    } else {  // false 일 경우
      setEmail('');
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
    axios.get(`http://localhost:8080/customers/${email}/${pw}`)
      .then((result) => {
        if (result.data == true) {
          if (rememberMe == true) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('rememberMe', 'true');
          } else {
            // localStorage.removeItem('userEmail');
            // localStorage.removeItem('rememberMe');
            localStorage.setItem('userEmail', '');
            localStorage.setItem('rememberMe', 'false');
          }

          dispatch(login({ 'email_id': email }));

          // 장바구니 데이터 가져오기
          axios.get(`http://localhost:8080/cart/${email}`)
            .then(result => {
              dispatch(setCartItems(result.data));
            })
            .catch(error => {
              console.log('장바구니 데이터 불러오기 실패', error);
            })

          alert('로그인 성공');

          navigate("/");
        } else {
          alert('비밀번호를 확인하세요.');
        }
      })
      .catch(() => {
        console.log('로그인 실패');
        alert('아이디를 확인하세요.');
      })
  }

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid])


  // Enter 키 이벤트 리스너를 설정하는 useEffect를 추가합니다.
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !notAllow) {
        onClickConfirmButton();
      }
    };

    // 'email-input' 요소를 가져오기
    const emailInput = document.getElementById('email-input');
    // 'password-input' 요소를 가져오기
    const passwordInput = document.getElementById('password-input');

    // 'email-input' 요소가 존재하면 이벤트 리스너를 추가
    if (emailInput) {
      emailInput.addEventListener('keydown', handleKeyPress);
    }

    // 'password-input' 요소가 존재하면 이벤트 리스너를 추가
    if (passwordInput) {
      passwordInput.addEventListener('keydown', handleKeyPress);
    }
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리
    return () => {
      if (emailInput) {
        emailInput.removeEventListener('keydown', handleKeyPress);
      }
      if (passwordInput) {
        passwordInput.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, [notAllow]);


  return (
    <Form className='login-ContentWrap'>
      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
        <Form.Label className='login-InputTitle'>아이디(이메일)</Form.Label>
        <div className='login-InputWrap'>
          <Form.Control
            id="email-input"
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
            id="password-input"
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