# Recipe Hub

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description 

This website is a personal project on exploring making a fullstack application of my own. The concept by which is being a 
place where people can come, record their favorite recipes that they have from over the years, look up other people's recipes, 
and save them for future use.

## Getting started

*Currently working on getting this deployed to Heroku.

If you wish to experiment with this project on your own, feel free to do so. Download/clone the repository with your method of choice.
This project requires a PostgreSQL database to store any user information/recipes but the search function will still work as intended without it.

Generally however, upon downloading the repository to a local machine, install the dependencies/modules with `npm install`.

For running the backend/frontend separately: 
- Backend: `cd backend` followed by `node server.js` (I use nodemon for instances where I am still editing backend files)
- Frontend: `npm start` 

For running both backend and frontend simultaneously: `npm run start:both`

## Key features

Some key features of this site as detailed previously: 
- User signup/login
- Recipe searching/favoriting

## Standard user flow

As this project is using the free tier of an external API(detailed below), I have allowed anonymous users to freely
search up recipes. 

- As an anonymous user: the user will have the option to type in their search parameter, 
scroll through pages of recipes, each of which has their own link to a separate individual page detailing the recipe or 
an external link to a separate website entirely from which the recipe was found.

- As a registered user: the user will have the options that the anonymous user will have, however they will have the added
options to favorite recipes they like which will be saved to the database and explore recipes already on the database.

## Where's the data coming from?

The data is being sourced by [Edamam's Recipe search API](https://www.edamam.com/)

## Tech stack

The tech stack for this particular project covers React, Node.js/Express, PostgreSQL, HTML5, and CSS3

