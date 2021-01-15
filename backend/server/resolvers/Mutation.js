const addCourseToUserDB = async (User, email, ID, TA) => {
  let message = { type: undefined, message: undefined };
  if (await User.exists({ email: email })) {
    const userInfo = await User.findOne({ email: email }).exec();
    if (
      userInfo.teacherCourse.includes(ID) ||
      userInfo.studentCourse.includes(ID)
    ) {
      message.type = "Error";
      message.message = "Course Existed";
    } else {
      await User.updateMany(
        { email: email },
        TA
          ? { teacherCourse: [...userInfo.teacherCourse, ID] }
          : { studentCourse: [...userInfo.studentCourse, ID] }
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

const deleteCourseFromUserDB = async (User, email, ID, TA) => {
  let message = { type: undefined, message: undefined };
  if (await User.exists({ email: email })) {
    const userInfo = await User.findOne({ email: email }).exec();
    await User.updateMany(
      { email: email },
      TA
        ? {
            teacherCourse: userInfo.teacherCourse.filter(
              (courseID) => courseID !== ID
            ),
          }
        : {
            studentCourse: userInfo.studentCourse.filter(
              (courseID) => courseID !== ID
            ),
          }
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
    await Course.updateMany(
      { _id: ID },
      TA
        ? { TA: [...courseInfo.TA, email] }
        : { student: [...courseInfo.student, email] }
    );
    message.type = "Success";
    message.message = `Add ${email} to Course ${ID} (${
      TA ? "Teacher" : "Student"
    })`;
  } else {
    message.type = "Error";
    message.message = "Course Not Found";
  }

  return message;
};

const deleteUserFromCourseDB = async (Course, email, ID, TA) => {
  let message = { type: undefined, message: undefined };
  if (await Course.exists({ _id: ID })) {
    const courseInfo = await Course.findOne({ _id: ID }).exec();
    await Course.updateMany(
      { _id: ID },
      TA
        ? {
            TA: courseInfo.TA.filter((userEmail) => userEmail !== email),
          }
        : {
            student: courseInfo.student.filter(
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

const Mutation = {
  // User Mutation
  async createUser(parent, args, { User, pubsub }, info) {
    const user = {
      ...args.data,
    };
    let message = { type: undefined, message: undefined };

    const member = await User.find({ email: user.email }).exec();
    if (member.length > 0) {
      message.type = "Error";
      message.message = "Email Has Been Used";
    } else {
      await User.insertMany([user]);
      message.type = "Success";
      message.message = `Create User ${user.email}`;
    }

    return message;
  },
  async deleteUser(parent, args, { User }, info) {
    const email = args.email;
    let message = { type: undefined, message: undefined };
    if (await User.exists({ email: email })) {
      await User.deleteMany({ email: email });
      message.type = "Success";
      message.message = `Delete ${email}`;
    } else {
      message.type = "Error";
      message.message = "User Not Found";
    }

    return message;
  },
  async updateUserInfo(parent, args, { User }, info) {
    const { email, name, password } = args.data;
    let message = { type: undefined, message: undefined };
    if (await User.exists({ email: email })) {
      if (name !== "") {
        await User.updateMany({ email: email }, { name: name });
        message.type = "Success";
        message.message = `Update name to ${name}`;
      }
      if (password !== "") {
        await User.updateMany({ email: email }, { password: password });
        message.type = "Success";
        message.message = `Update password to ${password}`;
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
    const messageDeleteFromCourse = await deleteUserFromCourseDB(
      Course,
      email,
      ID,
      TA
    );
    if (messageDeleteFromCourse.type === "Success") {
      const messageDeleteFromUser = await deleteCourseFromUserDB(
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
    const course = { ...args.data };
    let message = { type: undefined, message: undefined };

    if (User.exists({ email: course.TA[0] })) {
      const ret = await Course.insertMany([course]);
      await addCourseToUserDB(User, course.TA[0], ret[0]._id, true);
      message.type = "Success";
      message.message = `Create Course ${ret[0]._id}`;
    } else {
      message.type = "Error";
      message.message = "User Not Found";
    }

    return message;
  },
  async deleteCourse(parent, args, { User, Course }, info) {
    const ID = args.ID;
    const courseInfo = await Course.findOne({ _id: ID }).exec();
    let message = { type: undefined, message: undefined };

    if (await Course.exists({ _id: ID })) {
      courseInfo.TA.forEach(async (TAID) => {
        await deleteCourseFromUserDB(User, TAID, ID, true);
      });
      courseInfo.student.forEach(async (studentID) => {
        await deleteCourseFromUserDB(User, studentID, ID, false);
      });
      await Course.deleteMany({ _id: ID });
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
      console.log(ID);
      await Course.updateMany({ _id: ID }, args.data);
      message.type = "Success";
      message.message = `Update Course Info`;
    } else {
      message.type = "Error";
      message.message = "Course Not Found";
    }

    return message;
  },
};

export { Mutation as default };
