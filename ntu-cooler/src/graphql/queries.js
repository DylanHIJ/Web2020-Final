import { gql } from "apollo-boost";

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    user(email: $email, password: $password) {
      token
    }
  }
`;

export const CHECK_TOKEN = gql`
  query checkToken($token: String!) {
    user(token: $token) {
      token
    }
  }
`;

export const GET_USER_COURSES = gql`
  query getCourses($token: String!) {
    user(token: $token) {
      studentCourses {
        _id
        name
        teacher
      }
      teacherCourses {
        _id
        name
        teacher
      }
    }
  }
`;

export const GET_COURSE_INFO = gql`
  query getCourseInfo($cid: ID!) {
    course(ID: $cid) {
      name
      teacher
      classTime
      classroom
      describe
    }
  }
`;

export const GET_COURSE_ASSIGNMENTS = gql`
  query getCourseAssignments($cid: ID!) {
    course(ID: $cid) {
      assignments {
        _id
        courseID
        name
        beginTime
        endTime
        problems
        grade
      }
    }
  }
`;

// export const GET_COURSE_GRADES = gql`
//   query getCourseGrades() {
//       grades()
//   }
// `;
