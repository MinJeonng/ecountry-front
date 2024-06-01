const SCHOOLINFO = 'setting1/SCHOOLINFO';
const COUNTRYINFO = 'setting2/COUNTRYINFO';
const STUDENTINFO = 'setting3/STUDENTINFO';
const SEATINGMAP = 'setting4/SEATINGMAP';
const JOBLIST = 'setting5/JOBLIST';
const BASICLAW = 'setting6/BASICLAW';
const TAXLAW = 'setting7/TAXLAW';
const SEATRENTALFEE = 'setting8/SEATRENTALFEE';
const FINE = 'setting9/FINE';
//setting1 - 학교 이름/ 반 /번호
export const schoolInfo = (info) => ({
  type: SCHOOLINFO,
  info,
});
const initalState1 = {
  schoolName: null,
  schoolGrade: null,
  schoolClass: null,
  eduOfficeCode: null,
  schoolCode: null,
};
export const setting1Reducer = (state = initalState1, action) => {
  switch (action.type) {
    case SCHOOLINFO:
      return {
        ...state,
        schoolName: action.info.schoolName,
        schoolGrade: action.info.schoolGrade,
        schoolClass: action.info.schoolClass,
        eduOfficeCode: action.info.eduOfficeCode,
        schoolCode: action.info.schoolCode,
      };
    default:
      return state;
  }
};
//setting2 - 나라이름 / 단위 / 월급날
export const countryInfo = (info) => ({
  type: COUNTRYINFO,
  info,
});
const initalState2 = {
  countryName: null,
  moneyUnit: null,
  salaryDate: null,
};
export const setting2Reducer = (state = initalState2, action) => {
  switch (action.type) {
    case COUNTRYINFO:
      return {
        ...state,
        countryName: action.info.countryName,
        moneyUnit: action.info.moneyUnit,
        salaryDate: action.info.salaryDate,
      };
    default:
      return state;
  }
};

// setting3 - 학생 리스트 , 임시 비밀번호
export const studentInfo = (info) => ({
  type: STUDENTINFO,
  info,
});
const initalState3 = {
  studentList: [],
};
export const setting3Reducer = (state = initalState3, action) => {
  switch (action.type) {
    case STUDENTINFO:
      return {
        ...state,
        studentList: action.info.studentList,
      };
    default:
      return state;
  }
};
//setting4
export const seatingMap = (info) => ({
  type: SEATINGMAP,
  info,
});
const initalState4 = {
  columns: [],
};
export const setting4Reducer = (state = initalState4, action) => {
  switch (action.type) {
    case SEATINGMAP:
      return {
        ...state,
        columns: action.info.columns || [],
      };
    default:
      return state;
  }
};
//setting5 - 직업 divison:1
export const jobsInfo = (info) => ({
  type: JOBLIST,
  info,
});
const initalState5 = {
  jobsDisplay: [],
};
export const setting5Reducer = (state = initalState5, action) => {
  switch (action.type) {
    case JOBLIST:
      return {
        ...state,
        jobsDisplay: action.info.jobsDisplay,
      };
    default:
      return state;
  }
};
//setting6
export const basicLaw = (info) => ({
  type: BASICLAW,
  info,
});
const initalState6 = {
  basicLaw: [],
};
export const setting6Reducer = (state = initalState6, action) => {
  switch (action.type) {
    case BASICLAW:
      return {
        ...state,
        basicLaw: action.info.basicLaw,
      };
    default:
      return state;
  }
};
//setting7 - 세법 division : 0/1
export const taxLaw = (info) => ({
  type: TAXLAW,
  info,
});
const initalState7 = {
  taxLaw: [],
};
export const setting7Reducer = (state = initalState7, action) => {
  switch (action.type) {
    case TAXLAW:
      return {
        ...state,
        taxLaw: action.info.taxLaw,
      };
    default:
      return state;
  }
};
//setting8 - 자리세 division:2
export const seatRentalFee = (info) => ({
  type: SEATRENTALFEE,
  info,
});
const initalState8 = {
  taxName: null,
  fee: null,
  division: 2,
};
export const setting8Reducer = (state = initalState8, action) => {
  switch (action.type) {
    case SEATRENTALFEE:
      return {
        ...state,
        taxName: action.info.taxName,
        fee: action.info.fee,
        division: 2,
      };
    default:
      return state;
  }
};
//setting9 -세법 division : 3
export const Fine = (info) => ({
  type: FINE,
  info,
});
const initalState9 = {
  fine: [],
  division: 3,
};
export const setting9Reducer = (state = initalState9, action) => {
  switch (action.type) {
    case FINE:
      return {
        ...state,
        fine: action.info.fine,
        division: 3,
      };
    default:
      return state;
  }
};
