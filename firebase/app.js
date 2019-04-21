// Initialize Firebase
var config = {
    apiKey: "AIzaSyA_UV6ChDsfgdBR4llU4aTmsD0t7T6CexQ",
    authDomain: "test-firebase-65532.firebaseapp.com",
    databaseURL: "https://test-firebase-65532.firebaseio.com",
    projectId: "test-firebase-65532",
    storageBucket: "test-firebase-65532.appspot.com",
    messagingSenderId: "990474183831"
};
firebase.initializeApp(config);

var tbody = document.querySelector('#loadTask');

function getId(field) {
    return document.querySelector(field).value;
}

function arrayJSON(id, name, description) {
    var data = {
        id: id,
        name: name,
        description: description
    }

    return data;
}

function inputsTask(id, result) {
    return document.getElementById(id).value = result;
}

const buttonSubmit = document.querySelector('#buttonSubmit');

buttonSubmit.addEventListener('click', insertTask);

function insertTask() {
    let id = getId('#id');
    let name = getId('#name');
    let description = getId('#description');

    if (id.length == 0 || name.length == 0 || description.length == 0)
        alert('Empty Fields');
    else {
        tbody.innerHTML = '';
        var arrayData = arrayJSON(id, name, description);
        var task = firebase.database().ref("task/" + id);
        task.set(arrayData);
        alert("Saved Successfull");
        inputsTask('id', '');
        inputsTask('name', '');
        inputsTask('description', '');
        watchTask();
    }
}

function table(id, name, description) {
    return `
        <tr>
            <td>${name}</td>
            <td>${description}</td>
            <td><i class="fas fa-edit" onclick="editTask(${id}, '${name}', '${description}')"></i></td>
            <td><i class="fas fa-trash" onclick="removeTask(${id})"></i></td>
        </tr>`;
}

(() => watchTask())();

function watchTask() {
    var task = firebase.database().ref('task/');
    task.on('child_added', function (data) {
        console.log(data.val());
        var taskValue = data.val();
        var tableData = table(taskValue.id, taskValue.name, taskValue.description);
        tbody.innerHTML += tableData;
    });
}

function editTask(id, name, description) {
    inputsTask("id", id);
    inputsTask("name", name);
    inputsTask("description", description);
}

function removeTask(id) {
    var task = firebase.database().ref('task/' + id)
    task.remove();
    location.reload();

}