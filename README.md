#Involve

[![Build Status](https://travis-ci.org/Involve-Seattle/Activity-Calendar.svg?branch=dev)](https://travis-ci.org/Involve-Seattle/Activity-Calendar)

A Project for Code Fellows by Jacob Shafer, Chareesa Graham, Stephanie Lingwood, Sheyna Watkins and Henok Kidane

###Background:
A lot of people are often uninformed about politics. Especially local politics: the decisions that affect them most.

###Objective/Goal:
We want to provide people an easy way to aggregate information about local political meetings and to share that information with friends.

###Personas:
* 30-somethings
* homeowners
* parents whose children are in local schools

All people have stake in political matters but we have chosen to start focusing on these groups because we believe that people who are homeowners and/or parents of school children have a new awareness of their stake in their community. They would also be more open to seeking this information on their phones.

###MVP GOALS
We know we cannot reach the nation from the get-go so we are starting with just one region: Seattle. We have added meeting and event information from the Seattle City Council and we can expand to include more agencies and more cities. We want to make the app the best it can be for one region before we progress to other cities.

**MVP Features**
* Calendar that aggregates meeting information
* Ability to email a friend meeting information
* Ability to log-in to an account

**Possible Future Features**
* My Meetings: a way to "favorite" meetings
* More feeds from different groups and agencies
* More cities/regions
* A search function
* Ability to look up elected officials
* More sophisticated indexing to finding local leaders and agencies based on user's zip code

###Our Code

**Stack**
* Sass
* Angular.js framework
* RESTful API, powered by Node.js and Express; routes for login authentication/authorization, retrieving event information from city calendar RSS feeds, and sending email invitations to friends (powered by SendGrid and Validator)
* MongoDB with Mongoose; schemas for users and events
* Backend testing with Mocha, Chai, ChaiHTTP and Sinon; frontend testing with Jasmine and Karma

**Interesting Problems**
* Converting RSS feeds into human-readable event data, cached in MongoDB and displayed in Angular
* Broadcasting user login status and responding to it throughout the Angular application
* Fine-tuning Angular views using regex
* Testing, testing, and more testing
* Weighing the pros and cons of cards versus tiles
* CSS positioning and display
* Effectively coordinating UX and JavaScript devs (and build environments)
