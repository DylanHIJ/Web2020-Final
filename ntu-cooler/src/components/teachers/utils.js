const demoStudentResponses = [
  {
    studentID: "student_1",
    response: "Hello world",
  },
  {
    studentID: "student_2",
    response: "Hamster is struggling on the bed.",
  },
  {
    studentID: "student_3",
    response: "LaxingYang saiko",
  },
  {
    studentID: "student_4",
    response: "dylan - hamster - laxingyang",
  },
];

const keywords = [
  {
    word: "dylan",
    color: "#123456",
  },
  {
    word: "hamster",
    color: "#561234",
  },
  {
    word: "laxingyang",
    color: "#345612",
  },
];

const getStudentList = (aid, pid) =>
  demoStudentResponses.map((ele) => ele.studentID);
const getStudentResponse = (studentID) =>
  demoStudentResponses.filter((ele) => ele.studentID === studentID);

const getKeywords = (aid, pid) => keywords;

export { getStudentList, getStudentResponse, getKeywords };
