const demoProblems = [
  {
    pid: "demo-1",
    type: "TF",
    statement: "Is Dylan's joke funny?",
  },
  {
    pid: "demo-2",
    type: "MULTIPLE_CHOICE",
    statement: "Which of the following person does not have a girlfriend?",
    options: ["La-Xing Yang", "Wu-Jun Pei", "I-Ju Hsieh", "Ping-Chia Huang"],
  },
  {
    pid: "demo-3",
    type: "CHECKBOX",
    statement: "Which of the following person use iPhone?",
    options: ["La-Xing Yang", "Wu-Jun Pei", "I-Ju Hsieh", "Ping-Chia Huang"],
  },
  {
    pid: "demo-4",
    type: "SHORT_QA",
    statement: "Describe how much you dislike JavaScript.",
  },
];

const getAssignment = (assignment_id) => {
  return {
    aid: "demo",
    name: "Test Assignment",
    beginTime: "",
    endTime: "",
    problems: demoProblems,
  };
};

export { getAssignment };
