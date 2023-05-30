<?php
include './dbconfigur.php';
//$hotel_id = $_GET['hotel_id'];
if (!empty($user_id)) {
    $error = "";
    //Code for saving category
    if (isset($_POST['btnsubmit'])) {
        extract($_POST);
        echo $sql_query = "INSERT INTO packages(hotel_id,person,source,destination,sales_price,days,medium,created)"
        . "VALUES('" . $hotel_id . "','" . $person . "','" . $source . "','" . $destination . "','" . $sales_price . "','" . $days . "','" . $medium . "','" . date('Y-m-d') . "')";
        $result = $conn->query($sql_query);
        if ($result) {
            $ads_id = mysqli_insert_id($conn);
            header("location:add_package.php?status=success");
        } else {
            $error = "Data has not been saved.";
        }
    }
    ?>
    <html>
        <head>
            <title>Add Package  - Clever Traveler</title>
            <?php include 'title.php'; ?>
            <script type="text/javascript">
                function formValidation() {

                    var category = document.getElementById('hotel_name').value;
                    if (category.trim() == "") {
                        alert('Please select hotel name');
                        return false;
                    }

                    var ads_for = document.getElementById('person').value;
                    if (ads_for.trim() == "") {
                        alert('Please select no of person.');
                        return false;
                    }


                    var no_of_day = document.getElementById('source').value;
                    if (no_of_day.trim() == "") {
                        alert('Please enter source.');
                        return false;
                    }

                    var start_date = document.getElementById('destination').value;
                    if (start_date.trim() == "") {
                        alert('Please enter city.');
                        return false;
                    }
                    var title = document.getElementById('sales_price').value;
                    if (title.trim() == "") {
                        alert('Please enter price');
                        return false;
                    }
                }

                //check for integer
                function CheckInteger(i) {
                    if (i.value.length > 0) {
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
                            <h1>Add Package</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div class="container" style="min-height: 500px;">
                <div class="row">
                    <div class="col-md-3">
                        <div class="title-box clearfix">&nbsp;<br/><br/></div> 
                        <?php
                        include './leftmenu.php';
                        ?>
                    </div>
                    <div class="col-md-8">
                        <div class="title-box clearfix">&nbsp;<br/><br/></div>
                        <form action="" method="post" enctype="multipart/form-data">                            
                            <?php
                            if (!empty($error)) {
                                echo '<div class="style">' . $error . '</div>';
                            }
                            if (isset($_GET['status']) && $_GET['status'] == "success") {
                                echo '<div class="style">Hotel  has been successfuly added.</div>';
                            }
                            ?>                                                           
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Hotel Name:</label>
                                        <select name="hotel_id" id="hotel_id" class="form-control"  required=""> 
                                            <option> - - - - Select - - - - </option>
                                            <?php
                                            $sql = "SELECT * FROM hotels ORDER BY id ASC";
                                            $result = mysqli_query($conn, $sql);
                                            if (mysqli_num_rows($result) > 0) {
                                                while ($row = mysqli_fetch_array($result)) {
                                                    ?>
                                                    <option value="<?php echo $row['id'] ?>"><?php echo $row['hotel_name'] ?></option>
                                                    <?php
                                                }
                                            }
                                            ?>
                                        </select>
                                    </div>   
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>No Of Person:</label>
                                        <select name="person" id="person" class="form-control"  required=""> 
                                            <option> - - - - Select - - - - </option>
                                            <option value="1"> 1 </option>
                                            <option value="2"> 2 </option>
                                            <option value="3"> 3 </option>
                                            <option value="4"> 4 </option>
                                            <option value="5"> 5 </option>
                                            <option value="6"> 6 </option>
                                            <option value="7"> 7 </option>
                                        </select>
                                    </div>    
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Source:</label>
                                        <input type="text" name="source" id="source" required="" maxlength="20"  class="form-control"/>
                                    </div>   
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Destination:</label>
                                        <input type="text" name="destination" id="destination" required=""  class="form-control"/>                                        
                                    </div>   
                                </div>
                            </div>  
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Price:</label>
                                        <input type="text" name="sales_price" id="sales_price" required="" class="form-control"/>
                                    </div>   
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>By:</label>
                                        <select name="medium" id="medium" class="form-control"  required=""> 
                                            <option> - - - - Select - - - - </option>
                                            <option value="flight"> flight </option>
                                            <option value="train"> train </option>
                                            <option value="bus"> bus </option>
                                        </select>
                                    </div> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>No Of Days:</label>
                                        <select name="days" id="days" class="form-control"  required=""> 
                                            <option> - - - - Select - - - - </option>
                                            <option value="1"> 1 </option>
                                            <option value="2"> 2 </option>
                                            <option value="3"> 3 </option>
                                            <option value="4"> 4 </option>
                                            <option value="5"> 5 </option>
                                            <option value="6"> 6 </option>
                                            <option value="7"> 7 </option>
                                        </select>
                                    </div>    
                                </div>
                                <div class="col-md-6">

                                </div>
                            </div>
                            <button type="submit" name="btnsubmit" id="btnsubmit" class="btn btn-two">Submit</button><p><br/></p>                    
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

mysqli_close($conn);
?>