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
      user.studentCourses = user.studentCourses.map(async (courseID) => {
        const course = await Course.findOne({ _id: courseID }).exec();
        return { ...course._doc, ID: courseID };
      });
      user.teacherCourses = user.teacherCourses.map(async (courseID) => {
        const course = await Course.findOne({ _id: courseID }).exec();
        console.log("Query: \n", { ...course._doc, ID: courseID });
        return { ...course._doc, ID: courseID };
      });
    }
    console.log("Query: \n", user);

    return user;
  },
  async course(parent, args, { Course }, Info) {
    const ID = args.ID;
    const courseInfo = await Course.findOne({ _id: ID }).exec();
    return { ...courseInfo._doc, ID: ID };
  },
  async assignment(parent, args, { Assignment, Grade }, Info) {
    const email = args.email;
    const ID = args.ID;
    const assignment = await Assignment.findOne({ _id: ID }).exec();
    if (assignment !== null) {
      const grade = await Grade.findOne({
        $and: [{ email: email }, { assignmentID: ID }],
      });

      if (grade.graded) {
        assignment.grade = grade.grades.reduce((a, b) => a + b);
      }
    }

    return assignment;
  },
  async problem(parent, args, { Problem }, Info) {
    const ID = args.ID;
    const problem = await Problem.findOne({ _id: ID }).exec();
    return problem;
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
      if (grade !== null) {
        answer = grade.answers[idx];
      }
    }

    return answer;
  },
};

export { Query as default };
