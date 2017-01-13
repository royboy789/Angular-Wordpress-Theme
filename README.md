WordPress Angular Theme
=========================
This is the [royboy789](http://www.roysivan.com)'s AngularJS WordPress theme. Now in version 7 of __apex__ industry.

NEW VERSION UPDATE - 7.0
========================

Version 7 is a ground up rebuild using Angular2 / NG2. It is based on the work of [stuartkuentzel](https://github.com/stuartkuentzel/angular2-wp-theme) 

Updates
-------
__5/20/2015__ - WP-API 2 code planned for next few commits  
__7/30/2015__ - WP-API 2 plugin supported to get/view posts - delete / edit coming.  
__8/14/2015__ - WP-API 2 now completely functional (delete, edit, and comments)  
__1/2017__ - Angular2 / NG2 working in branch v7 without styling
  
If you are looking for my theme that is v1 compatible see branch `version 5`, which I am no longer supporting.  
If you are looking for `Angular 1.x` that is `WP REST API v2+` compatible see branch `version 6`. 
  
  
Requirements
------------
* npm
* angular-cli

gulp
----
Gulp is dependency with the following tasks:
* 'gulp sass' - builds __sass__ files
* 'gulp ngBuild' - runs `ng build' script
* `gulp watch` - watcher created for sass and all app files
* 'gulp' - default task which runs sass and ngBuild

Install
-------
* Clone / Download Repo
* Open in Terminal and run `npm install`
* Run `gulp`
  
  
Directory Structure
-------------------
Directories need cleanup. Right now:
* __src/app__ - all ng2 application files (components, services, etc. in `app` directory)
* __src/assets/scss__ - all styling for app
* __dist__ - build directory for all files


What? Why?
==========
Because I wanted to, and I can.
http://www.roysivan.com/angular-wordpress-theme

Technologies
------------
**AngularJS** - ng2.x as of version `7.0` - Currently using `2.2.4`  
**WP REST API** - Included in WordPress core from version `4.7`


To Do List
-------------
+ Integrate with menus (using api menu plugin)
+ User authentication
+ Create/Edit/Delete post functionality

