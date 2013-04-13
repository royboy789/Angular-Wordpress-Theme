<?php 
	get_header();
?>
	
	<form ng-show="openItem" id="save" ng-submit="save()">
		<input type="text" ng-model="openItem.post_title"/>  <Br/>
	    <textarea ng-model="openItem.post_content" cols="100" rows="30"></textarea><Br/>
	    <input type="submit" value="SAVE" />
	    <button ng-click="clear()">CLEAR</button>
	</form>
	<button ng-click="add()">add</button>
    <p ng-repeat="person in items.people">
      Post {{person.ID}} is titled {{person.post_title}}<br/>
      <button ng-click="delete($index)">Delete</button>
      <button ng-click="edit(person)">Edit</button>
    </p>
    
    
    
    <p ng-repeat="item in items">
      {{item.action}} <br/>
      <button ng-click="delete($index)">Delete</button>
      <button ng-click="edit(people)">Edit</button>
    </p>
    
  
    
    <pre>
    	{{items.people|json}}
    </pre>
<?php 
	get_footer(); 
?>