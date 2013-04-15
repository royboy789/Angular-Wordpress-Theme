Wordpress Angular Theme
=======================

Install Instructions
=====================
+ Download / Pull All Files
+ FTP to your themes directory
+ Activate Theme under Appearances
+ Create **'Header Nav'** Menu for easy creation of angular menu
+ Come back and fork me

Why?
----
I wanted to learn Angular, and I already have spent the last 10 years developing in Wordpress. The best way to for me to learn was to make this.. but maybe someone else will find some awesome use for it.

Description
---------------
The Wordpress theme is built primarily using Front-Page.php to run as the main ng-view.

I have created the following views:
* **View** - for a single blog post 
* **List** - as the main default blog list page

**Routing** has been setup for List and View Pages

**EDIT, DELETE, & CREATE** posts from the list page easily and quickly

**Twitter Bootstrap** - for easy customization and responsive design


Documentation
--------------
**Navigation** - Defaulted to "Header Nav", needs to be created in the Wordpress Dashboard (and used prior to creating pages for your navigation structure.

**Static Block Content** - used to insert a chunk of code form a backend page or post example  
`<ng-include src=" dir+'block.php?id=2&title=true' "></ng-include>`  
There are 2 variables passed to file, the ID of the post/page content you wish to display, as well as whether you want a `<h2>` title block to come with it, which will automatically get the title of the ID passed.


Future Plans
-------------
Continuation of development will include priority level items such as:
+ Better way of returning necessary JSON post data **DONE**
+ Page Templating **DONE**
+ Comment Templating
+ Secondary Template usage for search engine bots, and non-js clients

