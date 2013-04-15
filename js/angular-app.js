var app = angular.module('guava', ['ngResource']);

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
	$rootScope.site = Directory.site;
});

app.service('Posts', function($resource){
	return $resource(MyAjax.ajaxurl, {
		'save': { method: 'POST', params: { action: 'new_item' } },
		'delete': { method: 'POST', params: { action: 'delete_item' } },
		'query': {method: 'POST', isArray:true, params: {action: 'post_data'} }
	});
});

function NavCtrl($scope, $http, Posts){
	$http.post(MyAjax.ajaxurl, $scope.data, {
		params:{
			action: 'get_header_nav'
		}
	}).then(function(response){
		$scope.navs = response.data;
	});
	
	//USER LOGGED IN?
	$http.post(MyAjax.ajaxurl, $scope.data, {
		params:{
			action: 'user_check'
		}
	}).then(function(response){
		$scope.$root.user = response.data;
	});
}

function ListCtrl($scope, $http){
	
	$scope.data = {};
	$scope.$root.openPost = false;
	
	// GET LATEST POSTS
	$http.post(MyAjax.ajaxurl, $scope.data, {
		params:{
			action: 'get_posts'
		}
	}).then(function(response){
		$scope.posts = response.data
	})
	
	// ADD NEW POST FUNCTION
	$scope.add = function(){
    	$scope.$root.openPost={'post_title' : 'POST TITLE', 'post_content' : 'POST CONTENT'};
    }
    // EDIT POST (PUSH DATA TO FORM) FUNCTION
	$scope.edit = function(post){
		$scope.$root.openPost=post;
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
		        	$scope.$root.openPost = false;
		        });
		     }
		}
		else if(!post.ID){
			    $scope.posts.splice(index,1);
		}
	}
	//Date Functions
	$scope.datify = function(date){
		$scope.date = new Date(date);
		return $scope.date.getDate()+'/'+$scope.date.getMonth()+'/'+$scope.date.getYear();
	}
}

function EditCtrl($scope, $http){
	// SAVE POST FUNCTION
	$scope.save = function(){
	    $http.post(MyAjax.ajaxurl, $scope.data, {
		    params: {
		    	data: $scope.openPost,
			    action: 'new_item'
		    }
	    }).then(function(response){
		    $scope.posts.push($scope.openPost);
	        jQuery('#save').modal('hide');
	        $scope.$root.openPost = false;
	    });
    }
    // CLEAR FORM FUNCTION
    $scope.clear = function(){
	    $scope.$root.openPost = false;
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