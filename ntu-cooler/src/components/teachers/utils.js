const demoKeywords = [
  {
    word: "dylan",
    color: "#ABCDEF",
  },
  {
    word: "hamster",
    color: "#CDEFAB",
  },
  {
    word: "laxingyang",
    color: "#EFABCD",
  },
];

const demoProblems = [
  {
    problemID: "problem_1",
    statement: "Describe how much you dislike JavaScript.",
    keywords: demoKeywords,
  },
];

const demoStudentResponses = [
  {
    studentID: "student_4",
    text: "dylan - hamster - laxingyang",
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
    studentID: "student_1",
    text: "Yeah (?",
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
