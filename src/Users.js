import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [accountName, setAccountName] = useState(null);
  const [nowName, setnowName] = useState(null);
  const [nowBalance, setNowBalance] = useState(null);
  const [accountList, setaccountList] = useState(null);
  const [text, setText] = useState('');
  const onTextChange = (e) => {
    //e : 이벤트 객체
    setText(e.target.value); //이벤트를 받는 타겟의 value값으로 변경
  }

 
  const createAccount = async () => {
    try {
      //응답 성공
      const response = await axios.get('/create',{
        params:{
          accountName: text
        }
      });
      setAccountName(response.data.accountName);
      setNowBalance(response.data.nowBalance);
      console.log(nowName);
      if (nowName === null) {
        console.log("nullll");
        setnowName(response.data.accountName);
      }
      console.log(nowName);
     // setnowName(response.data.accountName)
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }



  const deposit = async () => {
    try {
      //응답 성공
      const response = await axios.get('/deposit',{
        params:{
          accountName: nowName,
          addBalance : text
        }
      });
      setAccountName(response.data.accountName);
      setNowBalance(response.data.nowBalance);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }



  /* 계좌변경 */
  const change1 = async () => {
    try {
      //응답 성공
      const response = await axios.get('/change1');
      setaccountList(Object.keys(response.data));
      const result = prompt("계좌 배열 : "+ Object.keys(response.data), "");
      try {
        const response = await axios.get('/top',{
          params:{
            accountName: result
          }
        });
        setNowBalance(response.data.nowBalance);
        setnowName(response.data.accountName);
      } catch (error) {
        //응답 실패
        console.error(error);
      }
 
    } catch (error) {
      //응답 실패
      console.error(error);
    }
    
  }



	// 드디어 users가 성공적으로 받아와 진 상태입니다.
  return (
		<>
	    <p>계좌이름 : {nowName} 잔액 : {nowBalance}</p>

      <input type="text" onChange={onTextChange} value={text} />
      <ul>
        <li><button onClick={ createAccount }>계좌 생성하기</button></li>
        <li>
        
          <button onClick={ deposit }>입금</button>
        </li>

        <li><button onClick={ change1 }>계좌변경</button></li> 
      </ul>
    </>
  );
}

export default Users;