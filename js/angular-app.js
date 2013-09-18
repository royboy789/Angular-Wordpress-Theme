var app = angular.module('guava', ['ngResource', 'ui', 'ui.route', 'ui.config']);

app.value('ui.config', {
   tinymce: {
      width: '100%',
      height:'300px'
   }
});

app.config(function($routeProvider){
	$routeProvider.when('/', {
		controller: ListCtrl,
		templateUrl: Directory.url+'/list.html'
	});
	$routeProvider.when('/view/:id', {
		controller: ViewCtrl,
		templateUrl: Directory.url+'/view.html'
	});
	$routeProvider.when('/page/:id', {
		controller: PageCtrl,
		templateUrl: Directory.url+'/page.html'
	});
});

app.run(function($rootScope, $http){
	$rootScope.dir = Directory.url;
	$rootScope.site = Directory.site;
	$rootScope.SidebarURL = Directory.url+'/sidebar.html';
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
	$http.get(MyAjax.resturl+'/get_recent_posts', $scope.data).then(function(	response){
		console.log(response.data);
		$scope.posts = response.data.posts;
		console.log($scope.posts[0]);
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
    	if(post.id){
    		var deleteConf = confirm('Are you sure you want to delete '+post.title+' with ID '+post.id+' ?');
    		
    		if(deleteConf){
	    		$scope.posts.splice(index,1);
	    		$http.post(MyAjax.resturl+'/posts', $scope.data, {
				    params: {
				    	data: post.id
				    }
			    }).then(function(response){
		        	
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
	$http.get(MyAjax.resturl+'/get_post/?post_id='+$routeParams.id, $scope.data).then(function(response){
		$scope.ViewPost = response.data.post;
	});	
	
	$scope.openComment = {post_id: $routeParams.id};
	
	$scope.savecomment = function(){
		$http.post(MyAjax.resturl+'/submit_comment', $scope.data, {
			params:{
				post_id: $scope.openComment.post_id,
				name: $scope.openComment.name,
				email: $scope.openComment.email,
				content: $scope.openComment.content
			}
		}).then(function(response){
			$scope.ViewPost.comments.push($scope.openComment);
			$scope.$root.openComment = {comment_post_ID: $routeParams.id};
			jQuery('form#comment-form input[type="text"], form#comment-form input[type="email"], form#comment-form textarea').val('');
		});
	};
}

function PageCtrl($scope, $http, $routeParams){
	$http.post(MyAjax.resturl+'/get_page/', $scope.data, {
		params: {
			id: $routeParams.id
		}
	}).then(function(response){
		$scope.ViewPost = response.data.page;
	});	
	
	$scope.openComment = {post_id: $routeParams.id};
	
	$scope.savecomment = function(){
		$http.post(MyAjax.resturl+'/submit_comment', $scope.data, {
			params:{
				post_id: $scope.openComment.post_id,
				name: $scope.openComment.name,
				email: $scope.openComment.email,
				content: $scope.openComment.content
			}
		}).then(function(response){
			$scope.ViewPost.comments.push($scope.openComment);
			$scope.$root.openComment = {comment_post_ID: $routeParams.id};
			jQuery('form#comment-form input[type="text"], form#comment-form input[type="email"], form#comment-form textarea').val('');
		});
	};
}

function SidebarCtrl($scope, $http, $routeParams){
	console.log($scope.SidebarURL);
	$http.post(MyAjax.resturl+'/widgets/get_sidebar', $scope.data, {
		params:{
			sidebar_id: 'sidebar-1'
		}
	}).then(function(response){
		//console.log(response.data.widgets);
		$scope.Widgets = response.data.widgets;
	});
}