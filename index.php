<!--- Created by Connor Thompson -->
<!DOCTYPE html>
<html lang="en">
<head>
	<link rel="stylesheet" type="text/css" href="index.css" media="screen">
	<title>Document Storage</title>
	<script src="index.js"></script>
</head>
<body onload="passwordStart()">
	<h1>Document Storage</h1>
	<button type="button" class="help" id="help" onclick="helpBox()">Help</button>
	<div class="helpBox" id="helpBox">
	<h3>Overview: This website stores documents within it that can be accessed from different machines.</h2>
	<h3>It utilizes a JSON based login system. It must currently be manually updated, but future updates could make it possible to do through the website itself.</h2>
	<h3>To upload a file, just select a file and hit upload. You will need to re-enter the login information after each upload.</h2>
	<button type="button" class="closehelp" onclick="closeHelpBox()">Close</button>
	</div>
	<p1 style="float: left; margin-left: 100px">
		<h2>Current files within database:</h2>
		<!--The PHP tutorials by the YouTube channel Adnan Afzal were a great help, so some credit to them. -->
		<?php
	$files = scandir("uploads");
 
	for ($a = 2; $a < count($files); $a++)
	{
    	?>
    	<p>
        	<?php echo $files[$a]; ?>
        	<a href="uploads/<?php echo $files[$a]; ?>" download="<?php echo $files[$a]; ?>" style="color: blue;">
            	Download
        	</a>
			<a href="delete.php?name=uploads/<?php echo $files[$a]; ?>" style="color: red;">
    		Delete
			</a>
    	</p>
    	<?php
	}
	?>
	</p1>
	<p2 style="margin-right: 100px; float: right">
		<h2>Upload a new file:</h2>
		<form method="post" action="upload.php" enctype="multipart/form-data">
			<label>File Upload</label>
			<input type="file" name="file" id="file">
			<input type="submit" value="Upload File" name="submit">
			</form>
	</p2>

	<div class="userpasslist" id ="userpasslist">
		<h2>List of users and passwords: </h2>
		<p id="list"></p>
	</div>
	
	<div class="checkPassword" id="checkPassword">
		<form action="/index.js" class="form-container">
		<h1>Document Storage Website - Login</h1>
		<br>
		  <h2>Enter username and password:</h1>
		  <p>For testing purposes, the username is admin and the password is password.</p>
		  <table>
		  <tr><td><label id = "username2" for="username"><b>Username:</b></label></td>
		  <td><input id = "username" type="text" placeholder="Enter the username" name="username" required><br></td></tr>
		  <tr><td><label id = "password2" for="password"><b>Password:</b></label></td>
		  <td><input id = "password" type="text" placeholder="Enter the password" name="password" required><br></td></tr>	
		  </table>  
		  <button type="button" class="submit" onclick="checkUserPass()">Submit</button>
		</form>
	  </div>

</body>
</html>
