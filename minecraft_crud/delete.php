<?php
include 'connection.php';

if (isset($_GET['deleteid'])) {
    $bookid = $_GET['deleteid'];
    $sql = "DELETE FROM booktb WHERE id = '$bookid'";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        header('location:display.php');
    }
}
?>
