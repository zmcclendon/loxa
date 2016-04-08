<?php
$db = mysqli_connect('localhost', 'root', '', 'php');
$sql = sprintf("DELETE FROM loxa WHERE SKU='%s'",
    mysqli_real_escape_string($db, $_POST['name']));
mysqli_query($db, $sql);
header('location:assignment.php');
?>