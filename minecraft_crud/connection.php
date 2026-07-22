<?php
$conn = new mysqli("localhost", "root", "", "bookdb");

if (!$conn) {
    die(mysqli_error($conn));
}
?>
