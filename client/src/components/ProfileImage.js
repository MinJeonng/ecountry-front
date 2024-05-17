// import styled from 'styled-components';
// import { ReactComponent as DefaultPropfile } from '../images/default-profile.svg';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// // import { getColor } from './Functions';
// // import { ColorObject } from '../types';

// const ProfileImg = styled.div<{ link?: string }>`
//   background: url('${(props) => props.link}') no-repeat center/cover;
//   &::before {
//     content: '';
//     display: block;
//     padding-bottom: 100%;
//   }
// `;
// const DefaultImg = styled.div<{ imgwidth: string }>`
//   width: ${(props) => props.imgwidth};
//   height: fit-content;
//   border-radius: 50%;
//   overflow: hidden;
//   background: #f6f7f9;
//   svg {
//     display: block;
//     width: 100%;
//     height: auto;
//   }
// `;

// export default function ProfileImage({
//   // id,
//   imgwidth,
//   profileimg,
//   setPreview,
// }) {
//   const [profile, setProfile] = useState<{ img: string | null }>({ img: null });
//   const [theme, setTheme] = useState<ColorObject>({
//     background: '#fbc02d',
//     color: '#f6f7f9',
//   });
//   useEffect(() => {
//     if (profileimg) {
//       setProfile({ img: profileimg });
//     } else {
//       setProfile({ img: null });
//     }
//   }, [profileimg]);

//   return (
//     <>
//       {Boolean(id) ? (
//         <DefaultImg className="imgBox" imgwidth={imgwidth ? imgwidth : '20%'}>
//           {profile.img ? (
//             <ProfileImg link={profile.img} />
//           ) : (
//             <DefaultPropfile fill={theme.background} />
//           )}
//         </DefaultImg>
//       ) : (
//         <DefaultImg className="imgBox" imgwidth={imgwidth ? imgwidth : '20%'}>
//           <DefaultPropfile fill={theme.background} />
//         </DefaultImg>
//       )}
//       {/*  */}
//     </>
//   );
// }
