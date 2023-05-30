<div class="list styled custom-list">    
    <ul style="min-height: 400px;">
        <?php
        if ($user_type == "admin") {
            ?> 

            <li><a href="user_list.php">User List</a></li>
            <li><a href="category.php">Category</a></li>
            <li><a href="add_hotel.php">Add Hotel</a></li>
            <li><a href="hotel-list.php">Hotel List</a></li>
            <li><a href="add_package.php">Add Package</a></li>
            <li><a href="package_list.php">Package List</a></li>
            <li><a href="booking_list.php">Booking List</a></li> 
            <li><a href="feedback_list.php">Feedback List</a></li> 
            <li><a href="contact_list.php">Contact List</a></li> 
            <li><a href="faq-list.php">Faq List</a></li>
            <li><a href="changepassword.php">Change Password</a></li>
            <li><a href="logout.php">Logout</a></li>
            <?php
        } else {
            ?>   
            <li><a href="booking_history.php">Booking History</a></li>
            <li><a href="changepassword.php">Change Password</a></li>
            <li><a href="faq-list.php">Faq List</a></li>
            <li><a href="logout.php">Logout</a></li>
        <?php } ?>

    </ul>
</div>