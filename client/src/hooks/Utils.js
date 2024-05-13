import { useState } from 'react';

export function useCommaInput() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    // 숫자만 허용
    const cleanedInput = e.target.value.replace(/[^0-9]/g, '');

    // 숫자에 3자리마다 콤마 추가
    const formattedInput = cleanedInput.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setInputValue(formattedInput);
  };

  return [inputValue, handleInputChange];
}
