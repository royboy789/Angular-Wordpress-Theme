wpAng = typeof wpAng === 'undefined' ? {} : wpAng;

wpAng.init = function() {
	
	wpAng.app = angular.module('wpAngularTheme', ['ui.router', 'ngResource', 'ui.tinymce'])
	
	// FILTERS
	.filter('to_trusted', ['$sce', function($sce){
		return function(text) {
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
		return $resource(ajaxInfo.api_url + 'posts/:ID?_wp_json_nonce='+ajaxInfo.nonce, {
			ID: '@ID'
		},{
	        'update': { method:'PUT' }
	    });
	})
	.factory('Comments', function($resource) {
		return $resource(ajaxInfo.api_url + 'posts/:ID/comments?_wp_json_nonce='+ajaxInfo.nonce, {
			ID: '@ID'
		},{
	        'update': { method:'PUT' }
	    });
	})
	.factory('PostsBySlug', function($resource){
		return $resource(ajaxInfo.api_url + 'post_by_slug/:id', {
			id: '@id'
		});
	})
	
	// CONTROLLERS
	.controller('listView', ['$scope', 'Posts', function($scope, Posts){
		
		Posts.query(function(res){
			$scope.posts = res;
		});
		
		// EDIT POST
		$scope.openPost = {}
		$scope.editPost = function(post){
			$scope.openPost = post;
			$scope.openPost.newPost = false;
			//$scope.openSaveModal();
			setTimeout(function(){
				tinymce.activeEditor.setContent($scope.openPost.post_content);
			}, 100);
		};
		
		
		$scope.openSaveModal = function(){
			jQuery('#save').modal('show');
		}
	}])
	
	.controller('singleView', ['$scope', '$stateParams', 'PostsBySlug', 'Comments', function($scope, $stateParams, PostsBySlug, Comments) {
		
		PostsBySlug.get($stateParams, function(res){
			$scope.post = res.post;
		});
		
		$scope.savecomment = function () {
			$scope.openComment.ID = $scope.post.ID;
			Comments.save($scope.openComment, function(res){
				console.log(res);
			});
		}
		
	}])
	
};

wpAng.init();