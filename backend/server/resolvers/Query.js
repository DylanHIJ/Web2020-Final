const Query = {
  async user(parent, args, { User, Course }, info) {
    const email = args.email;
    const password = args.password;
    const token = args.token;
    let user;
    console.log(email, password, token);

    if (token) {
      user = await User.findOne({ token: token }).exec();
      console.log("Query: login with token");
    } else {
      user = await User.findOne({
        $and: [{ email: email }, { password: password }],
      }).exec();
      console.log("Query: login with email");
    }
    console.log("Query: \n", user);

    if (user !== null) {
      user.studentCourses = user.studentCourses.map(
        async (courseID) => await Course.findOne({ _id: courseID }).exec()
      );
      user.teacherCourses = user.teacherCourses.map(
        async (courseID) => await Course.findOne({ _id: courseID }).exec()
      );
    }
    return user;
  },
};

export { Query as default };
