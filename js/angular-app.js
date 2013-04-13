var app = angular.module('guava', []);

function MainCtrl($scope, $http) {
  $scope.posts = PostData.data;
  $scope.openPost = false;
  $scope.data = {};
  
  // SAVE POST FUNCTION
  $scope.save = function(){
  	$scope.posts.push($scope.openPost);
    $http.post(MyAjax.ajaxurl, $scope.data, {
	    params: {
	    	data: $scope.openPost,
		    action: 'new_item'
	    }
    }).then(function(response){
        console.log(response.data);
        jQuery('#save').modal('hide')
        $scope.openPost = false;
    });
  }
  
  // ADD NEW POST FUNCTION
  $scope.add = function(){
    $scope.openPost={'post_title' : 'POST TITLE', 'post_content' : 'POST CONTENT'};
  }
  
  // DELETE POST FUNCTION
  $scope.delete = function(index, post){
    if(post.ID){
    	var deleteConf = confirm('Are you sure you want to delete '+post.post_title+' with ID '+post.ID+' ?');
    	if(deleteConf){
	    	$scope.posts.splice(index,1);
		    $http.post(MyAjax.ajaxurl, $scope.data, {
			    params: {
			    	data: post.ID,
				    action: 'delete_item'
			    }
		    }).then(function(response){
		        console.log(response.data);
		    });
	    }
    } else{
	    $scope.posts.splice(index,1);
    }
  }
  // EDIT POST (PUSH DATA TO FORM) FUNCTION
  $scope.edit = function(post){
	  $scope.openPost=post;
  }
  // CLEAR FORM FUNCTION
  $scope.clear = function(){
	  $scope.openPost = false;
	  jQuery('#save').modal('hide');
  }
  
}
