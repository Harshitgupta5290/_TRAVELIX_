<?php
include './dbconfigur.php';
if (isset($_POST['btnsubmit'])) {
    $error = "";
    extract($_POST);
    if (empty($name)) {
        $error = "Please enter name.";
    }
    
    if (empty($subject)) {
        $error = "Please enter subject.";
    }
    if (empty($message)) {
        $error = "Please enter your message.";
    }
    if (empty($error)) {
        $sql_query = "INSERT INTO demo(name,subject,message,adding_date)"
                . "VALUES('" . $name . "','"  . $subject . "','" . $message . "','" . date('Y-m-d h:i:s') . "')";
        $result = $conn->query($sql_query);
        if ($result) {
            header("location:faq.php?reg=success");
        } else {
            $error = "Data has not been saved.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
        <title>FAQs - Clever Traveler</title>
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
        <script type ="test/javascript"></script>
    </head>
<body>
<?php
        include 'header.php';
        ?>
        <header id="head" class="secondary">
            <div class="container">
                <div class="row">
                    <div class="col-sm-8">
                        <h1>Faq's</h1>
                    </div>
                </div>
            </div>
        </header>

        <!-- container -->


        <!-- container -->
        <div class="container"style="min-height:500px;">
            <div class="row">
            
            <div class="col-md-6">
                
            <h3 class="section-title">Faq's</h3>
            <div class="faq-inner">
                    <div class="faq-item">
                        <h3>
                           What is Lorem Ipsum?
                           <span class="faq-plus" id="faq-plus">&plus;</span>
                        </h3>
                        <div class="faq-body" id="faq-body">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                         when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                          It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
                          essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                           Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                        </div>
                    </div>
                </div>
                <div class="faq-inner">
                    <div class="faq-item">
                        <h3>
                        Why do we use it?
                           <span class="faq-plus" id="faq-plus1">&plus;</span>
                        </h3>
                        <div class="faq-body" id="faq-body1">
                        It is a long established fact that a reader will be distracted by the readable
                         content of a page when looking at its layout. The point of using Lorem Ipsum is that
                          it has a more-or-less normal distribution of letters, as opposed to using 'Content 
                          here, content here', making it look like readable English. Many desktop publishing 
                          packages and web page editors now use Lorem Ipsum as their default model text, and a
                           search for 'lorem ipsum' will uncover many web sites still in their infancy.
                            Various versions have evolved over the years, sometimes by accident, sometimes 
                            on purpose (injected humour and the like).
                        </div>
                    </div>
                </div>
                <div class="faq-inner">
                    <div class="faq-item">
                        <h3>
                        Where does it come from?

                           <span class="faq-plus" id="faq-plus2">&plus;</span>
                        </h3>
                        <div class="faq-body" id="faq-body2">
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a 
                        piece of classical Latin literature from 45 BC, making it over 2000 years old. 
                        Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
                        looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
                         passage, and going through the cites of the word in classical literature, 
                         discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. 
                        </div>
                    </div>
                </div>
                <div class="faq-inner">
                    <div class="faq-item">
                        <h3>
                        Where can I get some?
                           <span class="faq-plus" id="faq-plus3">&plus;</span>
                        </h3>
                        <div class="faq-body" id="faq-body3">
                        There are many variations of passages of Lorem Ipsum available, but the majority have
                         suffered alteration in some form, by injected humour, or randomised words which don't
                          look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
                           need to be sure there isn't anything embarrassing hidden in the middle of text. 
                           All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks
                            as necessary, making this the first true generator on the Internet. 
                            It uses a dictionary of over 200 Latin words, combined with a handful of model
                             sentence structures, to generate Lorem Ipsum which looks reasonable.
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
            <div class="title-box clearfix ">
                        <h2 class="title-box_primary">&nbsp;</h2></div> 
                    <figure class="frame thumbnail alignnone clearfix">
                        <p><img class="size-full " alt="usa" src="images/hotel_astro_resort.jpg" width="" height="250"></p>
                    </figure>                   						
                </div>
            </div>
            </div>

            <div class="faq-title">
            <div class="col-sm-12">
                        <h3>How can we help you?</h3>
            </div>
            </div>
        </div>
        
        <section class="contact">
        <div class="container">
            
           
             <div class="col-md-12">
             <form class="form-light mt-20" role="form" method="post" action="faq.php">
                        <?php
                        if (!empty($error)) {
                            echo '<div class="style">' . $error . '</div>';
                        }

                        if (isset($_GET['reg']) && $_GET['reg'] == "success") {
                            echo '<div class="style">Your faq form has been successfuly saved.</div>';
                        }
                        ?> 
                    <div class="form-group">
                            <label>Name</label>
                            <input type="text" name="name" id="name" class="form-control" placeholder="Your name" maxlength="100">
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

        <script type="text/javascript">
            $("#faq-plus").on('click',function(){
                $('#faq-body').toggle();
            });
            $("#faq-plus1").on('click',function(){
                $('#faq-body1').toggle();
            });
            $("#faq-plus2").on('click',function(){
                $('#faq-body2').toggle();
            });
            $("#faq-plus3").on('click',function(){
                $('#faq-body3').toggle();
            });
        </script>
</body>
</html>

