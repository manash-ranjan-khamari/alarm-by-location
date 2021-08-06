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
        - Mongodb, Express, Express validator
- routes
    - contains all application routes
- app.js
    - Main file which kickstarts the application

- Application Information
    - Application Code flow
        - All opeeration will happen in the mongo collections
    - How to Run
        - Run `npm start` to kickstart the application
    - Unit Testing
        - Added just a sample unit test for review
        - Also we can have the unit test run on pre-commit hook, so that no bad code can go w/o passing the unit-testing audit