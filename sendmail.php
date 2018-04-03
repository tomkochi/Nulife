<?php
	session_start();

	if(
		!isset( $_POST['name'] ) or
		!isset( $_POST['email'] ) or
		!isset( $_POST['tel'] ) or
		!isset( $_POST['message'] )
	) die('<h4>Access denied.</h4>');

	$name     = strip_tags($_POST['name']);
	$email    = strip_tags($_POST['email']);
	$tel      = strip_tags($_POST['tel']);
	$message  = strip_tags($_POST['message']);
	$ip       = strip_tags($_SERVER['REMOTE_ADDR']);
	

	// Multiple recipients
	$to = $email; // note the comma

	// Subject
	$subject = 'Feedback from ' . $name;

	// Message
	$message = '
		<html>
			<head>
				<title>Title</title>
			</head>
			<body>
				<p><strong>' . $name . '</strong> says...</p>
				<p>' . $message . '</p>
				<hr>
				<p>IP: ' . $email . '</p>
				<p>Telephone: ' . $tel . '</p>
				<p>IP: ' . $ip . '</p>
			</body>
		</html>
	';

	// To send HTML mail, the Content-type header must be set
	$headers[] = 'MIME-Version: 1.0';
	$headers[] = 'Content-type: text/html; charset=iso-8859-1';

	// Additional headers
	$headers[] = 'From: admin@nulife.in';

	// Mail it
	if (
		mail($to, $subject, $message, implode("\r\n", $headers))
	) {
		echo 'success';
		die();
	} else {
		echo 'fail';
		die();
	}