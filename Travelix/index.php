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
        echo $sql_query = "INSERT INTO contact(name,email,phone_no,subject,message,adding_date)"
                . "VALUES('" . $name . "','" . $email . "','" . $phone_no . "','" . $subject . "','" . $message . "','" . date('Y-m-d h:i:s') . "')";
                $result = $conn->query($sql_query);
        if ($result) {
            header("location:index.php?reg=success");
        } else {
            $error = "Data has not been saved.";
        }
    }
}
?>
<html>
    <head>
        <title>Welcome to Clever Traveler</title>
        <?php include 'title.php'; ?>
    </head>
    <body>
        <?php
        include 'header.php';
        ?>
        <!-- Header -->
        <header id="head">
            <div class="container" >
                <div class="banner-content">
                    <div id="da-slider" class="da-slider">
                        <div class="da-slide">
                            <h2>Book Flights</h2>
                            <p>Book Flights, Hotels and Holiday Packages</p>
                            <div class="da-img"></div>
                        </div>
                        <div class="da-slide">
                            <h2>Book Hotels</h2>
                            <p>Book Domestic and International Holidays</p>
                            <div class="da-img"></div>
                        </div>
                        <div class="da-slide">
                            <h2>Book Bus</h2>
                            <p>Book Villas, Apartments, Resorts and more</p>
                            <div class="da-img"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- /Header -->

       
        <section class="hotels">
        <div class="container">
            <h5 class="section-head">
                <span class="heading">Explore</span>
                <span class="sub-heading">Our Beautiful Hotels</span>

            </h5>
            <div class="grid">
                <div class="grid-item featured-hotels">
                    <img src="./images/hotel_astro_resort.jpg" alt="" class="hotel-image">
                    <h5 class="hotel-name">Astro Hotel</h5>
                    <span class="hotel-price">From Rs2000/Night</span>
                    <div class="hotel-rating">
                        <i class="fa-regular fa-star rating"></i>
                        <i class="fa-regular fa-star rating"></i>
                        <i class="fa-regular fa-star rating"></i>
                        <i class="fa-regular fa-star rating"></i>
                        <i class="fas fa-star-half rating"></i>
                    </div>
                    <a href="package.php" class="btn btn-gradient">
                        Book Now
                        <span class="dots"><i class="fas fa-ellipsis"></i></span>
                    </a>
                </div>

                <div class="grid-item featured-hotels">
                    <img src="./images/hotel_the_enchanted_garden.jpg" alt="" class="hotel-image">
                    <h5 class="hotel-name">Enchanted Garden</h5>
                    <span class="hotel-price">From Rs3000/Night</span>
                    <div class="hotel-rating">
                        <i class="fa-regular fa-star rating"></i>

                    </div>
                    <a href="package.php" class="btn btn-gradient">
                        Book Now
                        <span class="dots"><i class="fas fa-ellipsis"></i></span>
                    </a>
                </div>

                <div class="grid-item featured-hotels">
                    <img src="./images/hotel_the_paradise.jpg" alt="" class="hotel-image">
                    <h5 class="hotel-name">The Paradise</h5>
                    <span class="hotel-price">From Rs3500/Night</span>
                    <div class="hotel-rating">
                        <i class="fa-regular fa-star rating"></i>
                    </div>
                    <a href="package.php" class="btn btn-gradient"> Book Now
                        <span class="dots"><i class="fas fa-ellipsis"></i></span>
                    </a>
                </div>
            </div>
        </div>
    </section>
    <section class="offer">
        <div class="container">
            <div class="offer-content">
                <div class="discount">
                    40% Offer
                </div>
                <h5 class="hotel-name">The Paradise</h5>
                <div class="hotel-ratings">
                    <div class="hotel-rating">
                        <i class="fa-regular fa-star rating"></i>
                        <i class="fa-regular fa-star rating"></i>
                        <i class="fa-regular fa-star rating"></i>
                        <i class="fa-regular fa-star rating"></i>
                        <i class="fas fa-star-half rating"></i>
                    </div>
                    <p class="paragraph">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet in qui quisquam ab et, nulla esse officia nesciunt nihil laborum autem?
                    </p>
                    <a href="#" class="btn btn-gradient">Redeem Offer
                        <span class="dots"><i class="fas fa-ellipsis"></i></span>
                    </a>
                    
                </div>
            </div>
        </div>
    </section>
    <section class="rooms">
        <div class="container">
            <h5 class="section-head">
                <span class="heading">Luxurious</span>
                <span class="sub-heading">Affordable Rooms</span>
            </h5>
            <div class="grid rooms-grid">
                <div class="grid-item featured-rooms">
                    <div class="image-wrap">
                        <img class="room-image" src="./images/room_1.jpg" alt="">
                        <h5 class="room-name">Astro hotel</h5>
                    </div>
                    <div class="room-info-wrap">
                        <span class="room-price">Rs2000 <span class="per-night">Per Night</span></span>
                        <p class="paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nulla illo vitae animi unde officiis dolorem eaque! Similique dignissimos temporibus quibusdam deserunt sint quia atque perspiciatis, eos illo in nobis.
                        </p>
                        <a href="package.php" class="btn rooms-btn">Book Now &rarr;</a>
                    </div>
                </div>
                <div class="grid-item featured-rooms">
                    <div class="image-wrap">
                        <img class="room-image" src="./images/room_2.jpg" alt="">
                        <h5 class="room-name">Astro hotel</h5>
                    </div>
                    <div class="room-info-wrap">
                        <span class="room-price">Rs2000 <span class="per-night">Per Night</span></span>
                        <p class="paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nulla illo vitae animi unde officiis dolorem eaque! Similique dignissimos temporibus quibusdam deserunt sint quia atque perspiciatis, eos illo in nobis.
                        </p>
                        <a href="package.php" class="btn rooms-btn">Book Now &rarr;</a>
                    </div>
                </div>
                <div class="grid-item featured-rooms">
                    <div class="image-wrap">
                        <img class="room-image" src="./images/room_3.jpg" alt="">
                        <h5 class="room-name">Astro hotel</h5>
                    </div>
                    <div class="room-info-wrap">
                        <span class="room-price">Rs2000 <span class="per-night">Per Night</span></span>
                        <p class="paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nulla illo vitae animi unde officiis dolorem eaque! Similique dignissimos temporibus quibusdam deserunt sint quia atque perspiciatis, eos illo in nobis.
                        </p>
                        <a href="package.php" class="btn rooms-btn">Book Now &rarr;</a>
                    </div>
                </div>
                <div class="grid-item featured-rooms">
                    <div class="image-wrap">
                        <img class="room-image" src="./images/room_4.jpg" alt="">
                        <h5 class="room-name">Astro hotel</h5>
                    </div>
                    <div class="room-info-wrap">
                        <span class="room-price">Rs2000 <span class="per-night">Per Night</span></span>
                        <p class="paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nulla illo vitae animi unde officiis dolorem eaque! Similique dignissimos temporibus quibusdam deserunt sint quia atque perspiciatis, eos illo in nobis.
                        </p>
                        <a href="package.php" class="btn rooms-btn">Book Now &rarr;</a>
                    </div>
                </div>
                <div class="grid-item featured-rooms">
                    <div class="image-wrap">
                        <img class="room-image" src="./images/room_6.jpg" alt="">
                        <h5 class="room-name">Astro hotel</h5>
                    </div>
                    <div class="room-info-wrap">
                        <span class="room-price">Rs2000 <span class="per-night">Per Night</span></span>
                        <p class="paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nulla illo vitae animi unde officiis dolorem eaque! Similique dignissimos temporibus quibusdam deserunt sint quia atque perspiciatis, eos illo in nobis.
                        </p>
                        <a href="package.php" class="btn rooms-btn">Book Now &rarr;</a>
                    </div>
                </div>
                <div class="grid-item featured-rooms">
                    <div class="image-wrap">
                        <img class="room-image" src="./images/room_7.jpg" alt="">
                        <h5 class="room-name">Astro hotel</h5>
                    </div>
                    <div class="room-info-wrap">
                        <span class="room-price">Rs2000 <span class="per-night">Per Night</span></span>
                        <p class="paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nulla illo vitae animi unde officiis dolorem eaque! Similique dignissimos temporibus quibusdam deserunt sint quia atque perspiciatis, eos illo in nobis.
                        </p>
                        <a href="package.php" class="btn rooms-btn">Book Now &rarr;</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="contact">
        <div class="container">
            <h5 class="section-head">
                <span class="heading">Contact</span>
                <span class="sub-heading">Get in touch with us</span>
            </h5>
            <div class="row">
             <div class="col-md-6">
             <div class="traveler-wrap">
                    <img src="./images/traveler.png" alt="">
                </div>
             </div>
             <div class="col-md-6">
             <form class="form-light mt-20" role="form" method="post" action="index.php">
                        <?php
                        if (!empty($error)) {
                            echo '<div class="style">' . $error . '</div>';
                        }

                        if (isset($_GET['reg']) && $_GET['reg'] == "success") {
                            echo '<div class="style">Your Index form has been successfuly saved.</div>';
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
             </div>
            </div>
            
        </div>
    </section>
        <?php include './footer.php'; ?> 
        <script src="main.js"></script>
    </body>
</html>
