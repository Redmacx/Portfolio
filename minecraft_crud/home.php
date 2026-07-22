<?php
include 'connection.php';

if (isset($_POST['btn'])) {
    $bname = $_POST['bookname'];
    $author = $_POST['author'];

    $sql = "INSERT INTO booktb(bookname, author) 
            VALUES ('$bname', '$author')";

    $result = mysqli_query($conn, $sql);

    if ($result) {
        // echo "Data Inserted Successfully!";
        header('location:display.php');
    }
}
?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="up.css">
  <title>Add Book</title>
</head>

<body>
  <div class="header1">
    <h1>ADD BOOK INFORMATION</h1>
  </div>

  <div class="container">
    <form method="post">
      <div class="form">
        <label class="form-label">Book Name</label>
        <input type="text" name="bookname" class="form-control" pattern="[A-Za-z]+" placeholder="Enter Book Name" autocomplete="off" required>

        <label class="form-label">Author</label>
        <input type="text" name="author" class="form-control" pattern="[A-Za-z]+" placeholder="Enter the Author" autocomplete="off" required>

      </div>
        <button type="submit" name="btn" class="Update2">Submit</button>
        <button type="cancel" class="cancel1"><a href="display.php">Cancel</a></button>

      
    </form>
  </div>

</body>
</html>
