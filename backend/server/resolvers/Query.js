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
