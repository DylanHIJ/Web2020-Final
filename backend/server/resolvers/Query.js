const getProblemIndex = async (Assignment, assignmentID, problemID) => {
  const assignment = await Assignment.findOne({
    _id: assignmentID,
  }).exec();

  if (assignment !== null) {
    return assignment.problems.indexOf(problemID);
  }

  return -1;
};

const computeGrade = async (Grade, email, assignmentID) => {
  const grade = await Grade.findOne({
    $and: [{ email: email }, { assignmentID: assignmentID }],
  }).exec();

  let point = null;
  if (grade !== null && grade.graded) {
    grade.grades.forEach((score) => {
      point += score.score;
    });
  }

  return point;
};

const tokenToEmail = async (User, token) => {
  const user = await User.findOne({ token: token });
  return user ? user.email : null;
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
      const studentCourses = [];
      for (let courseID of user.studentCourses) {
        const course = await Course.findOne({ _id: courseID }).exec();
        studentCourses.push(course);
      }
      user.studentCourses = studentCourses;

      const teacherCourses = [];
      for (let courseID of user.teacherCourses) {
        const course = await Course.findOne({ _id: courseID }).exec();
        teacherCourses.push(course);
      }
      user.teacherCourses = teacherCourses;
    }
    console.log("Query: \n", user);

    return user;
  },
  async course(parent, args, { Course, Assignment }, Info) {
    const CID = args.CID;
    const course = await Course.findOne({ _id: CID }).exec();
    if (course !== null) {
      const courseAssignment = [];
      for (let assignmentID of course.assignments) {
        const assignment = await Assignment.findOne({
          _id: assignmentID,
        }).exec();
        courseAssignment.push(assignment);
      }

      course.assignments = courseAssignment;
    }

    return course;
  },
  async assignment(parent, args, { Assignment, Problem }, Info) {
    const AID = args.AID;
    const assignment = await Assignment.findOne({ _id: AID }).exec();

    if (assignment !== null) {
      const assignmentProblem = [];
      for (let problemID of assignment.problems) {
        const problem = await Problem.findOne({ _id: problemID }).exec();
        const idx = getProblemIndex(Assignment, AID, problemID);
        assignmentProblem.push({ ...problem._doc, index: idx });
      }

      assignment.problems = assignmentProblem;
    }

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
  async shortQAProblem(parent, args, { Course, Assignment, Problem }, info) {
    const AID = args.AID;
    const assignment = await Assignment.findOne({ _id: AID }).exec();
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

      const course = await Course.findOne({ _id: assignment.courseID }).exec();
      ret = { problems: ret, students: course.students };
    }

    return ret;
  },
  async studentAnswer(parent, args, { Problem, Grade }, info) {
    const email = args.email;
    const PID = args.PID;
    let answer = null;

    const problem = await Problem.findOne({ _id: PID }).exec();
    if (problem !== null) {
      const grade = await Grade.findOne({
        $and: [{ email: email }, { assignmentID: problem.assignmentID }],
      }).exec();
      if (grade !== null) {
        for (let ans of grade.answers) {
          if (ans.problemID === PID) {
            answer = ans;
          }
        }
      }
    }

    return answer;
  },
  async grade(parent, args, { Grade }, info) {
    const email = args.email;
    const AID = args.AID;

    const point = await computeGrade(Grade, email, AID);
    return { assignmentID: AID, score: point };
  },
  async answer(parent, args, { User, Grade }, info) {
    const token = args.token;
    const AID = args.AID;
    const email = await tokenToEmail(User, token);

    const grade = await Grade.findOne({
      $and: [{ email: email }, { assignmentID: AID }],
    }).exec();
    if (grade !== null) {
      return grade.answers;
    }

    return null;
  },
  async allAssignmentGrade(
    parent,
    args,
    { User, Course, Assignment, Grade },
    info
  ) {
    const token = args.token;
    const CID = args.CID;

    let ret = null;
    const email = await tokenToEmail(User, token);
    if (email !== null) {
      const course = await Course.findOne({ _id: CID }).exec();
      if (course !== null) {
        ret = [];
        for (let assignmentID of course.assignments) {
          const assignment = await Assignment.findOne({
            _id: assignmentID,
          }).exec();
          if (assignment !== null) {
            const point = await computeGrade(Grade, email, assignmentID);
            ret.push({
              assignmentID: assignmentID,
              score: point,
              info: assignment.info,
            });
          }
        }
      }
    }

    return ret;
  },
};

export { Query as default };
