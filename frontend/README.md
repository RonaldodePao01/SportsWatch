This sports fixtures app requires a user to sign up and log in with a username and password. Once the user signs in with their account details they will have access to upcoming sports fixtures which will tell them which events are being played, which teams are playing, a short description of the match, as well as the date and time of the match. The users will be able to save a fixture to their "favourites" tab which they can view seperately.

To start the app, install the node modules for the frontend and the backend using the npm install command in the terminal. Once the node modules are installed you can tyoe npm start into the terminal of the backend and frontend to start the app.
The connection to the database(URI) is specified in the server so it does not need to be modified.

This app makes use of express for the server, MongoDB for the database and React for the frontend. The database stores the sports fixtures in one collection and the users accounts in another collection.

If you would like to log into an account, you can use:
username: 123@gmail.com
password: password
Or if you want to log into the admin account you can use:
username: test@gmail.com
password: password
Otherwise you can make an account yourself using the sign up function (username needs to end in @gmail.com) and log into that account once your account has been saved.

The admin account has the ability to add new fixtures to the app, update details about fixtures and delete fixtures (CRUD). When the admin makes any changes they will be saved to the database.

Measures I have taken to ensure security of this app include using Helmet which is a middleware that adds or removes HTTP headers as well as make use of jsonwebtoken which securely sends and receives data between the database and server.

I am not making use of any APIs for this app.

I have made use of renderer as well as mocha and chai for the testing of this app. To test, type npm test in the terminal and if you want to do the snapshot test you will need to change the package.json file under "scripts" and change the value of "test" to "react-scripts test".

github link: https://github.com/RonaldodePao01/SportsWatch

Unfortunately, due to Heroku not having a free service anymore I am unable to deploy this app.