
<?php
include './dbconfigur.php';
if (!empty($user_id)) {
    $error = "";

    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $contatid = mysqli_real_escape_string($conn, $_GET['id']);
        $sql = "DELETE FROM demo WHERE id='" . $contatid . "'";
        $result = mysqli_query($conn, $sql);
        $valueInsert = (int) $result;
        if ($valueInsert > 0) {
            header("location:faq-list.php?status=success");
        } else {
            $error = "Faq has not been deleted.";
        }
    }
    ?>

<!DOCTYPE html>
<html lang="en">
<head>
        <title>FAQ List - Clever Traveler</title>
        <?php include './title.php'; ?>
         <script type="text/javascript">
            //check for integer
            function checkForIntegers(i)
            {
                if (i.value.length > 0)
                {
                    i.value = i.value.replace(/[^\d]+/g, '');

                }
            }

        </script>
        <script type ="test/javascript"></script>
    </head>
<body>
<?php
        include 'header.php';
        ?>
        <header id="head" class="secondary">
            <div class="container">
                <div class="row">
                    <div class="col-sm-8">
                        <h1>Faq List</h1>
                    </div>
                </div>
            </div>
        </header>

        <!-- container -->

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
                        <form class="form-light mt-20" role="form" method="post" action="faq-list.php">
                            <table class="table_list">
                                <?php
                                if (isset($_GET['status']) && $_GET['status'] == "success") {
                                    echo '<tr><td colspan="4">Faq list has been successfully deleted.</td></tr>';
                                }
                                if (!empty($error)) {
                                    echo '<tr><td>' . $error . '</td></tr>';
                                }
                                ?>
                                <tr>
                                    <td class="grid_heading">S.No</td>
                                    <td class="grid_heading">Name</td>
                                    <td class="grid_heading">Subject</td>
                                    <td class="grid_heading">Message</td>
                                    <td class="grid_heading">Reply Details</td>
                                    <?php   if ($user_type == "admin") { ?>
                                    <td class="grid_heading">Reply</td>
                                    <td class="grid_heading">Delete</td>
                                    <?php } ?>
                                </tr>
                                <?php
                                $i = 0;
                                $sql_demo = "SELECT * FROM demo ORDER BY name ASC";
                                $res_demo = mysqli_query($conn, $sql_demo);
                                if (mysqli_num_rows($res_demo) > 0) {
                                    while ($row = mysqli_fetch_array($res_demo)) {
                                        $i++;
                                        ?>
                                        <tr>
                                        <td class="grid_label"><?php echo $i; ?></td>
                                            <td class="grid_label"><?php echo $row['name'] ?></td>
                                            <td class="grid_label"><?php echo $row['subject'] ?></td>
                                            <td class="grid_label"><?php echo $row['message'] ?></td>
                                            <td class="grid_label"><?php echo $row['reply'] ?></td>
                                            <?php   if ($user_type == "admin") { ?>
                                            <td class="grid_label">
                                                <a href="edit_faq.php?id=<?php echo $row ['id']; ?>">Reply</a>
                                            </td>
                                            <td class="grid_label"><a href="faq-list.php?id=<?php echo $row ['id']; ?>">Delete</a></td>
                                            <?php } ?>
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