<!DOCTYPE html>
<html>
    <head>
        <title>Assignment</title>
    </head>
        <body>



        <form method="post" actions="">
            SKU: <input type="text" name="SKU"><br>
            <input type="radio" name="operation" value="add" checked> Add products<br>
            <input type="radio" name="operation" value="subtract"> Subtract products<br>
            <input type="radio" name="operation" value="update"> update products<br>
            # of product: <input type="number" name="#ofProduct"><br>
            <input type="submit" name="submit" value="Submit">
        </form>

        <?php

        try{
            if(isset($_POST['submit'])&&isset($_POST['operation'])) {
                //process here
                $data = array();
                $check = 'http://www.loxabeauty.com/webservices/product/info?sku=';
                $check = $check . $_POST['SKU'];
                $headers = @get_headers($check);
                if ($headers[0] == 'HTTP/1.1 400 Bad Request')
                    $exists = false;
                else
                    $exists = true;

                if ($exists == true) {
                    $xml = simplexml_load_string(file_get_contents($check));
                    foreach ($xml->children() as $child) {
                    }
                    $data[] = $child->name;
                    $data[] = $_POST['#ofProduct'];
                } else
                    throw new Exception('Invalid SKU');


               include 'config.php';
                $sql = sprintf("SELECT * FROM loxa WHERE SKU='%s'",
                    mysqli_real_escape_string($db,$_POST['SKU']));

                $result = mysqli_query($db,$sql);
                if(mysqli_num_rows($result)>0){                 //checks if the object doesn't exist yet
                    switch ($_POST['operation']) {
                        case "add":
                            $sql = sprintf("UPDATE loxa SET amount=amount+'%s' WHERE SKU='%s'",
                                mysqli_real_escape_string($db, $_POST['#ofProduct']),
                                mysqli_real_escape_string($db, $_POST['SKU']));
                            break;
                        case "subtract";
                            $sql = sprintf("UPDATE loxa SET amount=amount-'%s' WHERE SKU='%s' AND amount>='%s'",
                                mysqli_real_escape_string($db, $_POST['#ofProduct']),
                                mysqli_real_escape_string($db, $_POST['SKU']),
                                mysqli_real_escape_string($db, $_POST['#ofProduct']));

                            break;
                        case "update";
                            $sql = sprintf("UPDATE loxa SET amount='%s' WHERE SKU='%s'",
                                mysqli_real_escape_string($db, $_POST['#ofProduct']),
                                mysqli_real_escape_string($db, $_POST['SKU']));
                            if ($_POST['#ofProduct'] < 0)
                                throw new Exception('Cannot have negative amount of product');
                            break;
                    }
                }
                else{
                    if ($_POST['#ofProduct'] < 0 || ($_POST['operation']=='subtract'))
                        throw new Exception('Cannot have negative amount of product');
                    $sql = sprintf("INSERT INTO loxa (SKU, product, amount) VALUES ('%s','%s','%s')",   //i
                        mysqli_real_escape_string($db, $_POST['SKU']),
                        mysqli_real_escape_string($db, $data[0]),
                        mysqli_real_escape_string($db, $_POST['#ofProduct']));
                }

                $check = mysqli_query($db, $sql);

            }




        }
        catch(Exception $e){
            echo 'Exception: '. $e->getMessage();
        }
        ?>

        <br>
        <br>
        <br>

        <table border="1" style="width:fit-content" id="content list">
            <tr>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Quantity</th>
            </tr>
            <tr>
                <?php
                include 'config.php';
                $result = mysqli_query($db,"SELECT * FROM loxa");
                foreach($result as $value) {
                    echo '<tr>';
                    printf('<td>%s</td><td>%s</td><td>%s</td>',
                    htmlspecialchars($value['SKU']),
                    htmlspecialchars($value['product']),
                    htmlspecialchars($value['amount']));
                    ?>
                    <td class="contact-delete">
                        <form action='delete.php?name="<?php echo $value['SKU']; ?>"' method="post">
                            <input type="hidden" name="name" value="<?php echo $value['SKU']; ?>">
                            <input type="submit" name="submit" value="Remove">
                        </form> </td>
                <?php
                    echo '</tr>';
                }
                ?>

            </tr>
        </table>

        </body>



<!--
add new products
set/update quantity in stock
delete product from list
display sku name and quantity for each product
sku is string and quantity is integer
http://www.loxabeauty.com/webservices/product/info?sku=908082 is an example weblink
577105,	615963,	577113,	678245,	638830
-->
</html>
