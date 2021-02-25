function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;

    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001098769/users';

    var self = this;
    function createUser(user) {
        return fetch(self.url, {
            method: 'POST',
                headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(function (response) {
            return response.json()
        })
    }
    function findAllUsers() {
        // console.log(self.url)
        return fetch(self.url)
        // console.log(promise)
            .then(function (response) {
                // console.log(response)
                return response.json()
            })
    }
    function findUserById(userId) {

    }
    function updateUser(userId, user) {
        return fetch(`${self.url}/${userId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
    }
    function deleteUser(userId) {
        return fetch(`${self.url}/${userId}`,
            {method: 'DELETE'})
    }
}




/*
function CourseServiceClient() {
  this.createCourse = createCourse;
  this.findAllCourses = findAllCourses;
  this.findCourseById = findCourseById;
  this.deleteCourse = deleteCourse;
  this.updateCourse = updateCourse;
  this.url = 'https://wbdv-generic-server.herokuapp.com/api/hany/courses';
  var self = this;

  function createCourse(course) {
    return fetch(self.url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(course)
    }).then(function (response) {
      return response.json()
    })
  }
  function findAllCourses() {
    return  fetch(self.url)
      .then(function (response) {
        return response.json()
    })
  }
  function findCourseById(courseId) {

  }
  function updateCourse(courseId, course) {
    return fetch(`${self.url}/${courseId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(course)
    }).then(response => response.json())
  }
  function deleteCourse(courseId) {
    return fetch(`${self.url}/${courseId}`,
      {method: 'DELETE'})
  }
}
*/

/*

function CourseServiceClient() {
  this.createCourse = createCourse;
  this.findAllCourses = findAllCourses;
  this.findCourseById = findCourseById;
  this.deleteCourse = deleteCourse;
  this.updateCourse = updateCourse;
  this.url = 'https://wbdv-generic-server.herokuapp.com/api/hanyrz/courses';
  var self = this;
  function createCourse(course) {
    return fetch(self.url, {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (response) {
      return response.json()
    })
  }
  function findAllCourses() {
    return fetch(self.url).then(function (response) {
      return response.json()
    })
  }
  function findCourseById(courseId) {

  }
  function updateCourse(courseId, course) {
    return fetch(`${self.url}/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(course),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())
  }
  function deleteCourse(courseId) {
    // return fetch(self.url+"/"+courseId)
    return fetch(`${self.url}/${courseId}`, {method: 'DELETE'})
      .then(function (response) {
        return response.json()
      })
  }
}*/


