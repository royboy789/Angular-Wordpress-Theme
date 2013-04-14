<pre>{{openPost|json}}</pre>
	<div id="save" class="modal hide fade" ng-controller="EditCtrl">
	<pre>{{openPost|json}}</pre>
		<form ng-submit="save()" ng-show="openPost">
			<input type="text" ng-model="openPost.post_title"/>  <Br/>
		    <textarea ng-model="openPost.post_content" id="editor" class="editor"></textarea><Br/>
		    <input type="submit" value="SAVE" />
		    <button ng-click="clear()">CLEAR</button>
		</form>
		<div ng-hide="openPost">
			<p>Please select post to edit</p>
		</div>
	</div>