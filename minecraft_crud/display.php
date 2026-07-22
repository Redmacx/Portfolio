<?php 
include 'connection.php';
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display page</title> 
</head>
<link rel="stylesheet" href="Diisplay.CSS">
<body>
    <div class ="container" >
        <h1 >Book Management System</h1>
        <button class="add" ><a href=home.php> Add Book</a></button >
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Book ID</th> 
                    <th scope="col">Book Name</th>
                    <th scope="col">Author</th>  
                    <th scope="col">Action</th>  
                </tr>
            </thead>
            <tbody>
                <?php
                
                $sql = "SELECT * FROM booktb ORDER BY id ASC";
                $result = mysqli_query($conn, $sql);
                if ($result) {
                    $displayId = 1;
                    while ($row = mysqli_fetch_assoc($result)) {
                        $bookid = $row['id'];
                        $bname = $row['bookname'];
                        $author = $row['author'];
                        echo '<tr> 
                        <th scope="row">' . $displayId . '</th>
                        <td>' . $bname . '</td>
                        <td>' . $author . '</td>
                        <td>
                        <button class="update"><a href="update.php?updateid=' . $bookid . '">Update</a></button>
                        <button class="delete"><a href="delete.php?deleteid=' . $bookid . '">Delete</a></button>
                        </td>
                        </tr>';
                        $displayId++;
                    }
                }
                
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>
