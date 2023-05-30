<?php
include './dbconfigur.php';
$package_id = $_GET['package_id'];
if (!empty($user_id)) {

    $error = "";
    //Code for saving category
    if (isset($_POST['btnsubmit'])) {
        extract($_POST);
        echo $sql_query = "insert into payments (user_id,package_id,card_type,card_no,name_on_card,cvv,expiry_date,expiry_month) values('" . $user_id . "','" . $package_id . "','" . $card_type . "','" . $card_no . "','" . $name_on_card . "','" . $cvv . "','" . $expiry_date . "','" . $expiry_month . "')";
        $result = $conn->query($sql_query);
        if ($result) {
            header("location:payments.php?status=success");
        } else {
            $error = "Data has not been saved.";
        }
    }
    ?>
    <html>
        <head>
            <title>Payment  - Clever Traveler</title>
            <?php include 'title.php'; ?>
            <script type="text/javascript">
                function formValidation() {

                    var card_type = document.getElementById('card_type').value;
                    if (card_type.trim() == "") {
                        alert('Please select card type.');
                        return false;
                    }
                    var name_on_card = document.getElementById('name_on_card').value;
                    if (name_on_card.trim() == "") {
                        alert('Please enter your name on card.');
                        return false;
                    }

                    var alphaExp = /^[a-z A-Z]+$/;
                    if (!name_on_card.match(alphaExp)) {
                        alert("Name on Card shoud be alphabatic.");
                        return false;
                    }

                    var card_no = document.getElementById('card_no').value;
                    if (card_no.trim() == "") {
                        alert('Please enter your card no.');
                        return false;
                    }
                    if (card_no.toString().length != 16) {
                        alert("Card No must be 16 digit long.");
                        return false;
                    }
                    var expiry_date = document.getElementById('expiry_date').value;
                    if (expiry_date.trim() == "") {
                        alert('Please select card expiry date.');
                        return false;
                    }
                    var expiry_month = document.getElementById('expiry_month').value;
                    if (expiry_month.trim() == "") {
                        alert('Please select card expiry date.');
                        return false;
                    }
                    var cvv = document.getElementById('cvv').value;
                    if (cvv.trim() == "") {
                        alert('Please enter your cvv.');
                        return false;
                    }
                    if (cvv.toString().length != 3) {
                        alert("CVV No must be 3 digit long.");
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
                            <h1>Payments</h1>
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
                        <form action="" method="post">                            
                            <?php
                            if (!empty($error)) {
                                echo '<div class="style">' . $error . '</div>';
                            }

                            if (isset($_GET['status']) && $_GET['status'] == "success") {
                                echo '<div class="style">Your Payment have been successfylly done.</div>';
                            }else{
                            ?>                                                           
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Select Card:</label>
                                        <select name="card_type" id="card_type" class="form-control">
                                            <option value="" selected=""> - - - Select - - - </option>
                                            <option value="Credit">Credit</option> 
                                            <option value="Debit">Debit</option>
                                        </select>
                                    </div>   
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Name on Card:</label>
                                        <input type="hidden" name="pay_id" id="pay_id" value="<?php echo $_GET['adsid'] ?>" />
                                        <input type="text" name="name_on_card" id="name_on_card" required="" class="form-control"/>                                        

                                    </div>   
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Card No.:</label>
                                        <input type="number" name="card_no" id="card_no" required="" maxlength="16" onkeyup="CheckInteger(this)" class="form-control"/>                                        
                                    </div>   
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Expiry Date:</label>
                                        <select name="expiry_date" id="expiry_date" class="form-control">
                                            <option value="" selected=""> - - - Select - - - </option>                                          
                                            <option value="2018">2018</option> 
                                            <option value="2019">2019</option> 
                                            <option value="2020">2020</option> 
                                            <option value="2021">2021</option> 
                                            <option value="2022">2022</option> 
                                            <option value="2023">2023</option> 
                                            <option value="2024">2024</option> 
                                            <option value="2025">2025</option> 
                                            <option value="2026">2026</option> 
                                            <option value="2027">2027</option> 
                                        </select>
                                    </div>                                       
                                </div>
                                <div class="col-md-3">
                                    <label>&nbsp;</label>
                                    <select name="expiry_month" id="expiry_month" class="form-control">
                                        <option value="" selected=""> - - - Select - - - </option>
                                        <option value="01">01</option> 
                                        <option value="02">02</option> 
                                        <option value="03">03</option> 
                                        <option value="04">04</option> 
                                        <option value="05">05</option> 
                                        <option value="06">06</option> 
                                        <option value="07">07</option> 
                                        <option value="08">08</option> 
                                        <option value="09">09</option> 
                                        <option value="10">10</option> 
                                        <option value="11">11</option> 
                                        <option value="12">12</option> 
                                    </select>
                                </div>
                            </div>  
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>CVV:</label>
                                        <input type="text" name="cvv" id="cvv" required="" maxlength="3" onkeyup="CheckInteger(this)" class="form-control"/>                                        
                                    </div>   
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">

                                    </div>   
                                </div>
                            </div>                            
                            <button type="submit" name="btnsubmit" id="btnsubmit" class="btn btn-two">Submit</button><p><br/></p>                    
                            <?php
                            }
                            ?>
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