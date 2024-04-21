# Role-Employee-Management-System
The Task is to develop a Role Employee Management System for Developing a RESTful API using Node.js and Express.js to manage roles and employees in a database.

.env file content

PORT = 9000

LOG_FILE_NAME = "log.txt"

MONGO_DB_CONNECTION_URL = "{Mongodburl}/RoleEmployee" // {Mongodburl} in place of this add the required mongodb connection url

JWT_SECRET_KEY = "5ebe2294e1027f6aa398e3d176e8a86967f2a62f305"

After cloning the repo navigate to the folder

 npm i or npm install

To start the application

 npm start

 The postman folder contains the json file to have documentation of all the API's
 
 PostmanJsonFile/Role-Employee-Management-System-API.postman_collection.json

Instructions

1. If a repository is cloned for the first time then the Admin API like /api/create-admin should be called to insert data into Admin table

2. Then login with the credentials so that a JWT token will be generated this step is done to implement the Authentication and Authorization as specified

3. Then for each and every other API's for Roles, Employees and Employee Role. The JWT token should be included into the header with the key value pair as like the below example.

Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY2MjM4Nzk5OTlmNjcyNjdmOWMxMGMwNiIsImlhdCI6MTcxMzYwNDUxN30.UuT7V3gDrzSOj--fTWEjhDIHZSI7jL5ecgTnfLYTrLk 