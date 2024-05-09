import React from 'react'
import '../styles/intro.css'

export default function intro() {
    window.onload = function() {
       document.querySelector('.background').style.backgroundColor = "#FCFFE0";
       setTimeout(()=>{
            document.querySelector('.button-wrap').style.visibility = "visible"
       },5000)
    };
  return (
    <div>
      <div className='background'>
        <div className='logo-wrap'>
            <span className='logo-img'>logo</span>
            <span className='logo-title'>자라나라 경제나라</span>
        </div>
        <div className='button-wrap' >
            <div className='big-button button1'>로그인</div>
            <div className='big-button button2'>회원가입</div>
        </div>
      </div>
    </div>
  )
}


