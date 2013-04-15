	    <?php require('wp-load.php'); ?>
	    <div>
		    <?php
		    
		    	echo $_GET['id'];
		    	
		    	echo 'TESTING'.post_content($_GET['id']);
		    ?>
	    </div>