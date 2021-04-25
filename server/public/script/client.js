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

