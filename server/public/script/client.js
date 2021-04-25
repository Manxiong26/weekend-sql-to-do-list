console.log('Hi Js');

$(document).ready(onReady);

function onReady(){
        console.log('hi jQ');
        $('#btn-submit').on('click', submit);
        $('#taskList').on('click', '.btn-do', putTask);
        $('#taskList').on('click', '.btn-delete', deleteTask);
        refresh();
}

function submit() {
        console.log('Submit button clicked.');
        let msg = {
            task: $('#input').val()
        }
        addTask(msg);
    }

function refresh() {
        $.ajax({
            type: 'GET',
            url: '/taskslist'
        }).then(function (response) {
            console.log(response);
            renderTasks(response);
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

    function putTask(event) {
        event.preventDefault();
        let tasks = $(this).closest('tr').data('message');
        console.log(`status change ${tasks.message}...`);
        $.ajax({
            method: 'PUT',
            url: `/taskslist/${tasks.id}`,
            data: {
                status: tasks.status
            }
        }).then(function (response) {
            refresh(); 
        }).catch((error) => {
            console.log('error from db', error);
            res.sendStatus(500);
        })
    }

    function deleteTask(event) {
            event.preventDefault();
            console.log('Deleted task..');
            let task = $(this).closest('tr').data('message');
            console.log('Task selected is:', task);
            $(this).closest('tr').empty();
            $.ajax({
                    method: 'DELETE',
                    url: `/taskslist/${task.id}`
                })
                .then(function (response) {
                    refresh();
                })
                .catch(function (error) {
                    console.log('Error', error);
                    alert('ERROR! Try again.');
                })
        }

    function renderTasks(tasks) {
        console.log('Rendering task to DOM');
        $('#taskList').empty();
        for (let i = 0; i < tasks.length; i++) {
            let message = tasks[i];
            console.log('--------', message.status); 
            let ntask = $(`<tr class="${message.status} task"></tr>`);
       
            let textBtn = '';
       
            if (message.status === 'Incomplete') {
                textBtn = 'Complete';
            } else {
                textBtn = 'Incomplete'
            }
       
            ntask.data('message', message);
            ntask.append(`<td class="td-${textBtn} wrap">${message.task}</td>`);
            ntask.append(`
            <td>
            <div class="buttons">
                    <button class="btn-delete">Delete</button>
                    <button class="btn-do ${message.status} task">${textBtn}</button>
            </div>
            </td>`);
            $('#taskList').append(ntask);
        }
    }