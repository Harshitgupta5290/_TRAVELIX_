<?php
include './dbconfigur.php';
if (isset($_POST['btnsubmit'])) {
    $error = "";
    extract($_POST);
    if (empty($name)) {
        $error = "Please enter name.";
    }
    if (empty($email)) {
        $error = "Please enter email.";
    }
    if (empty($phone_no)) {
        $error = "Please enter phone_no.";
    }
    if (empty($subject)) {
        $error = "Please enter subject.";
    }
    if (empty($message)) {
        $error = "Please enter your message.";
    }
    if (empty($error)) {
        $sql_query = "INSERT INTO feedback(name,email,phone_no,subject,message,adding_date)"
                . "VALUES('" . $name . "','" . $email . "','" . $phone_no . "','" . $subject . "','" . $message . "','" . date('Y-m-d h:i:s') . "')";
        $result = $conn->query($sql_query);
        if ($result) {
            header("location:feedback.php?reg=success");
        } else {
            $error = "Data has not been saved.";
        }
    }
}
?>
<html>
    <head>
        <title>Feedback - Clever Traveler</title>
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
    </head>
    <body>
        <?php
        include 'header.php';
        ?>
        <header id="head" class="secondary">
            <div class="container">
                <div class="row">
                    <div class="col-sm-8">
                        <h1>Feedback</h1>
                    </div>
                </div>
            </div>
        </header>

        <!-- container -->
        <div class="container" style="min-height:550px;">
            <div class="row">
                <div class="col-md-7">
                    <h3 class="section-title">Your Feedback</h3>
                    <form class="form-light mt-20" role="form" method="post" action="feedback.php">
                        <?php
                        if (!empty($error)) {
                            echo '<div class="style">' . $error . '</div>';
                        }

                        if (isset($_GET['reg']) && $_GET['reg'] == "success") {
                            echo '<div class="style">Your feedback form has been successfuly saved.</div>';
                        }
                        ?> 
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" name="name" id="name" class="form-control" placeholder="Your name" maxlength="100">
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" id="email" name="email" class="form-control" placeholder="Email address" maxlength="125">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text"id="phone_no" name="phone_no" class="form-control" placeholder="Phone number" maxlength="10"  onkeyup="checkForIntegers(this)" >
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Subject</label>
                            <input type="text" id="subject" name="subject" class="form-control" placeholder="Subject" maxlength="500">
                        </div>
                        <div class="form-group">
                            <label>Message</label>
                            <textarea class="form-control" id="message" name="message" placeholder="Write you message here..." style="height:100px;" maxlength="1000"></textarea>
                        </div>
                        <button type="submit" name="btnsubmit" class="btn btn-two" onClick="return contactFormValidation()" >Send message</button><p><br/></p>
                    </form>
                </div>
                <div class="col-md-5">
                    <br/><br/>
                    <img src="images/hotel_the_enchanted_garden.jpg" alt="" class="img-responsive">
                </div>
            </div>
            <!-- <div class="row">
                        <div class="col-md-12">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24973.64711549482!2d77.23462183469994!3d28.569869763152003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1684341020748!5m2!1sen!2sin" width="900" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div> -->
        </div>       
        <?php
        include 'footer.php';
        ?>               

    </body>
</html>
