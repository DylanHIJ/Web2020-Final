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
    index: 2,
    problemID: "problem_1",
    statement: "Describe how much you dislike JavaScript.",
    keywords: demoKeywords,
    maxScore: 10,
  },
];

const demoStudentResponses = [
  {
    studentID: "student_4",
    name: "DDDD",
    text: "dylan - hamster - laxingyang",
  },
  {
    studentID: "student_2",
    name: "BBBB",
    text: "Hamster is struggling on the bed.",
  },
  {
    studentID: "student_3",
    name: "CCCC",
    text: "LaxingYang saiko",
  },
  {
    studentID: "student_1",
    name: "AAAA",
    text: "Yeah (?",
  },
];

const getAssignment = (aid) => ({
  name: "Test Assignment",
});

const getProblems = (aid) => demoProblems;

const getStudentList = (aid) => demoStudentResponses;
const getStudentResponse = (aid, pid, sid) =>
  demoStudentResponses.find((ele) => ele.studentID === sid);

export { getAssignment, getProblems, getStudentList, getStudentResponse };
