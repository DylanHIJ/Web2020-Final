const crypto = require("crypto");

const addCourseToUserDB = async (User, email, ID, TA) => {
  let message = { type: undefined, message: undefined };
  if (await User.exists({ email: email })) {
    const userInfo = await User.findOne({ email: email }).exec();
    if (
      userInfo.teacherCourses.includes(ID) ||
      userInfo.studentCourses.includes(ID)
    ) {
      message.type = "Error";
      message.message = "Course Existed";
    } else {
      await User.updateOne(
        { email: email },
        TA
          ? { teacherCourses: [...userInfo.teacherCourses, ID] }
          : { studentCourses: [...userInfo.studentCourses, ID] }
      );
      message.type = "Success";
      message.message = `Add Course ${ID} (${
        TA ? "Teacher" : "Student"
      }) to ${email}`;
    }
  } else {
    message.type = "Error";
    message.message = "User Not Found";
  }

  return message;
};

const deleteCourseInUserDB = async (User, email, ID, TA) => {
  let message = { type: undefined, message: undefined };
  if (await User.exists({ email: email })) {
    const userInfo = await User.findOne({ email: email }).exec();
    await User.updateOne(
      { email: email },
      TA
        ? {
            teacherCourses: userInfo.teacherCourses.filter(
              (courseID) => courseID !== ID
            ),
          }
        : {
            studentCourses: userInfo.studentCourses.filter(
              (courseID) => courseID !== ID
            ),
          }
    );
    console.log(
      `Mutation\n`,
      userInfo,
      TA ? userInfo.teacherCourses : userInfo.studentCourses,
      TA
        ? userInfo.teacherCourses.filter((courseID) => courseID !== ID)
        : userInfo.studentCourses.filter((courseID) => courseID !== ID),
      (TA
        ? userInfo.teacherCourses.filter((courseID) => courseID !== ID)
        : userInfo.studentCourses.filter((courseID) => courseID !== ID))[0] ===
        (TA ? userInfo.teacherCourses : userInfo.studentCourses)[0]
    );
    message.type = "Success";
    message.message = `Delete Course ${ID} (${
      TA ? "Teacher" : "Student"
    }) from ${email}`;
  } else {
    message.type = "Error";
    message.message = "User Not Found";
  }

  return message;
};

const addUserToCourseDB = async (Course, email, ID, TA) => {
  let message = { type: undefined, message: undefined };
  if (await Course.exists({ _id: ID })) {
    const courseInfo = await Course.findOne({ _id: ID }).exec();
    if (courseInfo.TAs.includes(email) || courseInfo.students.includes(email)) {
      message.type = "Error";
      message.message = "Student Existed";
    } else {
      await Course.updateOne(
        { _id: ID },
        TA
          ? { TAs: [...courseInfo.TAs, email] }
          : { students: [...courseInfo.students, email] }
      );
      message.type = "Success";
      message.message = `Add ${email} to Course ${ID} (${
        TA ? "Teacher" : "Student"
      })`;
    }
  } else {
    message.type = "Error";
    message.message = "Course Not Found";
  }

  return message;
};

const deleteUserInCourseDB = async (Course, email, ID, TA) => {
  let message = { type: undefined, message: undefined };
  if (await Course.exists({ _id: ID })) {
    const courseInfo = await Course.findOne({ _id: ID }).exec();
    await Course.updateOne(
      { _id: ID },
      TA
        ? {
            TAs: courseInfo.TAs.filter((userEmail) => userEmail !== email),
          }
        : {
            students: courseInfo.students.filter(
              (userEmail) => userEmail !== email
            ),
          }
    );
    message.type = "Success";
    message.message = `Delete ${email} from Course ${ID} (${
      TA ? "Teacher" : "Student"
    })`;
  } else {
    message.type = "Error";
    message.message = "Course Not Found";
  }

  return message;
};

const deleteAssignmentDB = async (Course, Assignment, Problem, Grade, ID) => {
  let message = { type: undefined, message: undefined };
  if (await Assignment.exists({ _id: ID })) {
    const assignment = await Assignment.findOne({ _id: ID }).exec();
    const course = await Course.findOne({ _id: assignment.courseID });
    await Course.updateOne(
      { _id: ID },
      {
        assignments: course.assignments.filter(
          (assignmentID) => assignmentID !== ID
        ),
      }
    );

    course.students.forEach(async (email) => {
      await Grade.deleteOne({
        $and: [{ email: email }, { assignmentID: ID }],
      });
    });

    assignment.problems.forEach(async (problemID) => {
      await Problem.deleteOne({ _id: problemID });
    });

    await Assignment.deleteOne({ _id: ID });
    message.type = "Success";
    message.message = `Delete Assignment ${ID}`;
  } else {
    message.type = "Error";
    message.message = "Assignment Not Found";
  }
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
    const { email, name, currentPassword, newPassword } = args.data;
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
  async addUserToCourse(parent, args, { User, Course }, info) {
    const { email, ID, TA } = args.data;
    const message = { type: undefined, message: undefined };
    const messageAddToCourse = await addUserToCourseDB(Course, email, ID, TA);
    if (messageAddToCourse.type === "Success") {
      const messageAddToUser = await addCourseToUserDB(User, email, ID, TA);
      if (messageAddToUser.type === "Success") {
        message.type = "Success";
        message.message = `Add User ${email} to Course ${ID}`;
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
  async deleteUserFromCourse(parent, args, { User, Course }, info) {
    const { email, ID, TA } = args.data;
    const message = { type: undefined, message: undefined };
    const messageDeleteFromCourse = await deleteUserInCourseDB(
      Course,
      email,
      ID,
      TA
    );
    if (messageDeleteFromCourse.type === "Success") {
      const messageDeleteFromUser = await deleteCourseInUserDB(
        User,
        email,
        ID,
        TA
      );
      if (messageDeleteFromUser.type === "Success") {
        message.type = "Success";
        message.message = `Delete User ${email} from Course ${ID}`;
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
    const course = { ...args.data, students: [], assignments: [] };
    let message = { type: undefined, message: undefined };

    if (User.exists({ email: course.TAs })) {
      course.TAs = [course.TAs];
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
    const ID = args.ID;
    const course = await Course.findOne({ _id: ID }).exec();
    let message = { type: undefined, message: undefined };

    if (await Course.exists({ _id: ID })) {
      course.TAs.forEach(async (TAID) => {
        await deleteCourseInUserDB(User, TAID, ID, true);
      });
      course.students.forEach(async (studentID) => {
        await deleteCourseInUserDB(User, studentID, ID, false);
      });
      course.assignments.forEach(async (assignmentID) => {
        await deleteAssignmentDB(
          Course,
          Assignment,
          Problem,
          Grade,
          assignmentID
        );
      });

      await Course.deleteOne({ _id: ID });
      message.type = "Success";
      message.message = `Delete Course ${ID}`;
    } else {
      message.type = "Error";
      message.message = "Course Not Found";
    }

    return message;
  },
  async updateCourseInfo(parent, args, { Course }, info) {
    const { ID } = args.data;
    let message = { type: undefined, message: undefined };

    if (await Course.exists({ _id: ID })) {
      await Course.updateOne({ _id: ID }, args.data);
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
    const assignment = { ...args.data, problems: [] };
    let message = { type: undefined, message: undefined };
    if (await Course.exists({ _id: assignment.courseID })) {
      const ret = await Assignment.create(assignment);
      const course = await Course.findOne({
        _id: assignment.courseID,
      }).exec();
      await Course.updateOne(
        { _id: assignment.courseID },
        { assignments: [...course.assignments, ret._id.toString()] }
      );

      course.students.forEach(async (email) => {
        const grade = {
          email: email,
          assignmentID: ret._id.toString(),
          grades: [],
          answers: [],
          graded: false,
        };
        await Grade.create(grade);
      });

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
    const ID = args.ID;
    const message = await deleteAssignmentDB(
      Course,
      Assignment,
      Problem,
      Grade,
      ID
    );

    return message;
  },
  async updateAssignmentInfo(parent, args, { Assignment }, Info) {
    const { ID } = args.ID;
    let message = { type: undefined, message: undefined };
    if (await Assignment.exists({ _id: ID })) {
      await Assignment.updateOne({ _id: ID }, args.data);
      message.type = "Success";
      message.message = `Update Problem Info`;
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
      const assignment = await Assignment.findOned({
        _id: problem.assignmentID,
      });
      await Assignment.updateOne(
        { _id: problem.assignmentID },
        { problems: [...assignment.problems, ret._id.toString()] }
      );

      const course = await Course.findOne({ _id: assignment.courseID }).exec();
      course.students.forEach(async (email) => {
        const grade = await Grade.findOne({
          $and: [{ email: email }, { assignmentID: problem.assignmentID }],
        }).exec();
        await Grade.updateOne(
          { $and: [{ email: email }, { assignmentID: problem.assignmentID }] },
          { grades: [...grade.grades, 0], answers: [...grade.answers, []] }
        );
      });

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
    const ID = args.ID;
    let message = { type: undefined, message: undefined };
    if (await Problem.exists({ _id: ID })) {
      const problem = await Problem.findOne({ _id: ID }).exec();
      const assignment = await Assignment.findOne({
        _id: problem.assignmentID,
      });

      const idx = assignment.problems.indexOf(ID);
      await Assignment.updateOne(
        { _id: ID },
        {
          problems: assignment.problems.filter((problemID) => problemID !== ID),
        }
      );

      const course = await Course.findOne({ _id: assignment.courseID });
      course.students.forEach(async (email) => {
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
      });

      await Problem.deleteOne({ _id: ID });
      message.type = "Success";
      message.message = `Delete Problem ${ID}`;
    } else {
      message.type = "Error";
      message.message = "Problem Not Found";
    }

    return message;
  },
  async updateProblemInfo(parent, args, { Problem }, Info) {
    const { ID } = args.ID;
    let message = { type: undefined, message: undefined };
    if (await Problem.exists({ _id: ID })) {
      await Problem.updateOne({ _id: ID }, args.data);
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
      message.message = `${email} Update Assignment ${assignmentID}`;
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
        const assignment = Assignment.findOne({ _id: assignmentID }).exec();
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
    const ID = args.ID;
    let message = { type: undefined, message: undefined };
    if (await Assignment.exists({ _id: ID })) {
      const grade = Grade.find({ assignmentID: ID }).exec();

      grade.forEach(async (studentGrade) => {
        const assignment = Assignment.findOne({
          _id: studentGrade.assignmentID,
        });
        let grades = [];
        assignment.problems.forEach(async (problemID, idx) => {
          const problem = await Problem.findOne({ _id: problemID }).exec();
          const studentAns = studentGrade.answers[idx];
          const Ans = problem.answers[idx];
          let points = 0;
          switch (problem.type) {
            case "TF":
            case "MULTIPLE_CHOICE":
              points = studentAns[0] === Ans[0] ? problem.point : 0;
              break;
            case "CHECKBOX":
              let flag = true;
              Ans.forEach((ans, i) => {
                if (ans !== studentAns[i]) {
                  flag = false;
                }
              });
              points = flag ? problem.point : 0;
              break;
            case "SHORT_QA":
              points = studentGrade.grades[idx];
              break;
            default:
              message.type = "Error";
              message.message = "Problem Type Not Found";
          }
          grades.push(points);
        });

        await Grade.updateOne(
          { $and: [{ email: studentGrade.email }, { assignmentID: ID }] },
          { grades: grades, graded: true }
        );
      });

      message.type = "Success";
      message.message = `Show Assignment ${ID}'s Grade`;
    } else {
      message.type = "Error";
      message.message = "Assignment Not Found";
    }

    return message;
  },
};

export { Mutation as default };
