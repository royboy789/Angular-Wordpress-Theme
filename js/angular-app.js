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

app.factory('Posts', function($http){
	var domain = '';
	return {
		getToken: function(method) {
			return $http.post(MyAjax.resturl+'/get_nonce', method, {
			    params: {
			    	controller: 'posts',
			    	method: method
			    }
		    }).then(function(response){
		    	return response.data.nonce;
		    });	
		},
		'update': function($scope){
			$http.get(MyAjax.resturl+'/get_recent_posts', $scope.data).then(function(response){
				$scope.posts = response.data.posts;
			});	
		},
		'save': function(post){
			if(post.newPost){
				return this.getToken('create_post').then(function(token){
					return $http.post(MyAjax.resturl+'/posts/create_post', post, {
					    params: {
					    	nonce: token,
					    	id: post.id,
					    	title: post.title,
					    	content: post.content,
					    	status: 'publish'
					    }
				    });
			    });
			} else {
				return this.getToken('update_post').then(function(token){
					return $http.post(MyAjax.resturl+'/posts/update_post', post, {
					    params: {
					    	nonce: token,
					    	id: post.id,
					    	title: post.title,
					    	content: post.content
					    }
				    });
			    });
		    }
			
		},
		'delete': function(postId){
			return this.getToken('delete_post').then(function(token){
			    return $http.post(MyAjax.resturl+'/posts/delete_post', postId, {
				    params: {
				    	nonce: token,
				    	id: postId
				    }
			    });
		    })
		}
	}
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

function ListCtrl($scope, $http, Posts){
	$scope.data = {};
	$scope.$root.openPost = false;
	
	// GET LATEST POSTS
	Posts.update($scope);
	
	// ADD NEW POST FUNCTION
	$scope.add = function(){
    	$scope.$root.openPost={'title' : 'POST TITLE', 'content' : 'POST CONTENT', 'newPost' : true};
    }
    // EDIT POST (PUSH DATA TO FORM) FUNCTION
	$scope.edit = function(post){
		$scope.$root.openPost = post;
		$scope.$root.openPost.newPost = false;
	}
  
    // DELETE POST FUNCTION
    $scope.delete = function(index, post){
    	if(post.id){
    		var deleteConf = confirm('Are you sure you want to delete '+post.title);
    		if(deleteConf){
	    		$scope.posts.splice(index,1);
	    		Posts.delete(post.id);
		     }
		}
	}
	//Date Functions
	$scope.datify = function(date){
		$scope.date = new Date(date);
		return $scope.date.getDate()+'/'+$scope.date.getMonth()+'/'+$scope.date.getYear();
	}
	
	// SAVE POST FUNCTION
	$scope.save = function(post){
		Posts.save($scope.$root.openPost).then(function(response){
			if($scope.$root.openPost.newPost){
				$scope.posts.push($scope.$root.openPost);
			}
			Posts.update($scope);
			$scope.clear();
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