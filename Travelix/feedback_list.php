<?php
include './dbconfigur.php';
if (!empty($user_id)) {
    $error = "";

    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $contatid = mysqli_real_escape_string($conn, $_GET['id']);
        $sql = "DELETE FROM feedback WHERE id='" . $contatid . "'";
        $result = mysqli_query($conn, $sql);
        $valueInsert = (int) $result;
        if ($valueInsert > 0) {
            header("location:feedback_list.php?status=success");
        } else {
            $error = "Feedback has not been deleted.";
        }
    }
    ?>
    <html>
        <head>
            <title>Feedback List- Clever Traveler</title>
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
                            <h1>Feedback List</h1>
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
                        <form class="form-light mt-20" role="form" method="post" action="feedback_list.php">
                            <table class="table_list">
                                <?php
                                if (isset($_GET['status']) && $_GET['status'] == "success") {
                                    echo '<tr><td colspan="4">Feedback has been successfully deleted.</td></tr>';
                                }
                                if (!empty($error)) {
                                    echo '<tr><td>' . $error . '</td></tr>';
                                }
                                ?>
                                <tr>
                                    <td class="grid_heading">S.No</td>
                                    <td class="grid_heading">Name</td>
                                    <td class="grid_heading">Email</td>
                                    <td class="grid_heading">Phone</td>
                                    <td class="grid_heading">Subject</td>
                                    <td class="grid_heading">Message</td>
                                    
                                    <td class="grid_heading">Delete</td>
                                </tr>
                                <?php
                                $i = 0;
                                $sql_contact = "SELECT * FROM feedback ORDER BY name ASC";
                                $res_contact = mysqli_query($conn, $sql_contact);
                                if (mysqli_num_rows($res_contact) > 0) {
                                    while ($row = mysqli_fetch_array($res_contact)) {
                                        $i++;
                                        ?>
                                        <tr>
                                            <td class="grid_label"><?php echo $i; ?></td>
                                            <td class="grid_label"><?php echo $row['name'] ?></td>
                                            <td class="grid_label"><?php echo $row['email'] ?></td>
                                            <td class="grid_label"><?php echo $row['phone_no'] ?></td>
                                            <td class="grid_label"><?php echo $row['subject'] ?></td>
                                            <td class="grid_label"><?php echo $row['message'] ?></td>
                                           
                                            <td class="grid_label"><a href="feedback_list.php?id=<?php echo $row ['id']; ?>">Delete</a></td>
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
