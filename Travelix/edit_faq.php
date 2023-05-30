
<?php
include './dbconfigur.php';
if (!empty($user_id)) {
    $error = "";
    $faqid = "";

    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $faqid = mysqli_real_escape_string($conn, $_GET['id']);
        echo ' $faqid';
        if (isset($_POST['btnsubmit'])) {
            echo 'bbbbbb';
            extract($_POST);
            if (empty($reply)) {
                $error = "Please reply message.";
            }
            if(empty($error)){
                echo 'bbbbcccbb';
               echo  $query = "update demo set reply='" . $reply . "'  where id = '$faqid' ";
                $r = $conn->query($query);
                $num = (int) $r;
                if ($num > 0) {
                    header("location:faq-list.php");
                } else {
                    $error = "Faq has not been replied.";
                }
          }
        }
    }
    ?>

<!DOCTYPE html>
<html lang="en">
<head>
        <title>Reply Faq - Clever Traveler</title>
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
                        <form class="form-light mt-20" role="form" method="post" action="edit_faq.php?id=<?php echo $faqid ?>">
                            <table class="table_list">
                                <?php
                             
                                if (!empty($error)) {
                                    echo '<tr><td>' . $error . '</td></tr>';
                                }
                                ?>
                              
                                <?php
                                $i = 0;
                                $sql_demo = "SELECT * FROM demo where id = '".$faqid."'";
                                $res_demo = mysqli_query($conn, $sql_demo);
                                if (mysqli_num_rows($res_demo) > 0) {
                                    while ($row = mysqli_fetch_array($res_demo)) {
                                       
                                        ?>
                                        <tr>
                                            <td class="grid_label">Name</td>
                                             <td class="grid_label"><?php echo $row['name'] ?></td>
                                        </tr>
                                        <tr>
                                            <td class="grid_label">Subject</td>
                                             <td class="grid_label"><?php echo $row['subject'] ?></td>
                                        </tr>
                                        <tr>
                                            <td class="grid_label">Message</td>
                                             <td class="grid_label"><?php echo $row['message'] ?></td>
                                        </tr>
                                        <tr>
                                            <td class="grid_label">Reply</td>
                                             <td class="grid_label">
                                             <input type="text" id="reply" name="reply" class="form-control" placeholder="Reply" maxlength="500" required>
                                             </td>
                                        </tr>
                                        <tr>
                                       
                                            <td class="grid_label" colspan="2">
                                            <button type="submit" name="btnsubmit" class="btn btn-two" >Reply</button>
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