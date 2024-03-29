import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';



function Join(props) {

  let [name, setName] = useState('');
  let [address, setAddress] = useState('');
  let [phone, setPhone] = useState('');
  let [email, setEmail] = useState('');
  let [pw, setPw] = useState('');
  let [pwConfirm, setPwConfirm] = useState('');

  let [emailValid, setEmailValid] = useState(true);
  let [emailDupCheck, setEmailDupCheck] = useState(null);
  let [pwValid, setPwValid] = useState(false);
  let [pwConfirmValid, setPwConfirmValid] = useState(false);
  let [notAllow, setNotAllow] = useState(true);
  

  let navigate = useNavigate();


  let handleName = (e) => {
    setName(e.target.value);
  }

  let handleAddress = (e) => {
    setAddress(e.target.value);
  }

  let handlePhone = (e) => {
    setPhone(e.target.value);
  }

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
    axios.post('http://localhost:8080/customers', {email : email, address : address, name : name, password : pw, phone : phone})
              .then((result) => {
                alert('회원가입 완료');
                navigate("/login")
              })
              .catch(() => {
                console.log('회원가입 실패')
              })
  }

  useEffect(() => {
    if (name.trim() !== '' && address.trim() !== '' && phone.trim() !== '' && emailValid && pwValid && pwConfirmValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [name, address, phone, emailValid, pwValid, pwConfirmValid]);

  useEffect(() => {
    if (pw === pwConfirm) {
      setPwConfirmValid(true);
    } else {
      setPwConfirmValid(false);
    }
  }, [pw, pwConfirm])



  // 중복 검사를 수행하는 함수
  let checkEmailDuplication = async () => {
    if (email.trim() === '') {
      setEmailDupCheck(null);
      return;
    }

    try {axios.get(`http://localhost:8080/customers/email/${email}`)
      .then((result) => {
        setEmailDupCheck(result.data);
        console.log("회원가입 성공");
      })
      .catch(()=>{
        console.log("회원가입 실패");
      })
    } catch { }
  };

  // debounce를 사용하여 입력이 멈춘 후 검사 수행
  let debouncedCheckEmailDuplication = debounce(checkEmailDuplication, 500);

  useEffect(() => {
    debouncedCheckEmailDuplication();

    // 컴포넌트가 언마운트될 때 debounce 취소
    return () => {
      debouncedCheckEmailDuplication.cancel();
    };
  }, [email]); // email 상태가 변경될 때마다 실행


  return (
    <Form className='login-ContentWrap'>
      <Form.Text className="login-InputTitle">
        회원정보를 입력해주세요
      </Form.Text>

      <Form.Group className="mb-3 text-start" controlId="formBasicName">
        <Form.Label className='login-InputTitle'>이름</Form.Label>
        <div className='login-InputWrap'>
          <Form.Control
            value={name}
            onChange={handleName}
            type="text"
            placeholder="이름을 입력하세요."
            className='login-Input' />
        </div>
      </Form.Group>

      <Form.Group className="mb-3 text-start" controlId="formBasicAddress">
        <Form.Label className='login-InputTitle'>주소</Form.Label>
        <div className='login-InputWrap'>
          <Form.Control
            value={address}
            onChange={handleAddress}
            type="text"
            placeholder="주소를 입력하세요."
            className='login-Input' />
        </div>
      </Form.Group>

      <Form.Group className="mb-3 text-start" controlId="formBasicPhone">
        <Form.Label className='login-InputTitle'>전화번호</Form.Label>
        <div className='login-InputWrap'>
          <Form.Control
            value={phone}
            onChange={handlePhone}
            type="tel"
            placeholder="전화번호를 입력하세요."
            className='login-Input' />
        </div>
      </Form.Group>

      <Form.Group className="mb-3 text-start" controlId="formBasicEmail" style={{ marginTop: '20px' }}>
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
            email.length == 0 ? null : 
            (!emailValid ? <div>이메일을 올바르게 입력해주세요.</div> :
            emailDupCheck ? <div>사용 중인 이메일입니다.</div> : 
             <div style={{color:'green'}}>사용 가능한 이메일입니다.</div>)
             // email 중복되면 true
            //  false ? <div>사용 중인 이메일입니다.</div> :             
            //  @@@@@@@@@@@@@@@ 이메일 중복체크 넣을것 @@@@@@@@@@@@@@@
            // emailDupCheck ? <div>사용 중인 이메일입니다.</div> : 
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

      <Button onClick={onClickConfirmButton} disabled={notAllow} variant="primary" className='login-Button' style={{ marginBottom: '10px' }}>
        {/* type="submit"  */}
        가입하기
      </Button>
    </Form>

  )
}

export default Join;