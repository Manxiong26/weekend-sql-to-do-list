CREATE TABLE taskslist(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (300) NOT NULL,
    "status" VARCHAR (80) DEFAULT 'Incomplete'
);

SELECT * FROM taskslist;

INSERT INTO taskslist (id, task, status)
VALUES (150, 'what do i need to do', 'Complete');

