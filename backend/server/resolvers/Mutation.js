const crypto = require("crypto");

const createGrade = async (Grade, email, assignmentID) => {
  const grade = {
    email: email,
    assignmentID: assignmentID,
    grades: [],
    answers: [],
    graded: false,
  };
  await Grade.create(grade);
};

const deleteGrade = async (Grade, email, assignmentID) => {
  await Grade.deleteOne({
    $and: [{ email: email }, { assignmentID: assignmentID }],
  });
};

const addCourseToUserDB = async (User, email, CID, TA) => {
  let message = { type: undefined, message: undefined };
  if (await User.exists({ email: email })) {
    const userInfo = await User.findOne({ email: email }).exec();
    if (
      userInfo.teacherCourses.includes(CID) ||
      userInfo.studentCourses.includes(CID)
    ) {
      message.type = "Error";
      message.message = "Course Existed";
    } else {
      await User.updateOne(
        { email: email },
        TA
          ? { teacherCourses: [...userInfo.teacherCourses, CID] }
          : { studentCourses: [...userInfo.studentCourses, CID] }
      );
      message.type = "Success";
      message.message = `Add Course ${CID} (${
        TA ? "Teacher" : "Student"
      }) to ${email}`;
    }
  } else {
    message.type = "Error";
    message.message = "User Not Found";
  }

  return message;
};

const deleteCourseInUserDB = async (User, email, CID, TA) => {
  let message = { type: undefined, message: undefined };
  if (await User.exists({ email: email })) {
    const userInfo = await User.findOne({ email: email }).exec();
    await User.updateOne(
      { email: email },
      TA
        ? {
            teacherCourses: userInfo.teacherCourses.filter(
              (courseID) => courseID !== CID
            ),
          }
        : {
            studentCourses: userInfo.studentCourses.filter(
              (courseID) => courseID !== CID
            ),
          }
    );
    message.type = "Success";
    message.message = `Delete Course ${CID} (${
      TA ? "Teacher" : "Student"
    }) from ${email}`;
  } else {
    message.type = "Error";
    message.message = "User Not Found";
  }

  return message;
};

const addUserToCourseDB = async (Course, Grade, email, CID, TA) => {
  let message = { type: undefined, message: undefined };
  if (await Course.exists({ _id: CID })) {
    const course = await Course.findOne({ _id: CID }).exec();
    if (course.TAs.includes(email) || course.students.includes(email)) {
      message.type = "Error";
      message.message = "Student Existed";
    } else {
      if (TA) {
        await Course.updateOne({ _id: CID }, { TAs: [...course.TAs, email] });
      } else {
        await Course.updateOne(
          { _id: CID },
          { students: [...course.students, email] }
        );

        for (const assignmentID of course.assignments) {
          await createGrade(Grade, email, assignmentID);
        }
      }
      message.type = "Success";
      message.message = `Add ${email} to Course ${CID} (${
        TA ? "Teacher" : "Student"
      })`;
    }
  } else {
    message.type = "Error";
    message.message = "Course Not Found";
  }

  return message;
};

const deleteUserInCourseDB = async (Course, Grade, email, CID, TA) => {
  let message = { type: undefined, message: undefined };
  if (await Course.exists({ _id: CID })) {
    const course = await Course.findOne({ _id: CID }).exec();
    if (TA) {
      await Course.updateOne(
        { _id: CID },
        {
          TAs: course.TAs.filter((userEmail) => userEmail !== email),
        }
      );
    } else {
      await Course.updateOne(
        { _id: CID },
        {
          students: course.students.filter((userEmail) => userEmail !== email),
        }
      );

      for (const assignmentID of course.assignments) {
        await deleteGrade(Grade, email, assignmentID);
      }
    }
    message.type = "Success";
    message.message = `Delete ${email} from Course ${CID} (${
      TA ? "Teacher" : "Student"
    })`;
  } else {
    message.type = "Error";
    message.message = "Course Not Found";
  }

  return message;
};

const deleteAssignmentDB = async (Course, Assignment, Problem, Grade, AID) => {
  let message = { type: undefined, message: undefined };
  if (await Assignment.exists({ _id: AID })) {
    const assignment = await Assignment.findOne({ _id: AID }).exec();
    const course = await Course.findOne({ _id: assignment.courseID });
    await Course.updateOne(
      { _id: assignment.courseID },
      {
        assignments: course.assignments.filter(
          (assignmentID) => assignmentID !== AID
        ),
      }
    );

    for (const email of course.students) {
      await deleteGrade(Grade, email, AID);
    }

    for (const problemID of assignment.problems) {
      await Problem.deleteOne({ _id: problemID });
    }

    await Assignment.deleteOne({ _id: AID });
    message.type = "Success";
    message.message = `Delete Assignment ${AID}`;
  } else {
    message.type = "Error";
    message.message = "Assignment Not Found";
  }

  return message;
};

const Mutation = {
  // User Mutation
  async createUser(parent, args, { User, pubsub }, info) {
    const user = {
      ...args.data,
      teacherCourses: [],
      studentCourses: [],
    };
    user.token = crypto.randomBytes(20).toString("base64");
    let message = { type: undefined, message: undefined };

    const member = await User.findOne({ email: user.email }).exec();
    if (member !== null) {
      message.type = "Error";
      message.message = "Email Has Been Used";
    } else {
      await User.create(user);
      message.type = "Success";
      message.message = `Create User ${user.email}`;
    }

    return message;
  },
  async deleteUser(parent, args, { User }, info) {
    const email = args.email;
    let message = { type: undefined, message: undefined };
    if (await User.exists({ email: email })) {
      await User.deleteOne({ email: email });
      message.type = "Success";
      message.message = `Delete ${email}`;
    } else {
      message.type = "Error";
      message.message = "User Not Found";
    }

    return message;
  },
  async updateUserInfo(parent, args, { User }, info) {
    const email = args.email;
    const { name, currentPassword, newPassword } = args.data;
    let message = { type: undefined, message: undefined };
    if (await User.exists({ email: email })) {
      if (name) {
        await User.updateOne({ email: email }, { name: name });
        message.type = "Success";
        message.message = `Update name to ${name}`;
      }
      if (currentPassword && newPassword) {
        if (
          await User.exists({
            $and: [{ email: email }, { password: currentPassword }],
          })
        ) {
          await User.updateOne({ email: email }, { password: newPassword });
          message.type = "Success";
          message.message = `Update Password`;
        } else {
          message.type = "Error";
          message.message = "Wrong Password";
        }
      }
    } else {
      message.type = "Error";
      message.message = "User Not Found";
    }

    return message;
  },
  async addUserToCourse(parent, args, { User, Course, Grade }, info) {
    const CID = args.CID;
    const { email, TA } = args.data;
    const message = { type: undefined, message: undefined };
    const messageAddToCourse = await addUserToCourseDB(
      Course,
      Grade,
      email,
      CID,
      TA
    );
    if (messageAddToCourse.type === "Success") {
      const messageAddToUser = await addCourseToUserDB(User, email, CID, TA);
      if (messageAddToUser.type === "Success") {
        message.type = "Success";
        message.message = `Add User ${email} to Course ${CID}`;
      } else {
        message.type = "Error";
        message.message = messageAddToUser.message;
      }
    } else {
      message.type = "Error";
      message.message = messageAddToCourse.message;
    }

    return message;
  },
  async deleteUserFromCourse(parent, args, { User, Course, Grade }, info) {
    const CID = args.CID;
    const { email, TA } = args.data;
    const message = { type: undefined, message: undefined };
    const messageDeleteFromCourse = await deleteUserInCourseDB(
      Course,
      Grade,
      email,
      CID,
      TA
    );
    if (messageDeleteFromCourse.type === "Success") {
      const messageDeleteFromUser = await deleteCourseInUserDB(
        User,
        email,
        CID,
        TA
      );
      if (messageDeleteFromUser.type === "Success") {
        message.type = "Success";
        message.message = `Delete User ${email} from Course ${CID}`;
      } else {
        message.type = "Error";
        message.message = messageDeleteFromUser.message;
      }
    } else {
      message.type = "Error";
      message.message = messageDeleteFromCourse.message;
    }

    return message;
  },

  // Course Mutation
  async createCourse(parent, args, { User, Course }, info) {
    const TA = args.TA;
    const course = {
      info: { ...args.data },
      students: [],
      assignments: [],
      TAs: [TA],
    };
    let message = { type: undefined, message: undefined };

    if (User.exists({ email: course.TAs })) {
      const ret = await Course.create(course);
      await addCourseToUserDB(User, course.TAs[0], ret._id.toString(), true);
      message.type = "Success";
      message.message = `Create Course ${ret._id}`;
    } else {
      message.type = "Error";
      message.message = "User Not Found";
    }

    return message;
  },
  async deleteCourse(
    parent,
    args,
    { User, Course, Assignment, Problem, Grade },
    info
  ) {
    const CID = args.CID;
    const course = await Course.findOne({ _id: CID }).exec();
    let message = { type: undefined, message: undefined };

    if (await Course.exists({ _id: CID })) {
      for (const TAID of course.TAs) {
        await deleteCourseInUserDB(User, TAID, CID, true);
      }
      for (const studentID of course.students) {
        await deleteCourseInUserDB(User, studentID, CID, false);
      }
      for (const assignmentID of course.assignments) {
        await deleteAssignmentDB(
          Course,
          Assignment,
          Problem,
          Grade,
          assignmentID
        );
      }

      await Course.deleteOne({ _id: CID });
      message.type = "Success";
      message.message = `Delete Course ${CID}`;
    } else {
      message.type = "Error";
      message.message = "Course Not Found";
    }

    return message;
  },
  async updateCourseInfo(parent, args, { Course }, info) {
    const CID = args.CID;
    let message = { type: undefined, message: undefined };

    if (await Course.exists({ _id: CID })) {
      await Course.updateOne({ _id: CID }, { info: args.data });
      message.type = "Success";
      message.message = `Update Course Info`;
    } else {
      message.type = "Error";
      message.message = "Course Not Found";
    }

    return message;
  },

  // Assignment Mutation
  async createAssignment(parent, args, { Assignment, Grade, Course }, info) {
    const CID = args.CID;
    const assignment = { info: { ...args.data }, problems: [], courseID: CID };
    let message = { type: undefined, message: undefined };
    if (await Course.exists({ _id: CID })) {
      const ret = await Assignment.create(assignment);
      const course = await Course.findOne({
        _id: CID,
      }).exec();
      await Course.updateOne(
        { _id: CID },
        { assignments: [...course.assignments, ret._id.toString()] }
      );

      for (const email of course.students) {
        await createGrade(Grade, email, ret._id.toString());
      }

      message.type = "Success";
      message.message = `Create Assignment ${ret._id}`;
    } else {
      message.type = "Error";
      message.message = "Course Not Found";
    }

    return message;
  },
  async deleteAssignment(
    parent,
    args,
    { Assignment, Course, Grade, Problem },
    info
  ) {
    const AID = args.AID;
    const message = await deleteAssignmentDB(
      Course,
      Assignment,
      Problem,
      Grade,
      AID
    );

    return message;
  },
  async updateAssignmentInfo(parent, args, { Assignment }, Info) {
    const AID = args.AID;
    let message = { type: undefined, message: undefined };
    if (await Assignment.exists({ _id: AID })) {
      await Assignment.updateOne({ _id: AID }, { info: args.data });
      message.type = "Success";
      message.message = `Update Assignment Info`;
    } else {
      message.type = "Error";
      message.message = "Assignment Not Found";
    }

    return message;
  },

  // Problem Mutation
  async createProblem(
    parent,
    args,
    { Problem, Assignment, Grade, Course },
    Info
  ) {
    const problem = args.data;
    let message = { type: undefined, message: undefined };
    if (await Assignment.exists({ _id: problem.assignmentID })) {
      const ret = await Problem.create(problem);
      const assignment = await Assignment.findOne({
        _id: problem.assignmentID,
      });
      await Assignment.updateOne(
        { _id: problem.assignmentID },
        { problems: [...assignment.problems, ret._id.toString()] }
      );

      const course = await Course.findOne({ _id: assignment.courseID }).exec();
      for (const email of course.students) {
        const grade = await Grade.findOne({
          $and: [{ email: email }, { assignmentID: problem.assignmentID }],
        }).exec();
        await Grade.updateOne(
          { $and: [{ email: email }, { assignmentID: problem.assignmentID }] },
          { grades: [...grade.grades, 0], answers: [...grade.answers, []] }
        );
      }

      message.type = "Success";
      message.message = `Create Problem ${ret._id}`;
    } else {
      message.type = "Error";
      message.message = "Assignment Not Found";
    }

    return message;
  },
  async deleteProblem(
    parent,
    args,
    { Problem, Assignment, Grade, Course },
    info
  ) {
    const PID = args.PID;
    let message = { type: undefined, message: undefined };
    if (await Problem.exists({ _id: PID })) {
      const problem = await Problem.findOne({ _id: PID }).exec();
      const assignment = await Assignment.findOne({
        _id: problem.assignmentID,
      });

      const idx = assignment.problems.indexOf(PID);
      await Assignment.updateOne(
        { _id: problem.assignmentID },
        {
          problems: assignment.problems.filter(
            (problemID) => problemID !== PID
          ),
        }
      );

      const course = await Course.findOne({ _id: assignment.courseID });
      for (const email of course.students) {
        const grade = await Grade.findOne({
          $and: [{ email: email }, { assignmentID: problem.assignmentID }],
        }).exec();
        await Grade.updateOne(
          { $and: [{ email: email }, { assignmentID: problem.assignmentID }] },
          {
            grades: grade.grades.filter((_, i) => i !== idx),
            answers: grade.answers.filter((_, i) => i !== idx),
          }
        );
      }

      await Problem.deleteOne({ _id: PID });
      message.type = "Success";
      message.message = `Delete Problem ${PID}`;
    } else {
      message.type = "Error";
      message.message = "Problem Not Found";
    }

    return message;
  },
  async updateProblemInfo(parent, args, { Problem }, Info) {
    const PID = args.PID;
    let message = { type: undefined, message: undefined };
    if (await Problem.exists({ _id: PID })) {
      await Problem.updateOne({ _id: PID }, args.data);
      message.type = "Success";
      message.message = `Update Problem Info`;
    } else {
      message.type = "Error";
      message.message = "Problem Not Found";
    }

    return message;
  },

  // Grade Mutation
  async updateAnswer(parent, args, { Grade }, Info) {
    const { email, assignmentID, answers } = args.data;
    let message = { type: undefined, message: undefined };
    if (
      await Grade.exists({
        $and: [{ email: email }, { assignmentID: assignmentID }],
      })
    ) {
      await Grade.updateOne(
        {
          $and: [{ email: email }, { assignmentID: assignmentID }],
        },
        { answers: answers }
      );
      message.type = "Success";
      message.message = `${email} Update Assignment ${assignmentID}'s Answer`;
    } else {
      message.type = "Error";
      message.message = "Crash";
    }
    return message;
  },
  async updateGrade(parent, args, { Assignment, Grade }) {
    const { email, assignmentID, problemID, givenGrade } = args.data;
    let message = { type: undefined, message: undefined };

    if (
      await Grade.exists({
        $and: [{ email: email }, { assignmentID: assignmentID }],
      })
    ) {
      if (await Assignment.exists({ _id: assignmentID })) {
        const assignment = await Assignment.findOne({
          _id: assignmentID,
        }).exec();
        const idx = assignment.problems.indexOf(problemID);
        if (idx !== -1) {
          const grade = await Grade.findOne({
            $and: [{ email: email }, { assignmentID: assignmentID }],
          }).exec();
          await Grade.updateOne(
            {
              $and: [{ email: email }, { assignmentID: assignmentID }],
            },
            {
              grades: grade.grades.map((originGrade, i) =>
                i === idx ? givenGrade : originGrade
              ),
            }
          );
          message.type = "Success";
          message.message = "Update Grade";
        } else {
          message.type = "Error";
          message.message = "Problem Not Found";
        }
      } else {
        message.type = "Error";
        message.message = "Assignment Not Found";
      }
    } else {
      message.type = "Error";
      message.message = "Crash";
    }

    return message;
  },
  async showGrade(parent, args, { Assignment, Problem, Grade }, info) {
    const AID = args.AID;
    let message = { type: undefined, message: undefined };
    if (await Assignment.exists({ _id: AID })) {
      const grade = await Grade.find({ assignmentID: AID }).exec();

      for (const studentGrade of grade) {
        const assignment = await Assignment.findOne({
          _id: studentGrade.assignmentID,
        });
        let grades = [];
        for (const [idx, problemID] of assignment.problems.entries()) {
          const problem = await Problem.findOne({ _id: problemID }).exec();
          const studentAns = studentGrade.answers[idx];
          const Ans = problem.answers;

          let points = 0;
          switch (problem.type) {
            case "TF":
            case "MULTIPLE_CHOICE":
              console.log(studentAns, Ans);
              points = studentAns[0] === Ans[0] ? problem.point : 0;
              break;
            case "CHECKBOX":
              const difference = Ans.filter(
                (x) => !studentAns.includes(x)
              ).concat(studentAns.filter((x) => !Ans.includes(x)));
              points = Math.max(
                1 -
                  ((2 * difference.length) / problem.options.length) *
                    problem.point,
                0
              );
              break;
            case "SHORT_QA":
              points = studentGrade.grades[idx];
              break;
            default:
              message.type = "Error";
              message.message = "Problem Type Not Found";
          }
          grades.push(points);
        }

        await Grade.updateOne(
          { $and: [{ email: studentGrade.email }, { assignmentID: AID }] },
          { grades: grades, graded: true }
        );
      }

      message.type = "Success";
      message.message = `Show Assignment ${AID}'s Grade`;
    } else {
      message.type = "Error";
      message.message = "Assignment Not Found";
    }

    return message;
  },
};

export { Mutation as default };
