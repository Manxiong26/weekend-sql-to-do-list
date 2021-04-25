const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    // select from messages table database will show us an updated list of tasks
        let queryText = 'SELECT * FROM taskslist ORDER BY "task";';
        pool.query(queryText).then(result => {
                // Sends back the results in an object
                res.send(result.rows);
            })
            .catch(error => {
                console.log('error getting task', error);
                res.sendStatus(500);
            });
    });

    router.post('/', (req, res) => {
        let newTask = req.body; 
        console.log(`Adding task`, newTask); 
        let queryText = `INSERT INTO messages ("task") 
                       VALUES ($1);`;  
        pool.query(queryText, [newTask.task]) 
            .then(result => {
                res.sendStatus(201);
            })
            .catch(error => {
                console.log(`Error adding new task`, error);
                res.sendStatus(500);
            });
    });





module.exports = router;