<?php

    if ($_FILES["file"]["error"] == UPLOAD_ERR_OK && $_FILES["image"]["error"] == UPLOAD_ERR_OK) {
        $file_name = basename($_FILES["file"]["name"]);
        $image_name = basename($_FILES["image"]["name"]);
        
        $file_target_dir = '../book/';
        $image_target_dir = '../pictures/book/';
        
        $file_target_file = $file_target_dir . $file_name;
        $image_target_file = $image_target_dir . $image_name;
        
        if (file_exists($file_target_file) || file_exists($image_target_file)) {
            echo "The files already exist!";
        } else {
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $file_target_file) && move_uploaded_file($_FILES["image"]["tmp_name"], $image_target_file)) {
                echo "The file ({$file_name}) and the pictures ({$image_name}) successfully upload!";
            } else {
                echo "An error occurred while uploading files!";
            }
        }
    } else {
        echo "An error occurred while uploading files!";
    }

?>