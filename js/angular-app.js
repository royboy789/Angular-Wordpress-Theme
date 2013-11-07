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
	$routeProvider.when('/users/', {
		controller: UserCtrl,
		templateUrl: Directory.url+'/users.html'
	});
	$routeProvider.when('/users/:id', {
		controller: UserCtrl,
		templateUrl: Directory.url+'/users.html'
	});
});

app.run(function($rootScope, $http){
	$rootScope.dir = Directory.url;
	$rootScope.site = Directory.site;
	$rootScope.SidebarURL = Directory.url+'/sidebar.html?v=3';
});

app.factory('Posts', function($http){
	var domain = '';
	return {
		'update': function($scope){
			$http.get(MyAjax.resturl+'/posts', $scope.data).then(function(response){
				$scope.posts = response.data;
			});	
		},
		'save': function(post){
			console.log(post);
			$http.put(MyAjax.resturl+'/posts', post).then(function(response){
				console.log(response.data);
				//$scope.posts = response.data;
			});	
		},
		'delete': function(postId){
			return $http.post(MyAjax.resturl+'/posts/delete_post', postId, {
				params: {
					nonce: token,
					id: postId
				}
			});
		}
	};
});

app.factory('PostsNew', function($resource){
	return $resource(MyAjax.resturl+'/posts/:id', {id: '@id'}, {
		update: {method: 'PUT'}
	});
});

app.factory('Comments', function($resource){
	return $resource(MyAjax.resturl+'/posts/:id/comments/', {id: '@id'}, {
		update: {method: 'PUT'}
	});
});

app.factory('Widgets', function($resource){
	return $resource(MyAjax.resturl+'/widgets/:id/', {id: '@id'});
});

app.factory('Users', function($resource){
	return $resource(MyAjax.resturl+'/users/:id/', {id: '@id'});
});




function ListCtrl($scope, $http, Posts, PostsNew){
	$scope.data = {};
	$scope.$root.openPost = false;
	
	// GET LATEST POSTS
	$scope.posts = PostsNew.query();
	
	// ADD NEW POST FUNCTION
	$scope.add = function(){
		$scope.$root.openPost={'title' : 'POST TITLE', 'content' : 'POST CONTENT', 'newPost' : true, 'status' : 'publish'};
    };
    
    // EDIT POST (PUSH DATA TO FORM) FUNCTION
	$scope.edit = function(post){
		$scope.$root.openPost = post;
	};
  
    // DELETE POST FUNCTION
    $scope.delete = function(index, post){
		console.log(post);
		if(post.ID){
			var deleteConf = confirm('Are you sure you want to delete '+post.title);
			if(deleteConf){
				$scope.posts.splice(index,1);
				PostsNew.delete({id:post.ID});
			}
		}
	};
	// DATE FUNCTION
	$scope.datify = function(date){
		$scope.date = new Date(date);
		return $scope.date.getDate()+'/'+$scope.date.getMonth()+'/'+$scope.date.getYear();
	};
	
	// SAVE POST FUNCTION
	$scope.save = function(){
		if($scope.$root.openPost.newPost){
			PostsNew.save($scope.$root.openPost, function(response){
				Posts.update($scope);
				$scope.clear();
			});
		} else {
			$scope.$root.openPost.id = $scope.$root.openPost.ID;
			PostsNew.update($scope.$root.openPost, function(response){
				Posts.update($scope);
				$scope.clear();
			});
		}
    };
    // CLEAR FORM FUNCTION
    $scope.clear = function(){
		$scope.$root.openPost = false;
		jQuery('#save').modal('hide');
	};
}

function ViewCtrl($scope, $http, $routeParams, Comments, PostsNew){
	
	// GET COMMENTS
	$scope.ViewPost = PostsNew.get({id:$routeParams.id}, function(){
		$scope.ViewPost.comments = Comments.query({id:$routeParams.id});
	});
	
	
	$scope.openComment = {id: $routeParams.id, comment_post_ID:$routeParams.id};
	
	// SAVE NEW COMMENT
	$scope.savecomment = function(){
		Comments.save($scope.openComment, function(response){
			console.log(response);
			
			// CLEAR FORM
			jQuery('form#comment-form input[type="text"], form#comment-form input[type="email"], form#comment-form textarea').val('');
			
			// REFRESH COMMENTS
			$scope.ViewPost.comments = Comments.query({id:$routeParams.id});
			
			// RESET openComment
			$scope.openComment = {id: $routeParams.id, comment_post_ID:$routeParams.id};
			
			
		});
	};
}

function PageCtrl($scope, $http, $routeParams, Comments, PostsNew){
	
	// GET COMMENTS
	$scope.ViewPost = PostsNew.get({id:$routeParams.id}, function(){
		$scope.ViewPost.comments = Comments.query({id:$routeParams.id});
	});
	
	
	$scope.openComment = {id: $routeParams.id, comment_post_ID:$routeParams.id};
	
	// SAVE NEW COMMENT
	$scope.savecomment = function(){
		Comments.save($scope.openComment, function(response){
			console.log(response);
			
			$scope.ViewPost.comments.push($scope.openComment);
			$scope.$root.openComment = {post: $routeParams.id};
			jQuery('form#comment-form input[type="text"], form#comment-form input[type="email"], form#comment-form textarea').val('');
		});
	};
}

function SidebarCtrl($scope, $http, $routeParams, Widgets){
	Widgets.query({id:'1'}, function(resp){
		$scope.Widgets = resp;
	});
}

function NavCtrl($scope, $http, Posts){
	// ORIGINAL CODE USING WP DEFAULT AJAX
	$http.post(MyAjax.ajaxurl, $scope.data, {
		params:{
			action: 'get_header_nav'
		}
	}).then(function(response){
		$scope.navs = response.data;
	});
	
	// USER LOGGED IN? - ALSO UTILIZING OLD WP AJAX CODE
	$http.post(MyAjax.ajaxurl, $scope.data, {
		params:{
			action: 'user_check'
		}
	}).then(function(response){
		$scope.$root.user = response.data;
	});
}

function UserCtrl($scope, $http, $routeParams, Users) {
	
	if(!$routeParams.id) {
		Users.query(function(response){
			$scope.Users = response;
		});
	} else {
		Users.get({id:$routeParams.id}, function(response){
			$scope.User = response.data;
		});
	}
	
	$scope.openUser = {user_nicename: 'TESTUSER', user_email: 'testUser@testusersawesome.com'};
	
	$scope.save = function(){
		Users.save($scope.openUser, function(resp){
			if(resp.user.errors){ $scope.err = resp.user.errors; return resp.user.errors; }
			$scope.newUser = resp.user;
			console.log($scope.newUser);
			jQuery('from#newUser').hide();
			jQuery('p.newUserLink').show();
			
		});
	};
}