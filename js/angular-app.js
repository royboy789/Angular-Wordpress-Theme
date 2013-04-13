var app = angular.module('guava', []);

function MainCtrl($scope, $http) {
  $scope.items = [];
  $scope.items.people = PostData.data;
  $scope.openItem = false;
  $scope.data = {};
  
  // SAVE POST FUNCTION
  $scope.save = function(){
    $http.post(MyAjax.ajaxurl, $scope.data, {
	    params: {
	    	data: $scope.openItem,
		    action: 'new_item'
	    }
    }).then(function(response){
        console.log(response.data);
        $scope.openItem = false;
    });
  }
  
  // ADD NEW POST FUNCTION
  $scope.add = function(){
    $scope.items.people.push({'post_title' : 'New Post'});
  }
  // DELETE POST FUNCTION
  $scope.delete = function(index, person){
    if(person.ID){
    	confirm('Are you sure you want to delete '+person.post_title+' with ID '+person.ID+' ?');
    	$scope.items.people.splice(index,1);
	    $http.post(MyAjax.ajaxurl, $scope.data, {
		    params: {
		    	data: person.ID,
			    action: 'delete_item'
		    }
	    }).then(function(response){
	        console.log(response.data);
	    });
    } else{
	    $scope.items.people.splice(index,1);
    }
  }
  // EDIT POST (PUSH DATA TO FORM) FUNCTION
  $scope.edit = function(person){
	  $scope.openItem=person;
  }
  // CLEAR FORM FUNCTION
  $scope.clear = function(){
	  $scope.openItem = false;
	  jQuery('#save').modal('hide')
  }
  
}
