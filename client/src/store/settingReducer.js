const SCHOOLINFO = 'setting1/SCHOOLINFO';
const COUNTRYINFO = 'setting2/COUNTRYINFO';
const STUDENTINFO = 'setting3/STUDENTINFO';
const SEATINGMAP = 'setting4/SEATINGMAP';
const JOBLIST = 'setting5/JOBLIST';
const BASICLAW = 'setting6/BASICLAW';
const TAXLAW = 'setting7/TAXLAW';
const SEATRENTALFEE = 'setting8/SEATRENTALFEE';
const FINE = 'setting9/FINE';
//setting1
export const schoolInfo = (info) => ({
  type: SCHOOLINFO,
  info,
});
const initalState1 = {
  schoolName: null,
  schoolGrade: null,
  schoolClass: null,
};
export const setting1Reducer = (state = initalState1, action) => {
  switch (action.type) {
    case SCHOOLINFO:
      return {
        ...state,
        schoolName: action.info.schoolName,
        schoolGrade: action.info.schoolGrade,
        schoolClass: action.info.schoolClass,
      };
    default:
      return state;
  }
};
//setting2
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

// setting3
export const studnetInfo = (info) => ({
  type: STUDENTINFO,
  info,
});
const initalState3 = {
  password: null,
  studentList: [],
};
export const setting3Reducer = (state = initalState3, action) => {
  switch (action.type) {
    case STUDENTINFO:
      return {
        ...state,
        password: action.info.password,
        studentList: [action.info.studentList],
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
        columns: [action.info.columns],
      };
    default:
      return state;
  }
};
//setting5
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
        jobsDisplay: [action.info.jobsDisplay],
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
  laws: [],
};
export const setting6Reducer = (state = initalState6, action) => {
  switch (action.type) {
    case BASICLAW:
      return {
        ...state,
        basicLaw: [action.info.basicLaw],
      };
    default:
      return state;
  }
};
//setting7
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
        taxLaw: [action.info.taxLaw],
      };
    default:
      return state;
  }
};
//setting8
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
//setting9
export const Fine = (info) => ({
  type: FINE,
  info,
});
const initalState9 = {
  taxName: null,
  fee: null,
  division: 2,
};
export const setting9Reducer = (state = initalState8, action) => {
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