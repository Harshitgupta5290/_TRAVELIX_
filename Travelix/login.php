<?php
//ob_start();
//session_start();
include './dbconfigur.php';

if (isset($_POST['btnsubmit'])) {

    $error = "";
    
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (empty($email)) {
        $error = "Please enter your email";
    }
    if (empty($password)) {
        $error = "Please enter your password";
    }

    if (empty($error)) {
        
        $query = "Select id,name,email,user_type,imgpath from users where email = '$email' AND password = '$password'";
        $result = $conn->query($query);
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_array($result);

            $_SESSION['map_user_id'] = $row['id'];
            $_SESSION['map_user_name'] = $row['name'];
            $_SESSION['map_user_type'] = $row['user_type'];
            header('location:myaccount.php');
        }
    }
}
?> 
<html>
    <head>
        <title>Login - Clever Traveler</title>
        <?php include 'title.php'; ?>
        <script>

        </script>
    </head>
    <body>
        <?php
        include './header.php';
        ?>
        <header id="head" class="secondary">
            <div class="container">
                <div class="row">
                    <div class="col-sm-8">
                        <h1>Login</h1>
                    </div>
                </div>
            </div>
        </header>
        <div class="container" style="min-height:550px;">
            <div class="row">
                <div class="col-md-6">
                    <h3 class="section-title">Login</h3>
                    <form class="form-light mt-20" role="form" method="post" action="login.php">
                        <?php
                        if (!empty($error)) {
                            echo '<div class="text"><label class="error">' . $error . '</label></div>';
                        }

                        if (isset($_GET['msg']) && $_GET['msg'] == "login") {
                            echo '<div class="text"><label class="error">You must be login.</label></div>';
                        }
                        ?>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="email" name="email" class="form-control" placeholder="Email address">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="password" name="password" class="form-control" placeholder="Password">
                        </div>
                        <button type="submit" name="btnsubmit" class="btn btn-one" onclick="return loginFormValidation()">Login</button><p><br/></p>
                    </form>
                </div>
                <div class="col-md-6">
                    <br/><br/>
                    <img src="images/beech.jpg" alt="" class="img-responsive">                  						
                </div>
            </div>
        </div>       
        <?php
        include './footer.php';
        ?>               

    </body>
</html>
