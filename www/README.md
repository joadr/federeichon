# Federeichon's project Web administrator
This is the Administrator panel of the Federeichon App. It's made with Meteor for server side and React for the Front-End.

### To start coding:
- Download and install [Meteor](https://www.meteor.com/install) on your Computer.
- Clone this repo.
- Go to this folder in a terminal or command prompt (www folder)
- run `$ meteor npm install`
- run `$ meteor`
- Go to http://localhost:3000 in your browser and it should be up and running

### To access the admin:
- Once you have access to http://localhost:3000 , you will have to create and admin.
- Open another terminal or command prompt in the www folder.
- run `$ meteor shell`, once executed you will be prompt to input code after the `>` sign.
- type `Accounts.createUser({email: 'username@domain.com', password: 'password'})` with your own admin credentials
- Now you should be able to login at http://localhost:3000/admin

### Notes
- Project uses [React Router](https://github.com/ReactTraining/react-router)
- Project uses [ES6](http://es6-features.org/)
- The project follows the [Starndardjs](http://standardjs.com/) javascript's standard
- Use IDE or text editors of your choice, but sublime-text or atom is suggested
- Linters are highly suggested.

### Debugging
- You can use Chrome's [React Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) to debug React
