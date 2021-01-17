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
      data: {
        ID: $cid
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
