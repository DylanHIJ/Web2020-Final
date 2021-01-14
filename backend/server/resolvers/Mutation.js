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
    const { email } = args.data;
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
  async updateUserInformation(parent, args, { User }, info) {
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
  async addUserToCourse(parent, args, { User }, info) {
    const { email, ID, TA } = args.data;
    let message = { type: undefined, message: undefined };
    if (await User.exists({ email: email })) {
      const userInfo = await User.find({ email: email }).exec();
      await User.updateMany(
        { email: email },
        TA
          ? { teacherCourse: [...userInfo[0].teacherCourse, ID] }
          : { studentCourse: [...userInfo[0].studentCourse, ID] }
      );
      message.type = "Success";
      message.message = `Add ${email} to Course (${ID}) ${
        TA ? "Teacher" : "Student"
      }`;
    } else {
      message.type = "Error";
      message.message = "User Not Found";
    }

    return message;
  },
  async deleteUserFromCourse(parent, args, { User }, info) {
    const { email, ID, TA } = args.data;
    let message = { type: undefined, message: undefined };
    if (await User.exists({ email: email })) {
      const userInfo = await User.find({ email: email }).exec();
      await User.updateMany(
        { email: email },
        TA
          ? {
              teacherCourse: userInfo[0].teacherCourse.filter(
                (courseID) => courseID !== ID
              ),
            }
          : {
              studentCourse: userInfo[0].studentCourse.filter(
                (courseID) => courseID !== ID
              ),
            }
      );
      message.type = "Success";
      message.message = `Delete ${email} from Course (${ID}) ${
        TA ? "Teacher" : "Student"
      }`;
    } else {
      message.type = "Error";
      message.message = "User Not Found";
    }

    return message;
  },

  // Course Mutation
  async createCourse(parent, args, { User, Course }, info) {
    const course = { ...args.data };
    let message = { type: undefined, message: undefined };
    const ret = await Course.insertMany([course]);

    message.type = "Success";
    message.message = `Create Course ${ret[0]._id}`;

    const userInfo = await User.find({ email: course.TA[0] }).exec();
    await User.updateMany(
      { email: course.TA[0] },
      { teacherCourse: [...userInfo[0].teacherCourse, ret[0]._id] }
    );
    return message;
  },
};

export { Mutation as default };
