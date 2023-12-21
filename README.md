# Electronics Shop is Express project and uses html & css provided by SoftUni.

## The project uses:

1. Express
2. bcrypt for password hashing
3. JWT for authentication
4. Express-Handlebars for Template Engine
5. Mongoose as ODM for MongoDB

# Overview
**_There isn't responsive design for mobile devices html & css are provided by SoftUni._**

> This is simple project with basic functionality.You can create selling offers for different electronic entries.You can edit and delete only your offers and you can buy other user's entries.The goal of this project is to practice Express basics.(CRUD, Authentication, Handlebars etc.)

1. Guest users:

-   Guest users aren't allowed to perform any CRUD operations.
-   Guest users can access home, catalog, details, login and register.

2. Authenticated users:

-   They are allowed to perform all CRUD operations.
-   They can purchase only entries create by other users.
-   They can purchase specific entry only once.

# Installation

1. Clone the repository

```
git clone https://github.com/nikolai-dimitrov/Electronics-Shop.git
```

2. Open terminal and go to project directory and type the command below
```
npm install
```
3. When installation is successful type the following command
```
npm start
```
4. App will run at localhost:3000