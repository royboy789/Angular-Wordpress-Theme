WordPress Angular Theme
=========================
This is the [royboy789](http://www.roysivan.com)'s AngularJS WordPress theme. Now in version 6 of awesomeness.

NEW VERSION - 7.0
=================
What I want to include  
* __ES6__ – ECMAScript 6 offers a lot more features to your typical JavaScript. From a better, faster syntax to easier to build and modular design. If you haven’t experienced es6 yet, you may be missing out.
* __PHP NameSpace__ – This is kind of falls along the same lines as my reasoning for ES6. I would love it to be easy to use PHP classes I’ve created, without having to constantly include. I’m pretty sure you’ve seen this, look for any PHP file that starts with namespace and then use something/someClass
* __Live Reload__ – I use LiveReload a lot in other projects, why not integrate here?
* __New Grid Framework__ – I love Bootstrap, I really do. But time to start playing with something better, preferably something flex based.
  
__Deadline____  
LoopConf.io 2016

  
npm & gulp
-----------
npm and gulp are now part of the build  
* `npm install` - installs all necessary packages and runs `gulp init`
* `gulp init` - sets up all the vendor and theme scripts and styles
  
  
assets v. build directory
--------------------------
I am keeping all working files in the `assets` directory which build using __gulp__ to the `build` directory for enqueue'ing by the theme.


What? Why?
==========
I wanted to learn Angular, and I already have spent the last 10 years developing in WordPress. The best way to for me to learn was to make this.. but maybe someone else will find some awesome use for it.

The WordPress theme is built primarily using Front-Page.php to run as the main ng-view.

http://www.roysivan.com/angular-wordpress-theme

Technologies
------------
**AngularJS**

**Twitter Bootstrap** - for easy customization and responsive design

**LESS CSS** - Personal preference over SASS

**JSON API** - Required plugin for RESTful API


Install Instructions
=====================
+ Download / Pull All Files
+ FTP to your themes directory
+ Download/Install the [JSON API WordPress Plugin](http://wordpress.org/plugins/json-rest-api/) by Ryan McCue
+ Activate Theme under Appearances
+ Run `npm install` - this will also run `gulp init`
+ Come back and fork me


Documentation
--------------  
  
**EDIT/DELETE BUTTONS** - in the list view you will find as the buttons to delete and edit the post. These are displayed on check of user login status, as a redundancy to help.  
  
**GLOBAL JS VARIABLES**  
__set by localize_script in functions.php__  
+ ajaxInfo.api_url - JSON-REST-API url  
+ ajaxInfo.template_directory - Current WordPress theme directory


To Do List
-------------
Continuation of development will include priority level items such as:
+ Edit Button
+ Delete Button

