<div class="navbar navbar-inverse">
    <div class="container">
        <div class="navbar-header" style="margin-top: -10px;">            
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.php">
            <img src="./images/logo.png" alt="">
            </a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav pull-right mainNav">
                <li><a href="index.php">Home</a></li>                
                <li><a href="about.php">About</a></li>
                <li><a href="package.php">Package</a></li>
                <li><a href="https://travel-mate-ad.netlify.app/">Travel Mate</a></li>
                <li><a href="feedback.php">Feedback</a></li>
                <li><a href="faq.php">Faq</a></li>
                <?php
                if (!empty($user_id)) {
                    ?>
                    <li><a href="myaccount.php">My Account</a></li>                    
                    <?php
                } else {
                    ?>
                    <li><a href="register.php">Register</a></li>
                    <li><a href="login.php">Login</a></li>
                    <?php
                }
                ?>
            </ul>
        </div>       
    </div>
</div>