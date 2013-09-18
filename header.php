<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html <?php language_attributes(); ?> ng-app="guava">
<head>
  	<meta charset="<?php bloginfo( 'charset' ); ?>" />
  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">	
  	<title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>
  	<meta name="author" content="Ciplex">
  	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  	<link rel="shortcut icon" href="/favicon.ico">
  	<link rel="apple-touch-icon" href="/favicon.png">
   	<?php wp_head();?>
    <!--[if lt IE 9]>
	    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />	
</head>
<body <?php body_class(); ?>>
<header class="container-fluid header">
	<div class="container">
		<div class="row-fluid">
			<div class="span5">
				<h1>
					<a href="<?php bloginfo('wpurl'); ?>">ANGULAR THEME 2</a>
				</h1>
			</div>
			<div class="span4 offset3">
				<span>by: <a href="http://www.roysivan.com">Roy Sivan</a></span>
			</div>
		</div>
		<nav class="row-fluid" ng-controller="NavCtrl">
			<ul>
				<!--<li ng-repeat="nav in navs" ui-route="/{{nav.id>0 && 'view/'+nav.id || ''}}" ng-class="{active:$uiRoute}"><a href="#/{{nav.id>0 && 'view/'+nav.id || ''}}">{{nav.title}}</a> - {{nav.type}}</li> -->
				<li ng-repeat="nav in navs" ng-class="{active:$uiRoute}">
					<div ng-switch on="nav.type">
						<a ng-switch-when="custom" href="#/{{nav.url}}">{{nav.title}}</a>
						<a ng-switch-when="Page" href="#/page/{{nav.id}}">{{nav.title}}</a>
						<a ng-switch-default href="#/view/{{nav.id}}">{{nav.title}}</a>
					</div>
				</li>
			</ul>
		</nav>
	</div>
</header>
<div class="container-fluid content-wrapper">
	<div class="container">