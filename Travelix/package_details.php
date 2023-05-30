<?php
include './dbconfigur.php';
$search_query = "";
$source = isset($_GET['source']) ? $_GET['source'] : '';
$destination = isset($_GET['destination']) ? $_GET['destination'] : '';
$days = isset($_GET['days']) ? $_GET['days'] : '';
$category = isset($_GET['category']) ? $_GET['category'] : '';
$search = isset($_GET['search']) ? $_GET['search'] : '';

if(!empty($source)){
    $search_query = $search_query. " and p.source='$source'";
}

if(!empty($destination)){
    $search_query = $search_query. " and p.destination='$destination'";
}

if(!empty($days)){
    $search_query = $search_query. " and p.days='$days'";
}


if(!empty($category)){
    $search_query = $search_query. " and h.category=".$category;
}

if(!empty($search)){
    $search_query = $search_query. " and h.hotel_name like '%".$search."%'";
}
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
        <section class="container">
            <div class="row">
                <!-- main content -->
                <section class="col-sm-12 maincontent">
                    <br/><br/>
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
                </section>
                <section class="col-sm-12 maincontent" style="min-height: 450px;">
                    <h3></h3>
                    <div class="row">
                        <?php
                        $sql_contact = "select c.*,h.*,p.*, p.id as package_id from categorys c join hotels h on c.id = h.category join packages p on p.hotel_id = h.id where p.astatus = 1 $search_query order by p.id desc";
                        $res_contact = mysqli_query($conn, $sql_contact);
                        if (mysqli_num_rows($res_contact) > 0) {
                            while ($row = mysqli_fetch_array($res_contact)) {
                                ?>
                                <div class="col-sm-4">
                                    <a href="hotel-details.php?id=<?php echo $row ['package_id']; ?>">
                                        <img src="<?php echo $row['imagepath'] ?>" height="250" />
                                    </a>
                                    <br/>
                                    <p class="col-sm-6" style="font-size:18px;"><?php echo $row['city'] ?></p>
                                    <p class="col-sm-6"  style="font-size:18px;">Rs&nbsp;&nbsp;<?php echo $row['sales_price'] ?></p>
                                    <p class="col-sm-6"  style="font-size:18px;"><?php echo $row['person'] ?></p>
                                    <p class="col-sm-6" style="font-size:18px;"><?php echo $row['days'] ?></p>
                                </div>               
                                <?php
                            }
                        }
                        ?>
                    </div>
                </section>
            </div>
        </section>  
        <?php
        include 'footer.php';
        ?>        
    </body>
</html>
