<?php
include './dbconfigur.php';
if (!empty($user_id)) {

    $error = "";
    if (isset($_POST['btnchangenow'])) {
        extract($_POST);

        if (empty($oldpwd)) {
            $error = "Please enter your current password.";
        }
        if (empty($newpwd)) {
            $error = "Please enter your new password.";
        }
        if (empty($conpwd)) {
            $error = "Please enter your confirm password.";
        }
        if ($newpwd != $conpwd) {
            $error = "New password does not match with confirm password.";
        }
        if (empty($error)) {

            $sql_change_pwd = "update users set password='" . $newpwd . "' where id='" . $user_id . "' AND password='" . $oldpwd . "'";
            $result_password = $conn->query($sql_change_pwd);
            $valueInsert = (int) $result_password;

            if ($valueInsert > 0) {
                header("location:changepassword.php?status=success");
            } else {
                $error = "Password has not been changed.";
            }
        }
    }
    ?>
    <html>
        <head>
            <title>Change Password - Clever Traveler</title>
            <?php include 'title.php'; ?>
            <script type="text/javascript" src="js/validation.js"></script>
        </head>
        <body>
            <?php
            include 'header.php';
            ?>
            <header id="head" class="secondary">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8">
                            <h1>Change Password</h1>
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
                        <form class="form-light mt-20" role="form" method="post" action="changepassword.php">
                            <?php
                            if (!empty($error)) {
                                echo '<div class="style">' . $error . '</div>';
                            }

                            if (isset($_GET['status']) && $_GET['status'] == "success") {
                                echo '<div class="style">Your password has been successfuly changed.</div>';
                            }
                            ?>


                            <div class="form-group">
                                <label>Old Password</label>
                                <input type="password" id="oldpwd" name="oldpwd" class="form-control" placeholder="Current Password">
                            </div>
                            <div class="form-group">
                                <label>New Password</label>
                                <input type="password" id="newpwd" name="newpwd" class="form-control" placeholder="New Password">
                            </div>
                            <div class="form-group">
                                <label>Confirm Password</label>
                                <input type="text" id="conpwd" name="conpwd" class="form-control" placeholder="Confirm Password">
                            </div>
                            <button type="submit" id="btnchangenow" name="btnchangenow" class="btn btn-one" onClick="return changeFormValidation()"/>Change Now</button><p><br/></p>
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