<?php
$hid = $_GET['id'];
$error = "";
include './dbconfigur.php';
if (isset($_POST['btnsubmit']) && empty(!$user_id)) {
    extract($_POST);
   
    if (empty($rating)) {
        $error = "Please enter rating.";
    }
    if (empty($title)) {
        $error = "Please enter title.";
    }
    if (empty($write_a_review)) {
        $error = "Please enter review.";
    }
    echo $error;
    if (empty($error)) {
       echo  $sql_query = "INSERT INTO review_and_rating(user_id,rating,title,description,created_at, package_id)"
                . "VALUES('" . $user_id . "','" . $rating . "','" . $title . "','" . $write_a_review .  "','" . date('Y-m-d h:i:s') . "', '$hid')";
        $result = $conn->query($sql_query);
        if ($result) {
            header("location:hotel-details.php?reg=success&id=".$hid);
        } else {
            $error = "Your rating has not been saved.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Package Details- Clever Traveler</title>
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
                        <h1>Package Details</h1>
                    </div>
                </div>
            </div>
        </header>
        <!-- container -->
        <section class="container">
            <div class="row">
                <!-- main content -->
                <section class="col-sm-12 maincontent" style="min-height: 450px;">
                    <h3></h3>
                    <div class="row">
                        <?php
                        $sql_contact = "select c.*,h.*,p.*, p.id as package_id from categorys c join hotels h on c.id = h.category join packages p on p.hotel_id = h.id where p.astatus = 1 and p.id = '".$hid."' order by p.id desc";
                        $res_contact = mysqli_query($conn, $sql_contact);
                        if (mysqli_num_rows($res_contact) > 0) {
                            $row = mysqli_fetch_array($res_contact);
                            ?>
                            <div class="col-sm-6">
                                <img src="<?php echo $row['imagepath'] ?>" height="450" />
                            </div> 
                            <div class="col-sm-6">
                                <p class="col-sm-6" style="font-size:18px;"><strong>Hotel Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><?php echo $row['hotel_name'] ?></p>
                                <p class="col-sm-6"  style="font-size:18px;"><strong>City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><?php echo $row['city'] ?></p>
                                <p class="col-sm-6"  style="font-size:18px;"><strong>Days &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><?php echo $row['days'] ?></p>
                                <p class="col-sm-6" style="font-size:18px;"><strong>No Of Person&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><?php echo $row['person'] ?></p>
                                <p class="col-sm-6"  style="font-size:18px;"><strong>Source &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><?php echo $row['source'] ?></p>
                                <p class="col-sm-6" style="font-size:18px;"><strong>Destination &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><?php echo $row['destination'] ?></p>
                                <p class="col-sm-12"  style="font-size:18px;"><strong>Description &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><?php echo $row['description'] ?></p>
                                <p><br/><br/></p>
                                <a href="payments.php?package_id=<?php echo $row['id'] ?>" class="btn btn-one" style="float: right;">Book Now</a>
                            </div>
                                <div class="col-sm-6">
                                  <?php if (!empty($user_id)) { ?>
                               <form method="post" action="hotel-details.php?id=<?php echo $hid; ?>" >
                               <?php
                    
                        if (isset($_GET['reg']) && $_GET['reg'] == "success") {
                            echo '<div class="style">Your rating and review has been successfuly saved.</div>';
                        }
                        ?> 
                               <span class="heading">User Rating & Reviews</span>
                                <button class="star" type="button">&#9734;</button>
                                <button class="star" type="button">&#9734;</button>
                                <button class="star" type="button">&#9734;</button>
                                <button class="star" type="button">&#9734;</button>
                                <button class="star" type="button">&#9734;</button>
                                <p class="current-rating"></p>
                                <form class="form-light mt-20" role="form" method="post" action="hotal-details.php">
                               
                                <div class="form-group">
                            <label>Title</label>
                            <input type="hidden" name="rating" id="rating" value=""/>
                            <input type="text" name="title" id="title" class="form-control" placeholder="Title" maxlength="100">
                        </div>
                        <div class="form-group">
                            <label>Write a Review</label>
                            <textarea class="form-control" id="write_a_review" name="write_a_review" placeholder="Write a review here..." style="height:100px;" maxlength="1000"></textarea>
                        </div>
                        <button type="submit" name="btnsubmit" class="btn btn-two" onClick="return contactFormValidation()" >Submit</button><p><br/></p>
                         </form>
                     <?php } else {
                        echo '<h4>Login to write a review.</h4>';
                     }
                     ?>
                             <hr style="border:3px solid #f1f1f1">

                             <div class="row">
    
                                <div class="side">
                              <div>5 star</div>
                                 </div>
                              <div class="middle">
                          <div class="bar-container">
      <div class="bar-5"></div>
    </div>
  </div>
  <div class="side right">
    <div>
      <?php
       $sql_rating = "select count(*) as rating_count from review_and_rating  where package_id = '".$hid."' and rating=5 ";
       $res_rating = mysqli_query($conn, $sql_rating);
       if (mysqli_num_rows($res_rating) > 0) {
        $row = mysqli_fetch_array($res_rating);
        echo $row['rating_count'];
       }else{
        echo 0;
       }
      ?>
    </div>
  </div>
  <div class="side">
    <div>4 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-4"></div>
    </div>
  </div>
  <div class="side right">
    <div>
    <?php
       $sql_rating1 = "select count(*) as rating_count from review_and_rating  where package_id = '".$hid."' and rating=4 ";
       $res_rating1 = mysqli_query($conn, $sql_rating1);
       if (mysqli_num_rows($res_rating1) > 0) {
        $row = mysqli_fetch_array($res_rating1);
        echo $row['rating_count'];
       }else{
        echo 0;
       }
      ?>
    </div>
  </div>
  <div class="side">
    <div>3 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-3"></div>
    </div>
  </div>
  <div class="side right">
    <div><?php
       $sql_rating2 = "select count(*) as rating_count from review_and_rating  where package_id = '".$hid."' and rating=3 ";
       $res_rating2 = mysqli_query($conn, $sql_rating2);
       if (mysqli_num_rows($res_rating2) > 0) {
        $row = mysqli_fetch_array($res_rating2);
        echo $row['rating_count'];
       }else{
        echo 0;
       }
      ?></div>
  </div>
  <div class="side">
    <div>2 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-2"></div>
    </div>
  </div>
  <div class="side right">
    <div><?php
       $sql_rating3 = "select count(*) as rating_count from review_and_rating  where package_id = '".$hid."' and rating=2 ";
       $res_rating3 = mysqli_query($conn, $sql_rating3);
       if (mysqli_num_rows($res_rating3) > 0) {
        $row = mysqli_fetch_array($res_rating3);
        echo $row['rating_count'];
       }else{
        echo 0;
       }
      ?></div>
  </div>
  <div class="side">
    <div>1 star</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div class="bar-1"></div>
    </div>
  </div>
  <div class="side right">
    <div><?php
       $sql_rating4 = "select count(*) as rating_count from review_and_rating  where package_id = '".$hid."' and rating=1 ";
       $res_rating4 = mysqli_query($conn, $sql_rating4);
       if (mysqli_num_rows($res_rating4) > 0) {
        $row = mysqli_fetch_array($res_rating4);
        echo $row['rating_count'];
       }else{
        echo 0;
       }
      ?></div>
  </div>
</div>
            </div>
            </section>
                    </div>
                </section>
                            
                            </div>
                            <?php
                        }
                        ?>
                    
            </div>
            <section> 

            <style>
    
    .star{
  border:none;
  background-color: unset;
  color:goldenrod;
  font-size: 3rem;
}
.heading {
  font-size: 25px;
  
}

.fa {
  font-size: 25px;
}

.checked {
  color: orange;
}

/* Three column layout */
.side {
  float: left;
  width: 15%;
  margin-top: 10px;
  
}

.middle {
  float: left;
  width: 70%;
  margin-top: 10px;
}

/* Place text to the right */
.right {
  text-align: right;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* The bar container */
.bar-container {
  text-align: center;
  color: white;
  background:white;
}

/* Individual bars */
.bar-5 {width: 60%; height: 18px; background-color: #04AA6D;}
.bar-4 {width: 30%; height: 18px; background-color: #2196F3;}
.bar-3 {width: 10%; height: 18px; background-color: #00bcd4;}
.bar-2 {width: 4%; height: 18px; background-color: #ff9800;}
.bar-1 {width: 15%; height: 18px; background-color: #f44336;}

/* Responsive layout - make the columns stack on top of each other instead of next to each other */
@media (max-width: 400px) {
  .side, .middle {
    width: 100%;
  }
  /* Hide the right column on small screens */
  .right {
    display: none;
  }
}
            </style>
            
        </section>  
        
        <?php
        include 'footer.php';
        ?>
         <script src="js/script.js"></script>
        <script>
            const stars=document.querySelectorAll('.star');
            const current_rating = document.querySelector('.current-rating');

            stars.forEach((star,index)=>{
              star.addEventListener('click',()=>{

                let current_star=index+1;
                current_rating.innerText=`${current_star} of 5`;

                stars.forEach((star,i)=>{
                    if(current_star>=i+1){
                      star.innerHTML='&#9733;';
                    }else{
                      star.innerHTML='&#9734;';
                    }
                });
                document.getElementById("rating").value = current_star;
              });
 
});
        </script>        
    </body>
</html>
