const express = require('express');
const bodyParser = require('body-parser');


const app = express();
//setup body parser - to translate request body into JSON
app.use(bodyParser.urlencoded({ extended: true } ) );
app.use(bodyParser.json());// Need this for API JSON requests
app.use(express.static('server/public'));

//routes go here 
const taskRouter = require ('./routes/task.router.js')
app.use('/taskslist', taskRouter)

//Setup PORT for heroku - will get the # from the process environment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('tasks is up and running on port', PORT);
    
})