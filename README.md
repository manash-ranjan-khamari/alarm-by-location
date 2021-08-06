The codebase for the API 

Application Code Structure
- Folder Structure
    - config 
        - folder has application config
    - server
        - has all server specific code
        - controller
            - keeps controller logic
        - service
            - keeps service logic
        - validator
            - keeps the request validation logic
    - test
        - contains all unit test specific code
    - sql
        - setup.sql
            - Contains database table schema
- Package Dependency
    - Dev Dependency
        - Mocha, Chai & Supertest
    - NPM Dependency
        - MySql, Express, Express validator
- routes
    - contains all application routes
- app.js
    - Main file which kickstarts the application

Application Information
    - Application Code flow
        - All opeeration will happen in the tables
    - How to Run
        - Update the database info in the config & run `npm start` to kickstart the application
    - Unit Testing
        - It created a table on the fly
        - And all the CRUD operation & testing happens in those table
        - I am not deleting the table(s) for now, so that someone can see the test case execution in the table
        - In a real world application, we can delete the table
        - Also can have the unit test run on pre-commit hook, so that no bad code can go w/o passing the unit-testing audit

Postman Collection
- https://www.getpostman.com/collections/7411f0f8b41a4b714d60
