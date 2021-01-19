# GraphQL API example

**Update On 2021/1/19**

- User

```javascript
mutation CreateUser_1 {
  createUser(data: {
    name: "kehongying"
    email: "b06902074@ntu.edu.tw"
    password: "12345678"
  }) {
    type
    message
  }
}

mutation CreateUser_2 {
  createUser(data: {
    name: "chiachia"
    email: "b06902024@ntu.edu.tw"
    password: "12345678"
  }) {
    type
    message
  }
}

query QueryUser_1 {
  user(email: "b06902074@ntu.edu.tw", password: "12345678"){
    name,
    email,
    studentCourses {
      _id
      info {
      	name
      	teacher
      	describe
      	classTime
      	classroom
      }
      TAs
      students
      assignments
    },
    teacherCourses {
      _id
      info {
      	name
      	teacher
      	describe
      	classTime
      	classroom
      }
      TAs
      students
      assignments
    },
  }
}

query QueryUser_2 {
  user(email: "b06902024@ntu.edu.tw", password: "12345678"){
    name,
    email,
    studentCourses {
      _id
      info{
      	name
      	teacher
      	describe
      	classTime
      	classroom
      }
      	TAs
      	students
      	assignments
    },
    teacherCourses {
      _id
      info {
      	name
      	teacher
      	describe
      	classTime
      	classroom
      }
      TAs
      students
      assignments
    },
  }
}

mutation UpdateUser_1 {
  updateUserInfo(email: "b06902074@ntu.edu.tw", data: {
    name: "chiachia"
  }) {
    type
    message
  }
}

mutation DeleteUser_1 {
  deleteUser(email: "b06902074@ntu.edu.tw") {
    type
    message
  }
}

mutation AddToCourse_1 {
  addUserToCourse(CID: "6005c2dd9268657df537efb2", data: {
    email: "b06902024@ntu.edu.tw"
    TA: false
  }) {
    type
    message
  }
}

mutation DeleteToCourse_1 {
  deleteUserFromCourse(CID: "6005c2dd9268657df537efb2", data: {
    email: "b06902074@ntu.edu.tw"
    TA: true
  }) {
    type
    message
  }
}

mutation DeleteToCourse_2 {
  deleteUserFromCourse(CID: "6005c2dd9268657df537efb2", data: {
    email: "b06902024@ntu.edu.tw"
    TA: false
  }) {
    type
    message
  }
}
```

- Course

```javascript
mutation CreateCourse_1 {
  createCourse(TA: "b06902074@ntu.edu.tw", data: {
    name: "web 1"
    teacher: "Ric"
    describe: "React.js Course"
    classTime: "Tue 9:10~12:10"
    classroom: "EE 112"
  }) {
    type
    message
  }
}

query QueryCourse_1 {
  course(CID: "6005c2dd9268657df537efb2"){
    _id
    info{
    	name
    	teacher
    	describe
    	classTime
    	classroom
    }
    TAs
    students
    assignments {
      _id
      info {
      	name
    		beginTime
      	endTime
        weight
      }
      problems
      courseID
    }
  }
}

mutation UpdateCourse_1 {
  updateCourseInfo(CID: "6005c2dd9268657df537efb2", data:{
    name: "SP"
    teacher: "PJ"
    describe: "system programing"
    classTime: "Web 9:10~12:10"
    classroom: "CSIE 103"
  }) {
    type
    message
  }
}

mutation DeleteCourse_1 {
  deleteCourse(CID: "6005c2dd9268657df537efb2"){
    type
    message
  }
}
```

- Assignment

```javascript
mutation CreateAssignment_1{
  createAssignment(CID: "6006bb0aec612bb83f08c9c7", data: {
    name: "HW1"
    beginTime: "2021-01-01T00:00:00.000Z"
    endTime: "2021-01-31T23:59:59.999Z"
    weight: 0.2
  }) {
    type
    message
  }
}

query QueryAssignment_1{
  assignment(AID: "6006bc45f9245fba6d8081ac"){
    _id
    info{
    	name
    	beginTime
    	endTime
      weight
    }
    problems
    courseID
  }
}

mutation DeleteAssignment_1{
  deleteAssignment(AID: "6006bc45f9245fba6d8081ac"){
    type
    message
  }
}

mutation UpdataAssignment_1{
  updateAssignmentInfo(AID: "6006bc45f9245fba6d8081ac", data: {
    name: "HW2"
    beginTime: "2021-02-01T00:00:00.000Z"
    endTime: "2021-02-28T23:59:59.999Z"
    weight: 0.2
  }){
    type
    message
  }
}
```

- Problem

```javascript
mutation CreateProblem_1{
  createProblem(AID:"6006bc45f9245fba6d8081ac" data: {
    type: "TF"
    point: 10
    statement: "PingChiaHuang is Hamster"
    answers: ["True"]
  }) {
    type
    message
  }
}

mutation CreateProblem_2{
  createProblem(AID: "6006bc45f9245fba6d8081ac" data: {
    type: "SHORT_QA"
    point: 20
    statement: "Describe Hamster"
    answers: ["HAMSTER!"]
    keywords: [{word: "HAMSTER", color: "Green"}]
  }) {
    type
    message
  }
}

query QueryProblem_1{
  problem(PID: "6006bdd2688dcbbea4c0d4d3"){
    _id
    assignmentID
    type
    point
    statement
    options
    answers
    keywords {
      word
      color
    }
    index
  }
}

query QueryProblem_2{
  problem(PID: "6006bde8688dcbbea4c0d4d4"){
    _id
    assignmentID
    type
    point
    statement
    options
    answers
    keywords {
      word
      color
    }
    index
  }
}

mutation DeleteProblem_1{
  deleteProblem(PID: "6006bdd2688dcbbea4c0d4d3"){
    type
    message
  }
}

mutation UpdataProblem_1{
  updateProblemInfo(PID: "6006bdd2688dcbbea4c0d4d3", data: {
    type: "SHORT_QA"
    point: 20
    statement: "Describe Hamster"
    answers: ["HAMSTERR!!"]
    keywords: [{word: "HAMSTER", color: "Red"}]
  }){
    type
    message
  }
}
```

- Grade

```javascript
mutation UpdateAnswer_1{
  updateAnswer(email: "b06902024@ntu.edu.tw", AID: "6006bc45f9245fba6d8081ac",
    data: [{problemID: "6006bdd2688dcbbea4c0d4d3", answer: ["HAMSTER"]},
    			 {problemID: "6006bde8688dcbbea4c0d4d4", answer: ["HAMSTER"]}]){
    type
    message
  }
}

query ShortQAProblem_1{
  shortQAProblem(AID: "6006bc45f9245fba6d8081ac"){
    _id
    assignmentID
    type
    point
    statement
    options
    answers
    keywords {
      word
      color
    }
    index
  }
}

query StudentAnswer_1{
  studentAnswer(email: "b06902024@ntu.edu.tw" PID: "6006bde8688dcbbea4c0d4d4"){
    problemID
    answer
  }
}

query GetGrade_1{
  grade(email: "b06902024@ntu.edu.tw", AID: "6006bc45f9245fba6d8081ac"){
    assignmentID
    score
  }
}

query GetAllGrade_1{
  allAssignmentGrade(email: "b06902024@ntu.edu.tw", CID: "6006bb0aec612bb83f08c9c7"){
    assignmentID
    score
  }
}

mutation UpdateGrade_1{
  updateGrade(
    email: "b06902024@ntu.edu.tw"
    PID: "6006bde8688dcbbea4c0d4d4"
    Score: 15
  ){
    type
    message
  }
}

mutation ShowGrade_1{
  showGrade(AID: "6006bc45f9245fba6d8081ac"){
    type
    message
  }
}

query GetAnswer_1{
	answer(email: "b06902024@ntu.edu.tw", AID: "6006bc45f9245fba6d8081ac"){
      problemID
      answer
  }
}
```
