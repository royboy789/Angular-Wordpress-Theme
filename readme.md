Wordpress Angular Theme
=======================

What? Why?
==========
I wanted to learn Angular, and I already have spent the last 10 years developing in Wordpress. The best way to for me to learn was to make this.. but maybe someone else will find some awesome use for it.

The Wordpress theme is built primarily using Front-Page.php to run as the main ng-view.

http://www.roysivan.com/angular-wordpress-theme

Technologies
------------
**AngularJS**
**Twitter Bootstrap** - for easy customization and responsive design
**LESS CSS** - Personal preference over SASS


Install Instructions
=====================
+ Download / Pull All Files
+ FTP to your themes directory
+ Activate Theme under Appearances
+ Create **'Header Nav'** Menu for easy creation of angular menu
+ Come back and fork me


Documentation
--------------
**Navigation** - Defaulted to "Header Nav", needs to be created in the Wordpress Dashboard (and used prior to creating pages for your navigation structure. This will automatically create a routing navigation on the front-end. 

**Content Block** - used to insert content from page or post, 
	example: `<ng-include src=" dir+'block.php?id=2&title=true' "></ng-include>`  
There are 2 variables passed to file, the `id` of the post/page content you wish to display. 
As well as whether you want a `<h2>` title block to come with it, which will automatically get the title of the ID passed.

**EDIT/DELETE BUTTONS** - in the list view you will find as the buttons to delete and edit the post. These are displayed on check of user login status, as a redudancy to help.


To Do List
-------------
Continuation of development will include priority level items such as:
+ Better way of returning necessary JSON post data **DONE**
+ Page Templating **DONE**
+ Comment Templating
+ the_content filter to automatically change internal URL's to angular routing
+ Secondary Template usage for search engine bots, and non-js clients
+ Automatic redirection from bot defined URL of page/post to angular routed URL

