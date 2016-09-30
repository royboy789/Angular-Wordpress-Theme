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
	.controller('listView',['$scope','Posts', '$stateParams','PostsBySlug','Comments', function($scope,Posts,$stateParams,PostsBySlug,Comments){


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
			console.log($scope.openPost);
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

	.controller('singleView',['$scope','$stateParams','PostsBySlug','Comments','Posts',function($scope,$stateParams,PostsBySlug,Comments, Posts){

		$scope.post = {};
		$scope.virgin = {};

		jQuery( "#title" ).prop( "disabled", true );

		PostsBySlug.get($stateParams,function(res){
			$scope.post = res.post;
			angular.copy(res.post, $scope.virgin)
		});

		// tinymce.activeEditor.setContent($scope.post.post_content);

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

		$scope.tinymceedit = function(){

			jQuery('.textblock').addClass('tinymceedit');
			jQuery( "#title" ).prop( "disabled", false );


			tinyMCE.init({
				selector: 'div.tinymceedit',
				theme: 'inlite',
				plugins: 'image table link paste contextmenu textpattern autolink',
				insert_toolbar: 'quickimage quicktable',
				selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
				inline: true,
				paste_data_images: true,
		        // language:"ru"
		    });

			console.log($scope.post)

		};

		$scope.tinymcesave = function(){
			tinymce.remove();
			$scope.post.newPost = false;
			jQuery( "#title" ).prop( "disabled", true );
			jQuery('.tinymceedit').removeClass('tinymceedit');

			$scope.post.title  =  $scope.post.post_title;
			$scope.post.content = jQuery('#textblock').html();

			Posts.update({ID:$scope.post.ID},$scope.post,function(res){

			});

		}


	}])

};

wpAng.init();
