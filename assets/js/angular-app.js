wpAng = typeof wpAng === 'undefined' ? {} : wpAng;

wpAng.init = function() {
	
	wpAng.app = angular.module('wpAngularTheme', ['ui.router', 'ngResource', 'ui.tinymce'])
	
	// FILTERS
	.filter('to_trusted', ['$sce', function($sce){
		return function( text ) {
	        return $sce.trustAsHtml(text);
	    };	
	}])
	
	// RUN FUNC
	.run(function($rootScope){	
		$rootScope.dir = ajaxInfo.template_directory;
		$rootScope.tinymceOptions = {
			skin: 'lightgray',
			height: 300
		};
		
		$rootScope.is_admin = ajaxInfo.is_admin;
	})
	
	// ROUTES
	.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('list',{
				url: '/',
				controller: 'listView',
				templateUrl: ajaxInfo.template_directory + 'list.html'
			})
			.state('single',{
				url: '/post/:slug',
				controller: 'singleView',
				templateUrl: ajaxInfo.template_directory + 'single.html'
			})
	})
	
	//FACTORIES
	.factory('Posts', function($resource) {
		return $resource(ajaxInfo.api_url + 'posts/:ID?_wp_json_nonce=' + ajaxInfo.nonce, {
			ID: '@ID'
		},{
	        'update': { method:'PUT' }
	    });
	})
	.factory('Comments', function($resource) {
		return $resource(ajaxInfo.api_url + 'posts/:ID/comments?_wp_json_nonce=' + ajaxInfo.nonce, {
			ID: '@ID'
		},{
	        'update': { method:'PUT' },
	        'save' : {
		        method: 'PUT',
		        url: ajaxInfo.api_url + 'comments?_wp_json_nonce=' + ajaxInfo.nonce
	        }
	    });
	})
	.factory('PostsBySlug', function($resource){
		return $resource(ajaxInfo.api_url + 'post_by_slug/:id', {
			id: '@id'
		});
	})
	
	// CONTROLLERS
	.controller('listView', ['$scope', 'Posts', function($scope, Posts){
		
		$scope.refreshPosts = function(){
			Posts.query(function(res){
				$scope.posts = res;
			});
		};
		$scope.refreshPosts();
		
		// EDIT POST
		$scope.openPost = {}
		$scope.editPost = function(post){
			$scope.openPost = post;
			$scope.openPost.newPost = false;
			//$scope.openSaveModal();
			setTimeout(function(){
				tinymce.activeEditor.setContent($scope.openPost.content);
			}, 100);
		};
		
		 // DELETE POST FUNCTION
		 $scope.deletePost = function(index, post){
			if( post.id ){
				var deleteConf = confirm('Are you sure you want to delete '+post.title.rendered);
				if(deleteConf){
					$scope.posts.splice(index,1);
					Posts.delete({ID:post.id});
				}
			}
		};
		
		// SAVE POST FUNCTION
		$scope.savePost = function(){	
			if($scope.openPost.newPost){
				Posts.save($scope.openPost, function(response){
					$scope.openPost = {};
					$scope.refreshPosts();
					$scope.closeSaveModal();
				});
			} else {
				Posts.update($scope.openPost, function(res){
					$scope.openPost = {};
					$scope.refreshPosts();
					$scope.closeSaveModal();
				});
			}
	    };
	    
	    // ADD NEW POST
	    $scope.addPost = function() {
		    $scope.openPost = {
			    newPost: true,
			    status: 'publish'
		    }
	    }
	    
	    // CLEAR FORM FUNCTION
	    $scope.clear = function(){
			$scope.$root.openPost = false;
			jQuery('#save').modal('hide');
		};
		
		
		// SAVE MODAL OPEN/COSE	
		$scope.openSaveModal = function(){
			jQuery('#save').modal('show');
		}
		
		$scope.closeSaveModal = function(){
			jQuery('#save').modal('hide');
		}
		
		// DATE FUNCTION
		$scope.datify = function(date){
			$scope.date = new Date(date);
			return $scope.date.getDate()+'/'+$scope.date.getMonth()+'/'+$scope.date.getYear();
		};
		
	}])
	
	.controller('singleView', ['$scope', '$stateParams', 'PostsBySlug', 'Comments', function($scope, $stateParams, PostsBySlug, Comments) {
		
		PostsBySlug.get($stateParams, function(res){
			$scope.post = res.post;
		});
		
		$scope.savecomment = function () {
			$scope.openComment.post = $scope.post.ID;
			Comments.save($scope.openComment, function(res){
				console.log(res);
			});
		}
		
	}])
	
};

wpAng.init();