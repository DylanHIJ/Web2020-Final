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
      ID: $cid
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
  mutation addUserToCourse($email: String!, $ID: ID!, $TA: Boolean!) {
    addUserToCourse(data: { email: $email, ID: $ID, TA: $TA }) {
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
    $TAs: ID!
  ) {
    createCourse(
      data: {
        name: $name
        teacher: $teacher
        describe: $describe
        classTime: $classTime
        classroom: $classroom
        TAs: $TAs
      }
    ) {
      type
      message
    }
  }
`;
