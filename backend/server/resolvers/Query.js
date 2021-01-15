const Query = {
  async user(parent, args, { User, Course }, info) {
    const email = args.email;
    const password = args.password;
    let user = await User.find({
      $and: [{ email: email }, { password: password }],
    }).exec();

    if (user.length > 0) {
      user[0].studentCourse = user[0].studentCourse.map(async (courseID) => {
        const course = await Course.find({ _id: courseID }).exec();
        return course[0];
      });
      user[0].teacherCourse = user[0].teacherCourse.map(async (courseID) => {
        const course = await Course.find({ _id: courseID }).exec();
        console.log(course);
        return course[0];
      });
    }
    console.log(user);
    return user;
  },
};

export { Query as default };
