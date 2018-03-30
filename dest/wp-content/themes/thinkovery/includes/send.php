<?php 
        global $wp;
        $currentUrl = home_url( $wp->request );  
        $currentTitle = wp_title('&raquo;',FALSE);  

        $hubspotutk      = $_COOKIE['hubspotutk']; //grab the cookie from the visitors browser.
        $ip_addr         = $_SERVER['REMOTE_ADDR']; //IP address too.
        $hs_context      = array(
            'hutk' => $hubspotutk,
            'ipAddress' => $ip_addr,
            'pageUrl' => $currentUrl,
            'pageName' => $currentTitle
        );

        $firstname = $_POST['firstname'];
        $email = $_POST['email'];
        $lastname = $_POST['lastname'];
        $phone = $_POST['phone'];
        $subject = $_POST['objet-contact'];
        $message = $_POST['note'];


        $hs_context_json = json_encode($hs_context);

        //Need to populate these variable with values from the form.
        $str_post = "firstname=" . urlencode($firstname) 
            . "&lastname=" . urlencode($lastname) 
            . "&email=" . urlencode($email) 
            . "&phone=" . urlencode($phone) 
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


        $valueUrl = $status_code == "204" || $status_code == "302" ? 'success' : 'error';

        $currentPageUrl = get_permalink();

        $newUrl = add_query_arg( $valueUrl, 'formsubmit', $currentPageUrl );

        wp_redirect($newUrl);
        exit;

?>