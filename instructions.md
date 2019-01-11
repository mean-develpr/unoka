# UNOKA - Node.js Basic Aptitude Test

## Quick start

Requirements:
- Git
- Node.js v8
- NPM

Clone this repository:

```
git clone git@github.com:UN-OCHA/nodejs_aptitude_test.git
```

Start the application with:

```
npm start
```

Test the application with:

```
npm test
```

## Overview

This is a very simple REST API that allows for a list of employees to be read, created, updated and deleted. The aim of this test is to expand the scope of this little API.

The tasks within this test are designed to be completed within 2 hours in total. None of these tasks require any particular tricks or advanced programming skills, they may however require the use of external resources (documentation, modules, etc.), which you are welcome to use as you wish.

You will be assessed on your ability to complete the tasks, as well as the process by which you complete them. Please do not implement features beyond the scope of this exercise, as they will not be taken into consideration during assessment ; demonstrated good coding practices however will.

The API uses the following:
- Node.js v8
- Restify for routing
- Sequelize as the ORM
- SQLite3 as the DB
- Jasmine/Request for running tests

## Tasks

### Add missing tests

There is currently only one test, which essentially checks that the home (`/`) endpoint is up. Your first task is to write tests for the employee CRUD endpoints too and add documentation where it may be required.

### "Team" feature

We want to be able to assign employees to teams. A team can have multiple employees, and likewise, an employee can be in multiple teams. Each team requires a leader (an employee may be the leader of more than one team). A team's main defining feature is its name.

New CRUD endpoints will need to be created to manage teams and the employees associated to them. New tests will also need to be devised.

### Improve error handling and debugging

As our application grows, handling and tracking errors may become cumbersome. Implement a simple solution for handling, tracking and reporting errors across the application.

### Additional notes

- you may tackle these tasks in any order you wish
- good documentation, commenting and git etiquette are appreciated
- should you be unsure about any of the tasks, please document your assumptions in the code (no further details will be provided from our end)
- good luck!

## NOTES AND COMMENTS
To my evaluator: Hope you get to see these lines :-)

1) I have done the 'Improve error handling and debugging' task first because it required many structural changes which under my point of view, were better to address asap. 
Unfotunately, I've never worked with resitfy before, so I spent a lot of time trying to find an appropriate library and avoid anti-patterns.

2) I have completed some tests of the tests required in 'Add missing tests' task, but there are some work left to do here.

3) TBD: some CRUD operations are not finished

