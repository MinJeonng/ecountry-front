import React from 'react';

import '../styles/footer.scss';

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="moFooter">
          <a href="/">
            <div className="flogo">자라나라 경제나라</div>
          </a>
          <div className="fCopy">
            &#169; 2024 자라나라 경제나라. All Rights Reserved.
          </div>
          <div className="fCopy">
            로고 &#169; 2024 support_woo. All Rights Reserved.
          </div>
          <div className="fTel">
            <div className="ftTit">고객센터 CodingOn &#40;발신자 부담&#41;</div>
            <div className="ftText">
              평일 09:00~14:00 &#47; 일요일, 공휴일 휴무
            </div>
          </div>
        </div>
        <div className="pcFooter">
          <div className="fLeft">
            <a href="/" style={{ color: '#333', textDecorationLine: 'none' }}>
              <div className="flogo">자라나라 경제나라</div>
            </a>
            <div className="fTel">
              <div className="ftTit">고객센터 CodingOn</div>
              <div className="ftText">
                발신자 부담
                <br />
                평일 09:00~18:00
                <br />
                일요일, 공휴일 휴무
              </div>
            </div>
          </div>
          <div className="fRight">
            <div className="fText">
              <span className="fText-span">
                경제나라 | 남현경, 최지은, 성명규, 김민정, 박시영, 김지혜
              </span>
              <span className="fText-span">
                {' '}
                프로젝트 기간 | 2024.05.02 ~ 2024.06.05
              </span>
              <a
                className="fText-span"
                href="https://github.com/MinJeonng/ecountry-front"
                style={{ color: '#333', textDecorationLine: 'none' }}
              >
                <span>GitHub 경제나라</span>
              </a>
              <a
                className="fText-span"
                href="https://github.com/cje206/econtry-back"
                style={{ color: '#333', textDecorationLine: 'none' }}
              >
                <span>GitHub 경제나라</span>
              </a>
              <span className="fText-span">
                (본사) 서울시 마포구 숭문 4길 6, 지하 1층 포스코X코딩온 교육장
              </span>
            </div>
            <div className="fMenu">
              <p>이용약관</p>
              <p className="tcbl">개인정보처리방침</p>
            </div>
            <div className="fCopy">
              &#169; 2024 자라나라 경제나라. All Rights Reserved.
            </div>
            <div className="fCopy">
              로고 &#169; 2024 support_woo. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      <link rel="stylesheet" href="" />
    </div>
  );
}
