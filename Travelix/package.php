<?php
include './dbconfigur.php';
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Package - Clever Traveler</title>
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
                        <h1>Package</h1>
                    </div>
                </div>
            </div>
        </header>
        <!-- container -->
        <section class="container" style="min-height:550px;">
            <div class="row">
                <!-- main content -->
                <section class="col-sm-12 maincontent" style="min-height: 450px;">
                    <h3></h3>
                    <form method="get" action="package_details.php">
                        <div class="row">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <select name="source" id="source" class="form-control"> 
                                        <option value=""> - - - - Source - - - - </option>
                                        <?php
                                        $sql1 = "SELECT DISTINCT `source` FROM packages order by `source` asc";
                                        $res1 = mysqli_query($conn, $sql1);
                                        if (mysqli_num_rows($res1) > 0) {
                                            while ($row = mysqli_fetch_array($res1)) {
                                                ?>
                                                <option value="<?php echo $row['source'] ?>"><?php echo $row['source'] ?></option>
                                                <?php
                                            }
                                        }
                                        ?>
                                    </select>
                                </div>   
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <select name="destination" id="destination" class="form-control"> 
                                        <option value=""> - - - - Destination - - - - </option>
                                        <?php
                                        $sql = "SELECT DISTINCT `destination` FROM packages order by `destination` ASC";
                                        $result = mysqli_query($conn, $sql);
                                        if (mysqli_num_rows($result) > 0) {
                                            while ($row = mysqli_fetch_array($result)) {
                                                ?>
                                                <option value="<?php echo $row['destination'] ?>"><?php echo $row['destination'] ?></option>
                                                <?php
                                            }
                                        }
                                        ?>
                                    </select>
                                </div>   
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <select name="days" id="days" class="form-control"> 
                                        <option value=""> - - - - Days - - - - </option>     
                                        <?php
                                        $sql = "SELECT DISTINCT days  FROM packages ORDER BY days ASC";
                                        $result = mysqli_query($conn, $sql);
                                        if (mysqli_num_rows($result) > 0) {
                                            while ($row = mysqli_fetch_array($result)) {
                                                ?>
                                                <option value="<?php echo $row['days'] ?>"><?php echo $row['days'] ?></option>
                                                <?php
                                            }
                                        }
                                        ?>
                                    </select>
                                </div>   
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <select name="category" id="category" class="form-control"> 
                                        <option value=""> - - - - Type - - - - </option>
                                        <?php
                                        $sql = "SELECT * FROM categorys ORDER BY id ASC";
                                        $result = mysqli_query($conn, $sql);
                                        if (mysqli_num_rows($result) > 0) {
                                            while ($row = mysqli_fetch_array($result)) {
                                                ?>
                                                <option value="<?php echo $row['id'] ?>"><?php echo $row['category'] ?></option>
                                                <?php
                                            }
                                        }
                                        ?>
                                    </select>
                                </div>   
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="search" id="search" placeholder="Search"/>
                                </div>   
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <button type="submit" name="btnsubmit" id="btnsubmit" class="btn btn-two">Submit</button>
                                </div>   
                            </div>
                        </div>
                    </form>
                    <h3>Package</h3>
                    <div class="row">
                        <?php
                        $sql_contact = "SELECT * FROM categorys order by id desc";
                        $res_contact = mysqli_query($conn, $sql_contact);
                        if (mysqli_num_rows($res_contact) > 0) {
                            while ($row = mysqli_fetch_array($res_contact)) {
                                ?>
                                <div class="col-sm-4">
                                    <a href="package_details.php?category=<?php echo $row ['id']; ?>">
                                        <img src="<?php echo $row['imagepath'] ?>" height="250" /><br/>
                                        <h3 style="text-align:center;margin-top: 0px;"><?php echo $row['category'] ?></h3>
                                    </a>
                                </div>                                
                                <?php
                            }
                        } else {
                            echo '<div class="col-sm-12" style="padding:20px;">Data not found.</div>';
                        }
                        ?>
                    </div><br><br>
                    <div class="row">
                        <div class="col-md-12">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24973.64711549482!2d77.23462183469994!3d28.569869763152003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1684341020748!5m2!1sen!2sin" width="900" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </section>
            </div>
        </section>       
        <?php
        include 'footer.php';
        ?>        
    </body>
</html>
