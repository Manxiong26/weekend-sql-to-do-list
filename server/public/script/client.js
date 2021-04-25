console.log('Hi Js');

$(document).ready(onReady);

function onReady(){
        console.log('hi jQ');
}

function refresh() {
        $.ajax({
            type: 'GET',
            url: '/taskslist'
        }).then(function (response) {
            console.log(response);
            //renderTasks(response);
        }).catch(function (error) {
            console.log('error in GET', error);
        });
    }

    function addTask(taskToAdd) {
        $.ajax({
            type: 'POST',
            url: '/taskslist',
            data: taskToAdd,
        }).then(function (response) {
            console.log('Response from server.', response);
            refresh();
        }).catch(function (error) {
            console.log('Error in POST', error)
            alert('Unable to add task! Try Again Later');
        });
    }