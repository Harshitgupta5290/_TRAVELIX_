<?php
include './dbconfigur.php';
if (!empty($user_id)) {
    $error = "";
    //Code for saving category
    if (isset($_POST['btnsubmit'])) {
        extract($_POST);
        if (empty($category)) {
            $error = "Please Select category.";
        }
        $current_image = $_FILES['imagepath']['name'];
        $path = "uploads/";
        $time = date("fYhis");
        $comImagePath = "";
        //upload profile images
        $profile_image = $_FILES['imagepath']['name'];
        if ($profile_image != '') {
            $extension = substr(strrchr($profile_image, '.'), 1); //filethumgimg
            $comImagePath = $path . "/" . $time . "." . $extension;
            $action = copy($_FILES['imagepath']['tmp_name'], $comImagePath);
        }

        $current_image = $_FILES['imagepath2']['name'];
        $path = "uploads/";
        $time = date("fYhis");
        $comImagePath2 = "";
        //upload profile images
        $profile_image = $_FILES['imagepath2']['name'];
        if ($profile_image != '') {
            $extension = substr(strrchr($profile_image, '.'), 1); //filethumgimg
            $comImagePath2 = $path . "/" . $time . "." . $extension;
            $action = copy($_FILES['imagepath2']['tmp_name'], $comImagePath2);
        }

         $sql_query = "INSERT INTO hotels(category,hotel_name,city,description,imagepath,imagepath2,created)"
        . "VALUES('" . $category . "','" . $hotel_name . "','" . $city . "','" . $description . "','" . $comImagePath . "','" . $comImagePath2 . "','" . date('Y-m-d') . "')";
        $result = $conn->query($sql_query);
        if ($result) {
            $ads_id = mysqli_insert_id($conn);
            header("location:add_hotel.php?status=success");
        } else {
            $error = "Data has not been saved.";
        }
    }
    ?>
    <html>
        <head>
            <title>Add Hotel  - Clever Traveler</title>
            <?php include 'title.php'; ?>
            <script type="text/javascript">
                function formValidation() {

                    var category = document.getElementById('category').value;
                    if (category.trim() == "") {
                        alert('Please select category');
                        return false;
                    }

                    var no_of_day = document.getElementById('hotel_name').value;
                    if (no_of_day.trim() == "") {
                        alert('Please enter hotel name.');
                        return false;
                    }

                    var start_date = document.getElementById('city').value;
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
                            <h1>Add Hotel</h1>
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
                        <form action="add_hotel.php" method="post" enctype="multipart/form-data">                            
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
                                        <label>Category:</label>
                                        <select name="category" id="category" class="form-control"  required=""> 
                                            <option> - - - - Select - - - - </option>
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
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>City:</label>
                                        <input type="text" name="city" id="city" required=""  class="form-control"/>                                        
                                    </div>   
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Hotel Name:</label>
                                        <input type="text" name="hotel_name" id="hotel_name" required="" maxlength="20"  class="form-control"/>
                                    </div>   
                                </div>
                            </div>  
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Description:</label>
                                        <input type="text" name="description" id="description" required="" style="height:100px;"  class="form-control"/>                                        
                                    </div>   
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Image:</label>
                                        <input type="file" name="imagepath" id="imagepath" required=""  class="form-control" />                                        
                                    </div>   
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Image:</label>
                                        <input type="file" name="imagepath2" id="imagepath2" required=""  class="form-control" />                                        
                                    </div>   
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