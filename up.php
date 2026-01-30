<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['rockfile'])) {
    $target = "1000009922.png"; // We lock the name to match your code
    if (move_uploaded_file($_FILES['rockfile']['tmp_name'], $target)) {
        echo "<h1 style='color:orange;background:black;padding:20px;'>SUCCESS: IMAGE DEPLOYED TAE ROCK.SCOT</h1>";
    } else {
        echo "FAILED: CHECK PERMISSIONS";
    }
    exit;
}
?>
<!DOCTYPE html>
<html>
<body style="background:#005eb8;color:#fff;font-family:monospace;text-align:center;padding:50px;">
    <h1 style="background:#ff6600;padding:20px;border:5px solid #000;">ROCK.SCOT UPLOAD BRIDGE</h1>
    <form action="up.php" method="POST" enctype="multipart/form-data" style="border:2px dashed #fff;padding:40px;">
        <input type="file" name="rockfile" style="font-size:1.5rem;"><br><br>
        <input type="submit" value="SEND TAE SERVER" style="background:#ff6600;color:#000;padding:20px;font-weight:bold;cursor:pointer;">
    </form>
</body>
</html>
