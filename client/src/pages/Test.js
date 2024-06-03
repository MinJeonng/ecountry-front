import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { handleFileChange } from '../hooks/Functions';

export default function Test() {
  const [list, setList] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) return;
        const list = [];

        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', bookVBA: true });

        const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstWorksheet, {
          header: 1,
        });

        console.log(jsonData);
        jsonData.forEach((data, index) => {
          if (index > 0) {
            list.push({
              password: data[2],
              attendanceNumber: data[0],
              name: data[1],
            });
          }
        });
        console.log(list);
        setList(list);
      };
      reader.readAsArrayBuffer(files[0]);
    }
  };

  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <>
      <input type="file" onChange={handleFileChange} />
    </>
  );
}
