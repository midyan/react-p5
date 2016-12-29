# p5.js React Playground
 Simple ReactJS based page to play around with the p5.js library!



###What is this about
  This is a pre-setup and easy to use page with p5.js ready to go. It is built using the <a href="https://github.com/kriasoft/react-app">React-App<a> package.



###What is needed to use it
  --NodeJs 6+<br>
  --git (Command line or GUI)<br>
  --Comand Line Interface(Linux Terminal or similar)<br>

# How to install and setup
  First, you need to clone this repository to your machine/server  
  ```sh
  $ git clone https://github.com/midyan/react-p5.git [[directory_name/]]
  ```
  <br>
  Now, to install all its dependencies you need to navigate to the directory you cloned it into and run the following for Linux or OSx environments:  
  ```sh
  $ sudo npm run setup
  ```
  Or, if you are on Windows, open the PowerShell or CMD as Administrator and run:
  ```sh
  $ npm run setup
  ```
  <br>
  To start the project, simply run the command below and a localhost server will be created with everything up and running:
  ```sh
  $ npm run start
  ```


# How to use it
  The sketch file is located at '/routes/Home'. Now go and make the magic happen.<br><br>Also, since the ReactJs requires you to instantiate the p5 class for each component created, the 'p' argument is required in the sketch class. All the p5 functions, methods, objects and classes are contained inside this 'p' argument. Please refer to <a href='https://github.com/processing/p5.js/wiki/Instantiation-Cases'>Instantiation Cases</a> inside the p5 documentation.

# Where am I going with this?
  I mean to create a page were people could tinker with p5.JS easily and online. It will have the functionalities of <a href='http://codepen.io/'>codepen.io</a>, but fucused solely on p5.JS programming.<br><br>I will create a Tab Layout to manage multiple instaces of p5.js at the same time, as well many pre-made example for everyone to play around with.<br><br>This work is inspired mostly by the work of <a href='http://shiffman.net/'>Daniel Shiffman</a>. He is an awesome guy, so you should definitely follow his <a href='https://www.youtube.com/user/shiffman'>YouTube Channel</a>, buy his book or simply throw money at him.
