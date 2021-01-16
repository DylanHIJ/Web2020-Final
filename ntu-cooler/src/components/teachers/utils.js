const demoStudentResponses = [
  {
    studentID: "student_1",
    text: "Hello world",
  },
  {
    studentID: "student_2",
    text: "Hamster is struggling on the bed.",
  },
  {
    studentID: "student_3",
    text: "LaxingYang saiko",
  },
  {
    studentID: "student_4",
    text: "dylan - hamster - laxingyang",
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
const getStudentResponse = (aid, pid, sid) =>
  demoStudentResponses.find((ele) => ele.studentID === sid);

const getKeywords = (aid, pid) => keywords;

export { getStudentList, getStudentResponse, getKeywords };
