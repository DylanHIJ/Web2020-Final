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
        classTime: $clasTime
        classroom: $classroom
      }
    )
  }
`;
