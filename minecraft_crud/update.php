<?php
// update
include 'connection.php';

$bookid = $_GET['updateid'];
$sql = "SELECT * FROM booktb WHERE id = $bookid";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

$bookid = $row['id'];
$bname = $row['bookname'];
$author = $row['author'];


if (isset($_POST['btn'])) {
    $bname = $_POST['bookname'];
    $author = $_POST['author'];
    $sql = "UPDATE booktb SET id=$bookid, bookname='$bname', author='$author' WHERE id=$bookid";

    $result = mysqli_query($conn, $sql);
    
    if ($result) {
        header('Location: display.php');
        
      
    }
}
  
      
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Update Information</title>
</head>
 <link rel="stylesheet" href="up.css">
<body>
  <div class="header">
    <h1>UPDATE BOOK INFORMATION</h1>
  </div>

  <div class="container">
    <form method="post">
      <div class="form">
        <label class="form-label">Book Name</label>
        <input type="text" name="bookname" class="form-control" placeholder="Enter the Book Name" autocomplete="off" required>

        <label class="form-label">Author</label>
        <input type="text" name="author" class="form-control" placeholder="Enter the Author Name" autocomplete="off" required>


      <button type="submit" name="btn" class="Update1">Update</button>
      <button type="cancel" class="cancel"><a href="display.php">Cancel</a></button>
    </form>
</form>
  </div>

</body>
</html>
