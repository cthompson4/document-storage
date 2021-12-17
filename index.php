<!--- Created by Connor Thompson -->
<!DOCTYPE html>
<html lang="en">
<head>
	<link rel="stylesheet" type="text/css" href="index.css" media="screen">
	<title>Document Storage</title>
	<script src="index.js"></script>
</head>
<body>
	<h1>Document Storage</h1>
	<p1 style="float: left; margin-left: 100px">
		<h2>Current files within database:</h2>
	
	</p1>
	<p2 style="margin-right: 100px; float: right">
		<h2>Upload a new file:</h2>
		<form method="post" action="upload.php" enctype="multipart/form-data">
			<label>File Upload</label>
			<input type="file" name="file" id="file">
			<input type="submit" value="Upload File" name="submit">
			</form>
	</p2>


	<div class="checkPassword" id="checkPassword">
		<form action="/index.js" class="form-container">
		  <h1>Enter the password:</h1>
		  <p>For testing purposes, the password is password.</p>
		  <label id = "password2" for="password"><b>Password:</b></label>
		  <input id = "password" type="text" placeholder="Enter the password" name="password" required><br>	  
		  <button type="button" class="submit" onclick="checkPassword()">Submit</button>
		</form>
	  </div>

</body>
</html>

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