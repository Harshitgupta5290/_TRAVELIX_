<?php
include './dbconfigur.php';
if (!empty($user_id)) {

    $error = "";
    //Code for saving category
    if (isset($_POST['btnsubmit'])) {
        extract($_POST);
        if (empty($category)) {
            $error = "Please enter category name.";
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
        if (empty($error)) {
            echo $sql_query = "INSERT INTO categorys(category,imagepath,created)VALUES('" . $category . "','" . $comImagePath . "','" . date('Y-m-d h:i:s') . "')";
            $result = $conn->query($sql_query);
            if ($result) {
                header("location:category.php?status=success");
            } else {
                $error = "Data has not been saved.";
            }
        }
    }
    //Code for deleting category
    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $braid = mysqli_real_escape_string($conn, $_GET['id']);
        $sql = "DELETE FROM categorys WHERE id='" . $braid . "'";
        $result = $conn->query($sql);
        $valueInsert = (int) $result;
        if ($valueInsert > 0) {
            header("location:category.php?status=delete");
        } else {
            $error = "Category name has not been deleted.";
        }
    }
    ?>
    <html>
        <head>
            <title>Category  - Clever Traveler</title>
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
                            <h1>Category</h1>
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
                                echo '<div class="style">Category has been successfuly added.</div>';
                            }

                            if (isset($_GET['status']) && $_GET['status'] == "delete") {
                                echo '<div class="style">Category has been successfuly delete.</div>';
                            }
                            ?>                                                           
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Category:</label>
                                        <input type="text" name="category" id="category" class="form-control" placeholder="Your Category" maxlength="100" required="">
                                    </div>   
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Image:</label>
                                        <input type="file" name="imagepath" id="imagepath" required=""  class="form-control" />                                        
                                    </div>   
                                </div>
                            </div>

                            <button type="submit" name="btnsubmit" id="btnsubmit" class="btn btn-two">Submit</button><p><br/></p>                    
                        </form>
                        <table class="table_list">                            
                            <tr>
                                <td class="grid_heading">S.No</td>
                                <td class="grid_heading">Image</td>
                                <td class="grid_heading">Category</td>
                                <td class="grid_heading">Delete</td>
                            </tr>
                            <?php
                            $i = 0;
                            $sql = "SELECT * FROM categorys ORDER BY id ASC";
                            $result = mysqli_query($conn, $sql);
                            if (mysqli_num_rows($result) > 0) {
                                while ($row = mysqli_fetch_array($result)) {
                                    $i++;
                                    ?>
                                    <tr>
                                        <td class="grid_label"><?php echo $i; ?></td>
                                        <td class="grid_label"><img src="<?php echo $row['imagepath'] ?>" height="80"></td>
                                        <td class="grid_label"><?php echo $row['category'] ?></td>
                                        <td class="grid_label"><a href="category.php?id=<?php echo $row ['id']; ?>">Delete</a></td>                            
                                    </tr>
                                    <?php
                                }
                            }
                            ?>
                        </table>
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