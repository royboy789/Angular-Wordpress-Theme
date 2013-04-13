


var app = angular.module('guava', []);
app.config(function($routeProvider){
	$routeProvider.when('/', {
		controller: ListCtrl,
		templateUrl: Directory.url+'/list.html'
	});
	$routeProvider.when('/view/:id', {
		controller: ViewCtrl,
		templateUrl: Directory.url+'/view.html'
	});
});

app.run(function($rootScope, $http){
	$rootScope.dir = Directory.url;
});


function ListCtrl($scope, $http){
	
	$scope.posts = PostData.data;
	$scope.data = {};
	$scope.openPost = false;
	
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
		}
		else if(!post.ID){
			    $scope.posts.splice(index,1);
		}
	}
	// EDIT POST (PUSH DATA TO FORM) FUNCTION
	$scope.edit = function(post){
		$scope.openPost=post;
	}
}

function EditCtrl($scope, $http){
	console.log('edit');
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
	        $scope.$parent.openPost = false;
	    });
    }
    // CLEAR FORM FUNCTION
    $scope.clear = function(){
	    $scope.openPost = false;
	    jQuery('#save').modal('hide');
	}
}

function ViewCtrl($scope, $http, $routeParams){
	$http.post(MyAjax.ajaxurl, $scope.data, {
		params:{
			id: $routeParams,
			action: 'get_post_data'
		}
	}).then(function(response){
		$scope.ViewPost = response.data;
	});	
}
