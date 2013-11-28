<?php
if(isset($_POST['eventName']) && isset($_POST['description']) && isset($_POST['location']) && isset($_POST['date'])) {
    if(($_POST['eventName'] != '') && ($_POST['description'] != '') && ($_POST['location'] != '') && ($_POST['date'] != '')) {
        $reponse = 'ok';
    } else {
        $reponse = 'Les champs sont vides';
    }
} else {
    $reponse = 'Tous les champs doivent être renseignés';
}

echo $reponse;
?>