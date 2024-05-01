<?php
    if ($_FILES["image"]["error"] == UPLOAD_ERR_OK) {
        $image_name = basename($_FILES["image"]["name"]);
        
        $image_target_dir = '../pictures/user/';
        $image_target_file = $image_target_dir . $image_name;
        
        if (file_exists($image_target_file)) {
            echo "The image already exists!";
        } else {
            $imageFileType = strtolower(pathinfo($image_target_file, PATHINFO_EXTENSION));
            if ($imageFileType != "jpg") {
                echo "Image type must be JPG only!";
            } else {
                // Kép feltöltése
                if (move_uploaded_file($_FILES["image"]["tmp_name"], $image_target_file)) {
                    echo "The picture ({$image_name}) successfully uploaded!";
                } else {
                    echo "An error occurred while uploading the picture!";
                }
            }
        }
    } else {
        echo "An error occurred while uploading the picture!";
    }
?>