<?php
include './dbconfigur.php';
if (!empty($user_id)) {

    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $carid = mysqli_real_escape_string($conn, $_GET['id']);
        $sql = "DELETE FROM packages WHERE id='" . $carid . "'";
        $result = mysqli_query($conn, $sql);
        $valueInsert = (int) $result;
        if ($valueInsert > 0) {
            header("location:package_list.php?status=success");
        } else {
            $error = "Package has not been deleted.";
        }
    }
    ?>
    <html>
        <head>
            <title>Package List - Clever Traveler</title>
            <?php include 'title.php'; ?>
        </head>
        <body>
            <?php
            include 'header.php';
            ?>
            <header id="head" class="secondary">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8">
                            <h1>Package List</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <div class="title-box clearfix">&nbsp;<br/><br/></div> 
                        <?php
                        include './leftmenu.php';
                        ?>
                    </div>
                    <div class="col-md-8">
                        <div class="title-box clearfix">&nbsp;<br/><br/></div> 
                        <form class="form-light mt-20" role="form" method="post" action="package_list.php">
                            <table class="table_list">                                
                                <?php
                                if (isset($_GET['status']) && $_GET['status'] == "success") {
                                    echo '<tr><td colspan="8">Package has been successfully Delete.</td></tr>';
                                }
                                ?>
                                <tr>
                                    <td class="grid_heading">S.No</td>
                                    <td class="grid_heading">Hotel Name</td>
                                    <td class="grid_heading">Person</td>
                                    <td class="grid_heading">Source</td>
                                    <td class="grid_heading">Destination</td>                                    
                                    <td class="grid_heading">Price</td> 
                                    <td class="grid_heading">Days</td> 
                                    <td class="grid_heading">Medium</td>
                                    <td class="grid_heading">Delete</td>
                                </tr>
                                <?php
                                $i = 0;
                                $sql_contact = "SELECT h.hotel_name, p.* FROM packages p join hotels h where p.hotel_id=h.id ORDER BY p.id DESC";
                                $res_contact = mysqli_query($conn, $sql_contact);
                                if (mysqli_num_rows($res_contact) > 0) {
                                    while ($row = mysqli_fetch_array($res_contact)) {
                                        $i++;
                                        ?>
                                        <tr>
                                            <td class="grid_label" align="center"><?php echo $i; ?></td>
                                            <td class="grid_label" align="center">
                                                 <?php echo $row['hotel_name'] ?>
                                            </td>
                                            <td class="grid_label">
                                                <?php echo $row['person'] ?><br/>
                                            </td>
                                            <td class="grid_label">
                                                <?php echo $row['source'] ?><br/>
                                            </td>
                                            <td class="grid_label">
                                                <?php echo $row['destination'] ?>
                                            </td>
                                            <td class="grid_label">
                                                <?php echo $row['sales_price'] ?>
                                            </td>
                                            <td class="grid_label">
                                                <?php echo $row['days'] ?>
                                            </td>
                                            <td class="grid_label">
                                                <?php echo $row['medium'] ?>
                                            </td>
                                            <td class="grid_label" style="padding: 10px;" align="center">
                                                <a href="package_list.php?id=<?php echo $row['id']; ?>" class="btn-link">Delete</a>
                                            </td>                                            
                                        </tr>
                                        <?php
                                    }
                                } else {
                                    echo '<tr><td colspan="7">Data not found.</td></tr>';
                                }
                                ?>
                            </table>
                        </form>
                    </div>                
                </div>
            </div>       
            <?php
            include 'footer.php';
            ?>               
        </body>
    </html>
    <?php
} else {
    header("location:login.php?msg=login");
    ob_flush();
}
?>
