    var rowTemplate;
    var tbody;
    var addCourseBtn;
    var updateBtn;
    var $usernameFld;
    var $passwordFld;
    var $firstnameFld;
    var $lastnameFld;
    var $roleFld;
    var users=[];
    var userService = new AdminUserServiceClient();

    function createUser(user) {
        userService.createUser(user)
            .then(function (actualUser) {
                users.push(actualUser)
                console.log("Actual user",actualUser)
                renderUsers(users);

            })


    }

    function renderUsers(users) {
        tbody.empty();
        console.log("Hi I am here render users",users)
        for (var u in users) {
            user = users[u];
            tbody
                .prepend(
                    `<tr class="wbdv-template wbdv-user">
                <td class="wbdv-username">${user.username}</td>
                <td class="wbdv-password  displaypassword"></td>
                <td class="wbdv-first-name">${user.firstname}</td>
                <td class="wbdv-last-name">${user.lastname}</td>
                <td class="wbdv-role">${user.role}</td>
                <td class="wbdv-actions">
                    <span class="pull-right">
                      <button><i class="fa-2x fa fa-times wbdv-remove-btn" id="${u}"></i></button>
                      <button><i class="fa-2x fa fa-pencil wbdv-select-btn" id="${user._id}"></i></button>
                    </span>
                </td>
            </tr>`
                )
        }
        jQuery(".wbdv-remove-btn")
            .click(deleteUser)
        jQuery(".wbdv-select-btn")
            .click(selectUser)
    }

    function deleteUser(event) {
        renderUsers(users)
        var deleteBtn=jQuery(event.target)
        var theIndex = deleteBtn.attr("id")
        var theId = users[theIndex]._id
        console.log("the attribute id",theIndex)
        console.log("users are:",users)
        console.log("the original id",theId)
        // console.log(theId)
        userService.deleteUser(theId)
            .then(function (status) {
                users.splice(theIndex,1)
                renderUsers(users)
            })
    }

    var selectedUser = null
    function selectUser(event) {
        renderUsers(users)
        var selectBtn = jQuery(event.target)
        var theId = selectBtn.attr("id")
        selectedUser = users.find(user => user._id === theId)
        console.log(selectedUser)
        $usernameFld.val(selectedUser.username)
        $passwordFld.val(selectedUser.password)
        $firstnameFld.val(selectedUser.firstname)
        $lastnameFld.val(selectedUser.lastname)
        $roleFld.val(selectedUser.role)
    }

    function updateUser() {
        console.log(selectedUser)
        selectedUser.username = $usernameFld.val()
        selectedUser.password = $passwordFld.val()
        selectedUser.firstname = $firstnameFld.val()
        selectedUser.lastname = $lastnameFld.val()
        selectedUser.role = $roleFld.val()
        userService.updateUser(selectedUser._id, selectedUser)
            .then(function (status) {
                var index = users.findIndex(user => user._id === selectedUser._id)
                users[index] = selectedUser
                renderUsers(users)
            })
        $usernameFld.val("")
        $passwordFld.val("")
        $usernameFld.val("")
        $firstnameFld.val("")
        $lastnameFld.val("")
        $roleFld.val("")
    }

    function main(){
        $usernameFld=$(".wbdv-username-fld");
        $passwordFld=$(".wbdv-password-fld");
        $firstnameFld=$(".wbdv-firstName-fld");
        $lastnameFld=$(".wbdv-lastName-fld");
        $roleFld=$(".wbdv-role-fld");
        rowTemplate=jQuery('.wbdv-template');
        tbody=jQuery('tbody');
        userService.findAllUsers();
        renderUsers(users);
        addCourseBtn=jQuery('.wbdv-create-btn');
        // createUser(user)
        // console.log(users)
        addCourseBtn.click(
            function () {
                createUser({
                    username: $usernameFld.val(),
                    password: $passwordFld.val(),
                    firstname: $firstnameFld.val(),
                    lastname: $lastnameFld.val() ,
                    role: $roleFld.val()})
                    $usernameFld.val("")
                    $passwordFld.val("")
                    $firstnameFld.val("")
                    $lastnameFld.val("")
                    $roleFld.val("")
            }
        )
        updateBtn=$('.wbdv-update-btn')
        updateBtn.click(updateUser)
        userService.findAllUsers()
            .then(function (actualUsersFromServer) {
                users = actualUsersFromServer
                renderUsers(users)
            })
        // jQuery(".wbdv-remove-btn")
        //     .click(deleteUser)
        // jQuery(".wbdv-select-btn")
        //     .click(selectUser)
    }


jQuery(main);


/*
var titleFld
var $seatsFld
var $semesterFld
var $createBtn
var addCourseBtn
var theTableBody
var $updateBtn
var courseService = new CourseServiceClient()

function addCourse() {
  createCourse({
    title: 'NEW COURSE',
    seats: 100,
    semester: 'Fall'
  })
}
var courses = [];

function createCourse(course) {
  courseService.createCourse(course)
    .then(function (actualCourse) {
      courses.push(actualCourse)
      renderCourses(courses)
    })
}

// createCourse({title: 'CS1111', seats: 11, semester: 'Fall'})
// createCourse({title: 'CS2222', seats: 22, semester: 'Fall'})
// createCourse({title: 'CS3333', seats: 33, semester: 'Fall'})
// createCourse({title: 'CS4444', seats: 44, semester: 'Fall'})

var selectedCourse = null
function selectCourse(event) {
  var selectBtn = jQuery(event.target)
  var theId = selectBtn.attr("id")
  selectedCourse = courses.find(course => course._id === theId)
  titleFld.val(selectedCourse.title)
  $seatsFld.val(selectedCourse.seats)
  $semesterFld.val(selectedCourse.semester)
}

function deleteCourse(event) {
    console.log(event.target)
    var deleteBtn = jQuery(event.target)
    var theClass = deleteBtn.attr("class")
    var theIndex = deleteBtn.attr("id")
    var theId = courses[theIndex]._id
    console.log(theClass)
    console.log(theIndex)

    courseService.deleteCourse(theId)
      .then(function (status) {
        courses.splice(theIndex, 1)
        renderCourses(courses)
      })
}

function renderCourses(courses) {
  theTableBody.empty()
  for (var i = 0; i < courses.length; i++) {
    var course = courses[i]
    theTableBody
      .prepend(`
    <tr>
        <td>${course.title}</td>
        <td>${course.seats}</td>
        <td>${course.semester}</td>
        <td>
            <button class="wbdv-delete" id="${i}">Delete</button>
            <button class="wbdv-select" id="${course._id}">Select</button>
        </td>
    </tr>
  `)
  }
  jQuery(".wbdv-delete")
    .click(deleteCourse)
  jQuery(".wbdv-select")
    .click(selectCourse)
}
// renderCourses(courses)

function updateCourse() {
  console.log(selectedCourse)
  selectedCourse.title = titleFld.val()
  selectedCourse.seats = $seatsFld.val()
  selectedCourse.semester = $semesterFld.val()
  courseService.updateCourse(selectedCourse._id, selectedCourse)
    .then(function (status) {
      var index = courses.findIndex(course => course._id === selectedCourse._id)
      courses[index] = selectedCourse
      renderCourses(courses)
    })
}

function init() {
  titleFld = $(".wbdv-title-fld")
  $seatsFld = $(".wbdv-seats-fld")
  $semesterFld = $(".wbdv-semester-fld")
  $createBtn = $(".wbdv-create-btn")
  addCourseBtn = jQuery("#wbdv-create-course")
  addCourseBtn.click(addCourse)
  $updateBtn = $(".wbdv-update-btn")
  theTableBody = jQuery("tbody")

  $updateBtn.click(updateCourse)
  $createBtn.click(() => {
      createCourse({
        title: titleFld.val(),
        seats: $seatsFld.val(),
        semester: $semesterFld.val()
      })
      titleFld.val("")
      $seatsFld.val()
    }
  )

  courseService.findAllCourses()
    .then(function (actualCoursesFromServer) {
      courses = actualCoursesFromServer
      renderCourses(courses)
    })
}
jQuery(init)
*/


/*

*/

/*
var $tableRows
var $createBtn
var $updateBtn

var $titleFld
var $sectionFld
var $seatsFld
var $semesterFld

var courseService = new CourseServiceClient()

var courses = [
  {title: "CS4550", section: "02", seats: 23, semester: "Spring"},
  {title: "CS2345", section: "03", seats: 34, semester: "Spring"},
  {title: "CS3456", section: "04", seats: 45, semester: "Spring"},
  {title: "CS5610", section: "05", seats: 56, semester: "Spring"},
  {title: "CS5200", section: "06", seats: 67, semester: "Spring"},
]

function deleteCourse(event) {
  var button = $(event.target)
  var index = button.attr("id")
  var id = courses[index]._id
  courseService.deleteCourse(id)
    .then(function (status) {
      courses.splice(index, 1)
      renderCourses(courses)
    })
}

function createCourse() {
  // alert("create course")
  var newCourse = {
    title: $titleFld.val(),
    section: $sectionFld.val(),
    seats: $seatsFld.val(),
    semester: $semesterFld.val()
  }

  courseService.createCourse(newCourse)
    .then(function (actualCourse) {
      courses.push(actualCourse)
      renderCourses(courses)
    })
}

var selectedCourse = null
function selectCourse(event) {
  var id = $(event.target).attr("id")
  console.log(id)
  selectedCourse = courses.find(course => course._id === id)
  $titleFld.val(selectedCourse.title)
  $seatsFld.val(selectedCourse.seats)
  $semesterFld.val(selectedCourse.semester)
}

function updateCourse() {
  selectedCourse.title = $titleFld.val()
  selectedCourse.semester = $semesterFld.val()
  selectedCourse.seats = $seatsFld.val()
  courseService.updateCourse(selectedCourse._id, selectedCourse)
    .then(status => {
      var index = courses.findIndex(course => course._id === selectedCourse._id)
      courses[index] = selectedCourse
      renderCourses(courses)
    })
}

function renderCourses(courses) {
  $tableRows.empty()
  for(var i=0; i<courses.length; i++) {
    var course = courses[i]
    $tableRows
      .prepend(`
      <tr>
          <td>${course.title}</td>
          <td>${course.section}</td>
          <td>${course.seats}</td>
          <td>${course.semester}</td>
          <td>
              <button id="${i}" class="neu-delete-btn">Delete</button>
              <button id="${course._id}" class="wbdv-select-btn">Select</button>
          </td>
      </tr>
      `)
  }
}

function main() {
  $tableRows = jQuery("#table-rows")
  $createBtn = $(".jga-create-btn")
  $updateBtn = $(".wbdv-update-btn")
  $titleFld = $(".wbdv-title-fld")
  $seatsFld = $(".wbdv-seats-fld")
  $sectionFld = $(".wbdv-section-fld")
  $semesterFld = $(".wbdv-semester-fld")
  $updateBtn.click(updateCourse)
  $createBtn.click(createCourse)
  courseService.findAllCourses().then(function (actualCourses) {
    courses = actualCourses
    renderCourses(courses)
    $(".neu-delete-btn").click(deleteCourse)
    $(".wbdv-select-btn").click(selectCourse)
  })
}
$(main)

*/


