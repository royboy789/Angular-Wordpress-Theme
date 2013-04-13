<?php 
	get_header();
?>
	<div id="save" class="modal hide fade">
		<form ng-submit="save()" ng-show="openPost">
			<input type="text" ng-model="openPost.post_title"/>  <Br/>
		    <textarea ng-model="openPost.post_content"></textarea><Br/>
		    <input type="submit" value="SAVE" />
		    <button ng-click="clear()">CLEAR</button>
		</form>
		<div ng-hide="openPost">
			<p>Please select post to edit</p>
		</div>
	</div>
	<!-- TITLE ROW -->
	<div class="row-fluid projects">
		<div class="span5">
			<h3>Post Title</h3>
		</div>
		<div class="span5 offset2">
			<h3>Edit Post</h3>
		</div>
	</div>
	<!-- LOOP THROUGH POSTS / ROWS -->
	<div class="row-fluid projects" ng-repeat="post in posts">
		<div class="span1">
			{{$index+1}}
		</div>
	    <div class="span5">
	      {{post.post_title}}
	    </div>
	    <div class="span5 offset1">
	      <button ng-click="delete($index, post)">Delete</button>
	      <button ng-click="edit(post)" data-toggle="modal" data-target="#save">Edit</button>
	    </div>
	</div>
	
	<!-- ADD POST -->
    <div class="row-fluid">
      <div class="span12"><button ng-click="add()" data-toggle="modal" data-target="#save">add</button></div>
	</div>   
<?php 
	get_footer(); 
?>