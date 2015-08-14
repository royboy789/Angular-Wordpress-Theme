wpAng = typeof wpAng === 'undefined' ? {} : wpAng;

wpAng.init = function(){
	
	wpAng.app = angular.module('wpAngularTheme',['ui.router','ngResource','ui.tinymce'])
	
	//FILTERS
	.filter('to_trusted',['$sce',function($sce){
		return function(text){
			return $sce.trustAsHtml(text);
		};	
	}])
	
	//RUNFUNC
	.run(function($rootScope){	
		$rootScope.dir = ajaxInfo.template_directory;
		$rootScope.tinymceOptions = {
			skin:'lightgray',
			height:300
		};
		
		$rootScope.is_admin = ajaxInfo.is_admin;
	})
	
	//ROUTES
	.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('list',{
				url:'/',
				controller:'listView',
				templateUrl:ajaxInfo.template_directory+'list.html'
			})
			.state('single',{
				url:'/post/:slug',
				controller:'singleView',
				templateUrl:ajaxInfo.template_directory+'single.html'
			})
	})
	
	//FACTORIES
	.factory('Posts',function($resource){
		return $resource(ajaxInfo.api_url+'posts/:ID',{
			ID:'@id'
		},{
			'update':{
				method:'PUT',
				headers: {
					'X-WP-Nonce': ajaxInfo.nonce
				}
			},
			'post':{
				method:'POST',
				headers: {
					'X-WP-Nonce': ajaxInfo.nonce
				}
			},
			'save':{
				method:'POST',
				headers: {
					'X-WP-Nonce': ajaxInfo.nonce
				}
			},
			'delete':{
				method:'DELETE',
				headers: {
					'X-WP-Nonce': ajaxInfo.nonce
				}
			}
		});
	})
	.factory('Comments',function($resource){
		return $resource(ajaxInfo.api_url+':ID/comments',{
			ID:'@id'
		},{
			'update':{method:'PUT'},
			'save':{
				method:'POST',
				headers: {
					'X-WP-Nonce': ajaxInfo.nonce
				}
			}
		});
	})
	.factory('PostsBySlug',function($resource){
		return $resource(ajaxInfo.api_url+'post_by_slug/:id',{
			id:'@id'
		});
	})
	
	//CONTROLLERS
	.controller('listView',['$scope','Posts',function($scope,Posts){
		
		$scope.refreshPosts = function(){
			Posts.query(function(res){
				$scope.posts = res;
			});
		};
		$scope.refreshPosts();
		
		//EDITPOST
		$scope.openPost = {}
		$scope.editPost = function(post){
			$scope.openPost = post;
			$scope.openPost.newPost = false;
			//$scope.openSaveModal();
			setTimeout(function(){
				tinymce.activeEditor.setContent($scope.openPost.content.rendered);
			},100);
		};
		
		//DELETEPOSTFUNCTION
		$scope.deletePost = function(index,post){
			if(post.id){
				var deleteConf = confirm('Areyousureyouwanttodelete'+post.title.rendered);
				if(deleteConf){
					$scope.posts.splice(index,1);
					Posts.delete({ID:post.id});
				}
			}
		};
		
		//SAVEPOSTFUNCTION
		$scope.savePost = function(){	
			if($scope.openPost.newPost){
				$scope.openPost.title  =  $scope.openPost.title.rendered;
				$scope.openPost.content  =  $scope.openPost.content.rendered;
				Posts.save($scope.openPost,function(response){
					$scope.openPost = {};
					$scope.refreshPosts();
					$scope.closeSaveModal();
				});
			}else{
				$scope.openPost.title  =  $scope.openPost.title.rendered;
				$scope.openPost.content  =  $scope.openPost.content.rendered;
				Posts.update($scope.openPost,function(res){
					$scope.openPost = {};
					$scope.refreshPosts();
					$scope.closeSaveModal();
				});
			}
		};
		
		//ADDNEWPOST
		$scope.addPost = function(){
			$scope.openPost = {
				newPost:true,
				status:'publish'
			}
		}
		
		//CLEARFORMFUNCTION
		$scope.clear = function(){
			$scope.$root.openPost = false;
			jQuery('#save').modal('hide');
		};
		
		
		//SAVEMODALOPEN/COSE	
		$scope.openSaveModal = function(){
			jQuery('#save').modal('show');
		}
		
		$scope.closeSaveModal = function(){
			jQuery('#save').modal('hide');
		}
		
		//DATEFUNCTION
		$scope.datify = function(date){
			$scope.date = newDate(date);
			return $scope.date.getDate()+'/'+$scope.date.getMonth()+'/'+$scope.date.getYear();
		};
		
	}])
	
	.controller('singleView',['$scope','$stateParams','PostsBySlug','Comments',function($scope,$stateParams,PostsBySlug,Comments){
		
		PostsBySlug.get($stateParams,function(res){
			$scope.post = res.post;
		});
		
		$scope.savecomment = function(){
			$scope.openComment.post = $scope.post.ID;
			Comments.save($scope.openComment,function(res){
				if( res.id ) {
					$scope.openComment = {};
					$scope.openComment.post = $scope.post.ID;
					PostsBySlug.get($stateParams,function(res){
						$scope.post = res.post;
					});
				}
			});
		}
		
	}])
	
};

wpAng.init();