import { createContext, useContext, useState } from 'react';

// Context 생성
const AccountContext = createContext();

// Context Provider 컴포넌트
export const AccountProvider = ({ children }) => {
  const [accountData, setAccountData] = useState({});
  const [unit, setUnit] = useState('');

  return (
    <AccountContext.Provider
      value={{ accountData, setAccountData, unit, setUnit }}
    >
      {children}
    </AccountContext.Provider>
  );
};

// Context를 사용하는 custom hook
export const useAccount = () => useContext(AccountContext);
