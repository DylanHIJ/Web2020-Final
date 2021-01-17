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
        name
        teacher
        describe
        classTime
        classroom
        TAs
        students
        assignments
      }
      teacherCourses {
        name
        teacher
        describe
        classTime
        classroom
        TAs
        students
        assignments
      }
    }
  }
`;

export const GET_COURSE_ASSIGNMENTS = gql`
  query getCourseAssignments($id: ID) {
    assignments(id: $id) {
      name
      beginTime
      endTime
    }
  }
`;

// export const GET_COURSE_GRADES = gql`
//   query getCourseGrades() {
//       grades()
//   }
// `;
