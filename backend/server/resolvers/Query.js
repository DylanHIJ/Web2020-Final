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
    const ID = args.ID;
    const course = await Course.findOne({ _id: ID }).exec();
    if (course !== null) {
      course.assignments = course.assignments.map(
        async (assignmentID) =>
          await Assignment.findOne({ _id: assignmentID }).exec()
      );
    }

    return course;
  },
  async assignment(parent, args, { Assignment }, Info) {
    const ID = args.ID;
    const assignment = await Assignment.findOne({ _id: ID }).exec();

    return assignment;
  },
  async problem(parent, args, { Assignment, Problem }, Info) {
    const ID = args.ID;
    const problem = await Problem.findOne({ _id: ID }).exec();

    if (problem != null) {
      const idx = getProblemIndex(Assignment, problem.assignmentID, ID);

      return { ...problem._doc, index: idx };
    }

    return problem;
  },
  async shortQAProblem(parent, args, { Assignment, Problem }, info) {
    const ID = args.ID;
    const assignment = await Assignment.findOne({ _id: ID }).exec();
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
    const ID = args.ID;
    const grade = await Grade.findOne({
      $and: [{ email: email }, { assignmentID: ID }],
    }).exec();

    let point = null;
    if (grade !== null && grade.graded) {
      point = grade.grades.reduce((a, b) => a + b);
    }
    return point;
  },
};

export { Query as default };
