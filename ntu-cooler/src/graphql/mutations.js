import { gql } from "apollo-boost";

export const UPDATE_COURSE_INFO = gql`
  mutation updateCourseInfo(
    $cid: ID!
    $name: String!
    $teacher: String!
    $describe: String!
    $classTime: String!
    $classroom: String!
  ) {
    updateCourseInfo(
      CID: $cid
      data: {
        name: $name
        teacher: $teacher
        describe: $describe
        classTime: $classTime
        classroom: $classroom
      }
    ) {
      type
      message
    }
  }
`;

export const ADD_USER_TO_COURSE = gql`
  mutation addUserToCourse($cid: ID!, $email: String!, $TA: Boolean!) {
    addUserToCourse(CID: $cid, data: { email: $email, TA: $TA }) {
      type
      message
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      type
      message
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo(
    $email: String!
    $name: String
    $currentPassword: String
    $newPassword: String
  ) {
    updateUserInfo(
      email: $email
      data: {
        name: $name
        currentPassword: $currentPassword
        newPassword: $newPassword
      }
    ) {
      type
      message
    }
  }
`;

export const CREATE_COURSE = gql`
  mutation createCourse(
    $name: String!
    $teacher: String!
    $describe: String!
    $classTime: String!
    $classroom: String!
    $TA: String!
  ) {
    createCourse(
      TA: $TA
      data: {
        name: $name
        teacher: $teacher
        describe: $describe
        classTime: $classTime
        classroom: $classroom
      }
    ) {
      type
      message
    }
  }
`;

export const UPDATE_ASSIGNMENT_INFO = gql`
  mutation updateAssignmentInfo(
    $aid: ID!
    $name: String!
    $beginTime: String!
    $endTime: String!
    $weight: Float!
  ) {
    updateAssignmentInfo(
      AID: $aid
      data: {
        name: $name
        beginTime: $beginTime
        endTime: $endTime
        weight: $weight
      }
    ) {
      type
      message
    }
  }
`;

export const UPDATE_PROBLEM_INFO = gql`
  mutation updateProblemInfo(
    $pid: ID!
    $type: String!
    $point: Float!
    $statement: String!
    $options: [String]
    $answers: [String]
    $keywords: [keywordInput]
  ) {
    updateProblemInfo(
      PID: $pid
      data: {
        type: $type
        point: $point
        statement: $statement
        options: $options
        answers: $answers
        keywords: $keywords
      }
    ) {
      type
      message
    }
  }
`;

export const CREATE_PROBLEM = gql`
  mutation createProblem(
    $aid: ID!
    $type: String!
    $point: Float!
    $statement: String!
    $options: [String]
    $answers: [String]
    $keywords: [keywordInput]
  ) {
    createProblem(
      AID: $aid
      data: {
        type: $type
        point: $point
        statement: $statement
        options: $options
        answers: $answers
        keywords: $keywords
      }
    ) {
      type
      message
    }
  }
`;

export const CREATE_ASSIGNMENT = gql`
  mutation createAssignment(
    $cid: ID!
    $name: String!
    $beginTime: String!
    $endTime: String!
    $weight: Float!
  ) {
    createAssignment(
      CID: $cid
      data: {
        name: $name
        beginTime: $beginTime
        endTime: $endTime
        weight: $weight
      }
    ) {
      type
      message
    }
  }
`;

export const UPDATE_GRADE = gql`
  mutation updateGrade($email: String!, $pid: ID!, $score: Float!) {
    updateGrade(email: $email, PID: $pid, Score: $score) {
      type
      message
    }
  }
`;
