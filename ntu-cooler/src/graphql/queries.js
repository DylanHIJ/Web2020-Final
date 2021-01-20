import { gql } from "apollo-boost";

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    user(email: $email, password: $password) {
      token
    }
  }
`;

export const CHECK_TOKEN = gql`
  query checkToken($token: String) {
    user(token: $token) {
      token
    }
  }
`;

export const GET_USER_INFO = gql`
  query getUserInfo($token: String!) {
    user(token: $token) {
      name
      email
    }
  }
`;

export const GET_USER_COURSES = gql`
  query getCourses($token: String!) {
    user(token: $token) {
      studentCourses {
        _id
        info {
          name
          teacher
        }
      }
      teacherCourses {
        _id
        info {
          name
          teacher
        }
      }
    }
  }
`;

export const GET_COURSE_INFO = gql`
  query getCourseInfo($cid: ID!) {
    course(CID: $cid) {
      info {
        name
        teacher
        describe
        classTime
        classroom
      }
    }
  }
`;

export const GET_COURSE_ASSIGNMENTS = gql`
  query getCourseAssignments($cid: ID!) {
    course(CID: $cid) {
      assignments {
        _id
        courseID
        info {
          name
          beginTime
          endTime
        }
      }
    }
  }
`;

export const GET_ASSIGNMENT = gql`
  query getAssignment($aid: ID!) {
    assignment(AID: $aid) {
      courseID
      info {
        name
        beginTime
        endTime
        weight
      }
      problems {
        _id
        type
        point
        statement
        options
        answers
        keywords {
          color
          word
        }
        index
      }
    }
  }
`;

export const GET_COURSE_GRADES = gql`
  query getCourseGrades($token: String!, $cid: ID!) {
    allAssignmentGrade(token: $token, CID: $cid) {
      assignmentID
      score
      info {
        name
        weight
        endTime
      }
    }
  }
`;

export const GET_SHORT_QA_PROBLEMS = gql`
  query getShortQAProblems($aid: ID!) {
    shortQAProblem(AID: $aid) {
      problems {
        _id
        statement
        point
        keywords {
          color
          word
        }
        index
      }
      students
    }
  }
`;
