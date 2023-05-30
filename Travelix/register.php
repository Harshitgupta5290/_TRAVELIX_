<?php
include './dbconfigur.php';
if (isset($_POST['btnsubmit'])) {
    $error = "";
    extract($_POST);
    if (empty($name)) {
        $error = "Please enter your name.";
    }
    if (empty($email)) {
        $error = "Please enter your email.";
    }
    if (empty($phone_no)) {
        $error = "Please enter your phone_no.";
    }
    if (empty($password)) {
        $error = "Please enter your password.";
    }
    if (empty($error)) {
        $sql_query = "INSERT INTO users(name,email,phone_no,password,adding_date)"
                . "VALUES('" . $name . "','" . $email . "','" . $phone_no . "','" . $password . "','" . date('Y-m-d h:i:s') . "')";        
        $result = $conn->query($sql_query);
        if ($result) {
            header("location:register.php?reg=success");
        } else {
            $error = "Data has not been saved.";
        }
    }
}
?>
<html>
    <head>
        <title>Register - Clever Traveler</title>
        <?php include 'title.php'; ?> 
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
    </head>
    <body>
        <?php
        include 'header.php';
        ?>
        <header id="head" class="secondary">
            <div class="container">
                <div class="row">
                    <div class="col-sm-8">
                        <h1>Register</h1>
                    </div>
                </div>
            </div>
        </header>
        <!-- container -->
        <div class="container"style="min-height:550px;">
            <div class="row">
                <div class="col-md-6">
                    <h3 class="section-title">Register</h3>
                    <form class="form-light mt-20" role="form" method="post" action="register.php" id="register-form" novalidate>
                        <?php
                        if (!empty($message)) {
                            echo '<div class="style">' . $error . '</div>';
                        }
                        if (isset($_GET['reg']) && $_GET['reg'] == "success") {
                            echo '<div class="style">You have been successfuly registered.</div>';
                        }
                        ?> 
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" id="name" name="name" class="form-control" placeholder="Your name" maxlength="100">
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" id="email" name="email" class="form-control" placeholder="Email address"maxlength="125">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text" id="phone_no" name="phone_no"class="form-control" placeholder="Phone number"maxlength="10"  onkeyup="checkForIntegers(this)" >
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" id="password" name="password" class="form-control" placeholder="Password"maxlength="25">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" id="cnfpassword" name="cnfpassword" class="form-control" placeholder="Confirm Password"maxlength="25">
                                </div>
                            </div>
                        </div>
                        <button type="submit" id="btnsubmit" name="btnsubmit" class="btn btn-one" onClick="return regFormValidation()">Submit</button><p><br/></p>
                    </form>
                </div>
                <div class="col-md-6">
                    <div class="title-box clearfix ">
                        <h2 class="title-box_primary">&nbsp;</h2></div> 
                    <figure class="frame thumbnail alignnone clearfix">
                        <p><img class="size-full " alt="usa" src="images/hotel_astro_resort.jpg" width="" height="250"></p>
                    </figure>                   						
                </div>
            </div>
        </div>       
        <?php
        include 'footer.php';
        ?>               

    </body>
</html>
