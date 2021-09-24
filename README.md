<p align="center">
  <a href="https://stockersa.netlify.app/" rel="noopener" target="_blank">
 <img src="https://personal-website-me.s3.amazonaws.com/explodii-responsive.png" alt="Project thumbnail"></a>
</p>
<h3 align="center">Explodii</h3>
<div align="center" >
    <a href="https://stockersa.netlify.app" rel="noopener" align="center"> https://stockersa.netlify.app
    
</div>
<br>
<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p align="center"> Explodii (2nd project) is an excursion booking app that allows you to travel to different places, meet new people and reconnect with nature. We offer a variety of excursions all over North America for all budgets, each trip has a unique theme. You will be accompanied by competent and passionate guides. Explodii allows to share your experience with people from around the world.

</p>

## 🥳 About This Production <a name = "problem_statement"></a>

After finishing my first react project Quest, I really wanted to build a fully functional fullstack app. I decided to expand my skills and learn more about back-end development. I took a Udemy course about NodeJS/Express and MongoDB, finished it and decided to put my knowledge in practice as fast as possible.

Explodii is a rich fullstack app with many features. The application adopts a Front-End MVC(Model View Controller) architecture pattern with React as the Front-End framework and Express.js as back-end framework.

For the purposes of this app I did build a Stateless RESTful API that handles four resources : excursions users, reviews and bookings.All the data for each resource is stored in a MongoDB database using MongoDB Compass. The models are built using mongoose same goes with all the CRUD operations, filters, sorts, pagination, and more.

The features in Explodii :

Explodii offers multiple excursions with unique theme for all budgets. The user can sort and filter them according to her/his preferences.
The user can book the excursion of his choice, the payments will be handled using Stripe.
Users can create their own account using an email and a password, the passwords are crypted with bcrypt before they are stored in the DB.
When the user successfully logs in, a json web token with an expiration is issued for him to access protected routes. It's stored in a cookie.
Users can update their account information (name, email, password, profile picture).
Users have access to their bookings in the account section.
Users can write reviews about their experiences with their excursion(s). They can modify and delete reviews as they see fit.
For each excursion you can track all the locations you will visit in a map built using google map API.

Finally, explodii is a responsive app. Some components are uniquely designed according to the device screen size, please try the app on all devices.

## ⛏️ Built With <a name = "tech_stack"></a>

-   [React/Create React App](https://reactjs.org/) - I used Create React App to build user interfaces in this web application.
-   [SCSS/Styled-Components](https://sass-lang.com/) - I used SCSS with Block Element Modifier (BEM) notation and Styled-Components to design this full stack web app.
-   [Node.js/ Express.js](https://expressjs.com/) - I used Node.js/ Express.js to build the server side.
-   [MongoDB/Mongoose](https://expressjs.com/) - I used MongoDB with Mongoose to manage data.
-   [AWS S3](https://www.netlify.com/) - I used AWS S3 to store images.
-   [JSON Web Tokens](https://www.netlify.com/) - I secured this application using JSON Web Tokens.
-   [AWS S3](https://www.netlify.com/) - I used Postman to test the RESTful API I built.
-   [Heroku](https://www.heroku.com/) - I deployed the react app on the Netlify cloud and the server on Heroku.

## 🧐 For more details <a name = "tech_stack"></a>

Please visit : https://iliasallek.com/explodii/
