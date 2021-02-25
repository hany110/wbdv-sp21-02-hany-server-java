var addCourseBtn;
var rowTemplate;
var tbody;
var updateBtn;
var users=[];
var userService = new AdminUserServiceClient();
var $usernameFld;
var $passwordFld;
var $firstnameFld;
var $lastnameFld;
var $roleFld;

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
    //console.log("Checking I",theIndex)
    //console.log("user name:",users)
    //console.log("the final id",theId)
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

function init(){
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
}


jQuery(init);