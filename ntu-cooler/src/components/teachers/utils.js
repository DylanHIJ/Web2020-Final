const demoKeywords = [
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

const demoProblems = [
  {
    problemID: "problem_1",
    statement: "Hello world (?",
    keywords: demoKeywords,
  },
];

const demoStudentResponses = [
  {
    studentID: "student_1",
    text: "Yeah (?",
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

const getAssignment = (aid) => ({
  name: "Test Assignment",
});

const getProblems = (aid) => demoProblems;

const getStudentList = (aid) =>
  demoStudentResponses.map((ele) => ele.studentID);
const getStudentResponse = (aid, pid, sid) =>
  demoStudentResponses.find((ele) => ele.studentID === sid);

export { getAssignment, getProblems, getStudentList, getStudentResponse };
