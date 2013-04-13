<?php 
	get_header();
?>
	<div id="save" class="modal hide fade">
		<form ng-submit="save()" ng-show="openItem">
			<input type="text" ng-model="openItem.post_title"/>  <Br/>
		    <textarea ng-model="openItem.post_content"></textarea><Br/>
		    <input type="submit" value="SAVE" />
		    <button ng-click="clear()">CLEAR</button>
		</form>
		<div ng-hide="openItem">
			<p>Please select post to edit</p>
		</div>
	</div>
	<!-- TITLE ROW -->
	<div class="row-fluid projects">
		<div class="span5">
			<h3>Title</h3>
		</div>
		<div class="span5 offset2">
			<h3>Edit</h3>
		</div>
	</div>
	<!-- LOOP THROUGH POSTS / ROWS -->
	<div class="row-fluid projects" ng-repeat="person in items.people">
	    <div class="span5">
	      {{person.post_title}}
	    </div>
	    <div class="span5 offset2">
	      <button ng-click="delete($index, person)">Delete</button>
	      <button ng-click="edit(person)" data-toggle="modal" data-target="#save">Edit</button>
	    </div>
	</div>
	
	<!-- ADD POST -->
    <div class="row-fluid">
      <div class="span12"><button ng-click="add()">add</button></div>
	</div>   
<?php 
	get_footer(); 
?>