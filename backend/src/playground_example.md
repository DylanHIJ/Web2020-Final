# GraphQL API example

**Update On 2021/1/17**
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
      name
      teacher
      describe
      classTime
      classroom
      TAs
      students
      assignments
    },
    teacherCourses {
      _id
      name
      teacher
      describe
      classTime
      classroom
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
      name
      teacher
      describe
      classTime
      classroom
      TAs
      students
      assignments
    },
    teacherCourses {
      name
      teacher
      describe
      classTime
      classroom
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
  addUserToCourse(data: {
    email: "b06902024@ntu.edu.tw"
    ID: "6004336b92633ac0f5471064"
    TA: false
  }) {
    type
    message
  }
}

mutation DeleteToCourse_1 {
  deleteUserFromCourse(data: {
    email: "b06902074@ntu.edu.tw"
    ID: "6004336b92633ac0f5471064"
    TA: true
  }) {	
    type
    message
  }
}

mutation DeleteToCourse_2 {
  deleteUserFromCourse(data: {
    email: "b06902024@ntu.edu.tw"
    ID: "6004336b92633ac0f5471064"
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
  createCourse(data: {
    name: "web 1"
    teacher: "Ric"
    describe: "React.js Course"
    classTime: "Tue 9:10~12:10"
    classroom: "EE 112"
    TAs: "b06902074@ntu.edu.tw"
  }) {
    type
    message
  }
}

query QueryCourse_1 {
  course(ID: "6004336b92633ac0f5471064"){
    _id
    name
    teacher
    describe
    classTime
    classroom
    TAs
    students
    assignments {
      _id
      name
    	beginTime
      endTime
      problems
      courseID
    }
  }
}

mutation UpdateCourse_1 {
  updateCourseInfo(ID: "6004336b92633ac0f5471064", data:{
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
  deleteCourse(ID: "6004336b92633ac0f5471064"){
    type
    message
  }
}
```

- Assignment
```javascript
mutation CreateAssignment_1{
  createAssignment(data: {
    courseID: "6004336b92633ac0f5471064"
    name: "HW1"
    beginTime: "2021-01-01T00:00:00.000Z"
    endTime: "2021-01-31T23:59:59.999Z"
  }) {
    type
    message
  }
}

query QueryAssignment_1{
  assignment(ID: "6004339592633ac0f5471065"){
    _id
    name
    beginTime
    endTime
    problems
    courseID
  }
}

mutation DeleteAssignment_1{
  deleteAssignment(ID: "6004339592633ac0f5471065"){
    type
    message
  }
}

mutation UpdataAssignment_1{
  updateAssignmentInfo(ID: "6004339592633ac0f5471065", data: {
    name: "HW2"
    beginTime: "2021-02-01T00:00:00.000Z"
    endTime: "2021-02-28T23:59:59.999Z" 
  }){
    type
    message
  }
}
```

- Problem
```javascript
mutation CreateProblem_1{
  createProblem(data: {
    assignmentID: "6004339592633ac0f5471065"
    type: "TF"
    point: 10
    statement: "PingChiaHuang is Hamster"
    options: ["True", "False"]
    answers: ["True"]
    keywords: []
  }) {
    type
    message
  }
}

mutation CreateProblem_2{
  createProblem(data: {
    assignmentID: "6004339592633ac0f5471065"
    type: "SHORT_QA"
    point: 20
    statement: "Describe Hamster"
    options: []
    answers: ["HAMSTER!"]
    keywords: []
  }) {
    type
    message
  }
}

query QueryProblem_1{
  problem(ID: "600433b192633ac0f5471067"){
    _id
    assignmentID
    type
    point
    statement
    options
    answers
    keywords
    index
  }
}

query QueryProblem_2{
  problem(ID: "600433f792633ac0f5471068"){
    _id
    assignmentID
    type
    point
    statement
    options
    answers
    keywords
    index
  }
}

mutation DeleteProblem_1{
  deleteProblem(ID: "600433b192633ac0f5471067"){
    type
    message
  }
}

mutation UpdataProblem_1{
  updateProblemInfo(ID: "600433b192633ac0f5471067", data: {
    type: "SHORT_QA"
    point: 20
    statement: "Describe Hamster"
    options: []
    answers: ["HAMSTERR!!"]
    keywords: ["HAMSTER"]
  }){
    type
    message
  }
}
```

- Grade
```javascript
mutation UpdateAnswer_1{
  updateAnswer(data: {
    email: "b06902024@ntu.edu.tw"
    assignmentID: "6004339592633ac0f5471065"
    answers: [["True"], ["HAMSTER"]]
  }){
    type
    message
  }
}

query ShortQAProblem_1{
  shortQAProblem(ID: "6004339592633ac0f5471065"){
    _id
    assignmentID
    type
    point
    statement
    options
    answers
    keywords
    index
  }
}

query StudentAnswer_1{
  studentAnswer(query: {
    email: "b06902024@ntu.edu.tw"
    assignmentID: "6004339592633ac0f5471065"
    problemID: "600433f792633ac0f5471068"
  })
}

query GetGrade_1{
  getGrade(email: "b06902024@ntu.edu.tw", ID: "6004339592633ac0f5471065")
}

mutation UpdateGrade_1{
  updateGrade(data: {
    email: "b06902024@ntu.edu.tw"
    assignmentID: "6004339592633ac0f5471065"
    problemID: "600433f792633ac0f5471068"
    givenGrade: 15
  }){
    type
    message
  }
}

mutation ShowGrade_1{
  showGrade(ID: "6004339592633ac0f5471065"){
    type
    message
  }
}
```