<?php



//Process a new form submission in HubSpot in order to create a new Contact.
global $wp;
$currentUrl = home_url( $wp->request );  
$currentTitle = wp_title();  

$hubspotutk      = $_COOKIE['hubspotutk']; //grab the cookie from the visitors browser.
$ip_addr         = $_SERVER['REMOTE_ADDR']; //IP address too.
$hs_context      = array(
    'hutk' => $hubspotutk,
    'ipAddress' => $ip_addr,
    'pageUrl' => $currentUrl,
    'pageName' => $currentTitle
);


$firstname = $_GET['firstname'];
$email = $_GET['email'];
$lastname = $_GET['lastname'];
$phone = $_GET['phone'];
$subject = $_GET['objet-contact'];
$message = $_GET['note'];


$hs_context_json = json_encode($hs_context);

//Need to populate these variable with values from the form.
$str_post = "firstname=" . urlencode($firstname) 
    . "&lastname=" . urlencode($lastname) 
    . "&email=" . urlencode($email) 
    . "&phone=" . urlencode($phonenumber) 
    . "&je_vous_contacte_pour_=" . urlencode($subject) 
    . "&precisez_votre_demande=" . urlencode($message) 
    . "&hs_context=" . urlencode($hs_context_json); //Leave this one be

//replace the values in this URL with your portal ID and your form GUID
$endpoint = 'https://forms.hubspot.com/uploads/form/v2/4019924/fd72d66a-9ead-4216-9e23-99e3fb889fc4';

$ch = @curl_init();
@curl_setopt($ch, CURLOPT_POST, true);
@curl_setopt($ch, CURLOPT_POSTFIELDS, $str_post);
@curl_setopt($ch, CURLOPT_URL, $endpoint);
@curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/x-www-form-urlencoded'
));
@curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response    = @curl_exec($ch); //Log the response from HubSpot as needed.
$status_code = @curl_getinfo($ch, CURLINFO_HTTP_CODE); //Log the response status code
@curl_close($ch);
echo $status_code . " " . $response;

?>
    