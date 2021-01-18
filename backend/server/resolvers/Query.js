const getProblemIndex = async (Assignment, assignmentID, problemID) => {
  const assignment = await Assignment.findOne({
    _id: assignmentID,
  }).exec();

  if (assignment !== null) {
    return assignment.problems.indexOf(problemID);
  }

  return -1;
};
const Query = {
  async user(parent, args, { User, Course }, info) {
    const email = args.email;
    const password = args.password;
    const token = args.token;
    let user;

    if (token) {
      user = await User.findOne({ token: token }).exec();
      console.log("Query: login with token");
    } else {
      user = await User.findOne({
        $and: [{ email: email }, { password: password }],
      }).exec();
      console.log("Query: login with email");
    }

    if (user !== null) {
      user.studentCourses = user.studentCourses.map(
        async (courseID) => await Course.findOne({ _id: courseID }).exec()
      );
      user.teacherCourses = user.teacherCourses.map(
        async (courseID) => await Course.findOne({ _id: courseID }).exec()
      );
    }
    console.log("Query: \n", user);

    return user;
  },
  async course(parent, args, { Course, Assignment }, Info) {
    const CID = args.CID;
    const course = await Course.findOne({ _id: CID }).exec();
    if (course !== null) {
      course.assignments = course.assignments.map(
        async (assignmentID) =>
          await Assignment.findOne({ _id: assignmentID }).exec()
      );
    }

    return course;
  },
  async assignment(parent, args, { Assignment }, Info) {
    const AID = args.AID;
    const assignment = await Assignment.findOne({ _id: AID }).exec();

    return assignment;
  },
  async problem(parent, args, { Assignment, Problem }, Info) {
    const PID = args.PID;
    const problem = await Problem.findOne({ _id: PID }).exec();

    if (problem != null) {
      const idx = getProblemIndex(Assignment, problem.assignmentID, PID);

      return { ...problem._doc, index: idx };
    }

    return problem;
  },
  async shortQAProblem(parent, args, { Assignment, Problem }, info) {
    const PID = args.PID;
    const assignment = await Assignment.findOne({ _id: PID }).exec();
    let ret = [];
    if (assignment !== null) {
      for (const problemID of assignment.problems) {
        const problem = await Problem.findOne({ _id: problemID }).exec();
        if (problem.type === "SHORT_QA") {
          const idx = await getProblemIndex(
            Assignment,
            problem.assignmentID,
            problemID
          );

          ret.push({ ...problem._doc, index: idx });
        }
      }
    }

    return ret;
  },
  async studentAnswer(parent, args, { Assignment, Grade }, info) {
    const { email, problemID, assignmentID } = args.query;
    let answer = null;

    const assignment = await Assignment.findOne({ _id: assignmentID }).exec();
    const grade = await Grade.findOne({
      $and: [{ email: email }, { assignmentID: assignmentID }],
    }).exec();
    if (assignment !== null) {
      const idx = assignment.problems.indexOf(problemID);
      if (grade !== null && idx !== -1) {
        answer = grade.answers[idx][0];
      }
    }

    return answer;
  },
  async getGrade(parent, args, { Grade }, info) {
    const email = args.email;
    const AID = args.AID;
    const grade = await Grade.findOne({
      $and: [{ email: email }, { assignmentID: AID }],
    }).exec();

    let point = null;
    if (grade !== null && grade.graded) {
      point = grade.grades.reduce((a, b) => a + b);
    }
    return point;
  },
  async getAnswer(parent, args, { Assignment, Grade }, info) {
    const email = args.email;
    const AID = args.AID;
    let ret = [];

    const assignment = await Assignment.findOne({ _id: AID }).exec();
    if (assignment !== null) {
      const grade = await Grade.findOne({
        $and: [{ email: email }, { assignmentID: AID }],
      }).exec();
      if (grade !== null) {
        for (let i in assignment.problems) {
          ret.push({
            problemID: assignment.problems[i],
            answer: grade.answers[i],
          });
        }
      }
    }

    return ret;
  },
};

export { Query as default };
