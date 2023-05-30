<?php
include './dbconfigur.php';
if (!empty($user_id)) {
    ?>
    <html>
        <head>
            <title>Booking History - Clever Traveler</title>
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
                            <h1>Booking History</h1>
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
                        <form class="form-light mt-20" role="form" method="post" action="">
                            <table class="table_list">                                                                
                                <tr>
                                    <td class="grid_heading">S.No</td>
                                    <td class="grid_heading">User</td>
                                    <td class="grid_heading">Package</td>
                                    <td class="grid_heading">Payment</td>                                    
                                    <td class="grid_heading">By</td>                                    
                                    <td class="grid_heading">Amount</td>                                    
                                    <td class="grid_heading">Date</td>                                    
                                </tr>
                                <?php
                                $i = 0;
                                $sql_contact = "SELECT p.*, pa.*,u.name, u.email,u.phone_no from payments p join packages pa on pa.id = p.package_id join users u on p.user_id = u.id where p.user_id = '".$user_id."' order by p.id desc";
                                $res_contact = mysqli_query($conn, $sql_contact);
                                if (mysqli_num_rows($res_contact) > 0) {
                                    while ($row = mysqli_fetch_array($res_contact)) {
                                        $i++;
                                        ?>
                                        <tr>
                                            <td class="grid_label" align="center"><?php echo $i; ?></td>                                            
                                            <td class="grid_label">
                                               Name -  <?php echo $row['name'] ?> <br/>
                                               Email - <?php echo $row['email'] ?><br/>
                                               Phone - <?php echo $row['phone_no'] ?>
                                            </td>
                                            <td class="grid_label">
                                                <?php echo $row['source'] ?> to <br/>
                                                <?php echo $row['destination'] ?>
                                            </td>
                                            <td class="grid_label">
                                               Card Type -  <?php echo $row['card_type '] ?> <br/>
                                               Card No. - <?php echo $row['card_no'] ?><br/>
                                               Name on Card - <?php echo $row['name_on_card'] ?>
                                            </td>
                                            <td class="grid_label">
                                                <?php echo $row['medium'] ?>
                                            </td>
                                            <td class="grid_label">
                                                <?php echo $row['sales_price'] ?><br/>
                                            </td>
                                            <td class="grid_label">
                                                <?php echo $row['created'] ?>
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
