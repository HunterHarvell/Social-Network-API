# Social-Network-API
This is a back-end API package using MongoDB and Express.js to handle routing and data storage for a social media website/application.

## User Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list


## Installation and Usage

You'll need to download all dependencies first using `npm i`.

Run `npm start` to start the server, and you can then open up Insomnia core application to test the routes.

Test Routes:
    `/api/users` - get all users and post new user

    `/api/users/:userID` -get/put/delete user by ID

    `/api/users/:userID/friends/:friendID` -add/delete friends

    `/api/thoughts` - get all thoughts and post new thoughts

    `/api/thoughts/:thoughtID` -get/put/delete thoughts by ID

    `/api/thoughts/:thoughtID/reactions` - create reaction

    `/api/thoughts/:thoughID/reactions/:reactionID` - delete reaction

## Repository and Walkthrough Videos

Repository: https://github.com/HunterHarvell/Social-Network-API.git

User Testing: https://drive.google.com/file/d/1vbDUg5rNSt-kOr2NoeB_VDhlCnMxnBnP/view

Thoughts Testing: https://drive.google.com/file/d/1Mlof70dJWRr58ms7bc0eJczyjTe3Een6/view

Reaction and Friend Testing: https://drive.google.com/file/d/1Uvr_EZNDZowmIG1VEtxq9ORsgwBAJLXL/view

