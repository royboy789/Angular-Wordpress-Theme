WordPress Angular Theme
=========================
This is the [royboy789](http://www.roysivan.com)'s AngularJS WordPress theme. Now in version 6 of awesomeness.

NEW VERSION UPDATE - 6.0
========================

Version 6 takes all the added features of 5, and revamps the whole build.  
I have cleaned up a lot of the themes and php files, to keep this theme as minimal as possible.  

WP-API 2
---------
__5/20/2015__ - WP-API 2 code planned for next few commits  
__7/30/2015__ - WP-API 2 plugin supported to get/view posts - delete / edit coming.  
__8/14/2015__ - WP-API 2 now completely functional (delete, edit, and comments)  
  
If you are looking for my theme that is v1 compatible see branch `version 5`, which I am no longer supporting.
  
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

