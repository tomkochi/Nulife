<?php session_start(); ?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="Fullmoon Advertisers">
	<!-- including google fonts -->
	<link href="https://fonts.googleapis.com/css?family=Athiti|Nunito|Trocchi" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">

	<title>Nulife</title>

	<style>

	</style>
</head>

<body>
	
	<!--
		* This is a one-page website.
		* Background is a 5 second video of 2.07 MB looped continuously
		* Background video and background sound are in two separate files
		  because we dont want the bg sound be jumping continuously.
		* Additionally, a png image of a tree trunk is places over the video
		  and given a small moving effect
	-->
	
	<!--loading....-->
	<!-- this is a loader animation till video and audio is fully loaded -->
	<img class="loading" width="60" src="img/emblem.svg">
	<!--background video-->
	<!-- hidden untill fully loaded -->
	<video id="video" autoplay loop>
			<source src="media/bg.mp4" type="video/mp4">
	</video>
	<!--background audio-->
	<!-- muted untill fully loaded, and then fades in via css volume-->
	<audio id="audio" autoplay loop muted>
			<source src="media/bg.mp3" type="audio/mpeg">
	</audio>
	<!--tree image over the background video-->
	<!-- for a visual effect, this layer made moving with the mousemove -->
	<div id="fg-tree"></div>
	<!--for the purpose of tracking mouse movements-->
	<div id="overlay"></div>
	
	<!--left portion of the screen-->
	<!-- left-portion-lg displayed for large screens only, thatis, the vertical menu -->
	<div id="left-portion-lg">
		<!--main logo-->
		<!-- fades in over black screen after the loader disappeared -->
		<img src="img/logo-white.svg">
		<!--menu/navigation-->
		<div class="menudiv-lg">
			<br/>
			<div id="menu-lg">
				<!--navigate to the e-commerce site-->
				<div class="bttn btn-buy-online">
					Buy online
				</div>
				<!--menu-->
				<div id="side-menu-lg">
					<!-- the one with active class is the currect selected menu item -->
					<!-- data-index is for linking with the array used in javascript file -->
					<span class="menu-item-lg intro active" data-index="0">Intro</span><br>
					<span class="menu-item-lg about" data-index="1">About us</span><br>
					<span class="menu-item-lg products" data-index="2">Products</span><br>
					<span class="menu-item-lg contact" data-index="3">Contact</span>
				</div><!--#side-menu-lg-->
			</div><!--menu-lg-->
		</div><!--menudiv-lg-->
	</div><!--.left-portion-lg-->

	<!-- this is the horizontal menu displayed in small screens -->
	<div id="left-portion-sm">
		<!--main logo-->
		<img src="img/logo-white.svg">
		<!--menu/navigation-->
		<div class="menudiv-sm">
			<br/>
			<div id="menu-sm">
				<!--navigate to the e-commerce site-->
				<div class="bttn btn-buy-online">
					Buy online
				</div>
				<!--menu-->
				<div id="side-menu-sm">
					<!-- same as on the large screen, the one with active class is the currect selected menu item -->
					<!-- also, data-index is for linking with the array used in javascript file -->
					<span class="menu-item-sm intro active" data-index="0">Intro</span>
					<span class="menu-item-sm about" data-index="1">About us</span>
					<span class="menu-item-sm products" data-index="2">Products</span>
					<span class="menu-item-sm contact" data-index="3">Contact</span>
				</div><!--#side-menu-lg-->
			</div><!--menu-sm-->
		</div><!--menudiv-sm-->
	</div><!--.left-portion-sm-->

	<!--the right portion-->
	<!-- this is where all the details are displayed -->
	<div id="container">
		<!--intro page - this is what the user see when the initial animation is finished-->
		<!-- it fades in automatically -->
		<div id="intro" class="section">
			<div class="home-heading">A new dawn.<br/>A new lease of life</div>
			<br/>
			<p>A healthy body and mind makes life cheerful and progressive. It helps people to positively contribute to their families as well as to the society they live in. While facing the multi-hued challenges of life, some people may encounter stumbling blocks in the form of various health issues. </p>
			<p>NuLife is here to help you negotiate life with a confident mind and a healthy body. Enjoy a new dawn in your life with our choice of life enhancing, wellness products.</p>
		</div><!--#intro .section-->
		<!--about us page-->
		<div id="about-us" class="section">
			<p>We, <strong>Shreekaram Wellness,</strong> <br>are a socially responsible group from South India, who have come together with an aim of slowly but steadily helping the world transform into a physically, mentally and spiritually progressive entity.</p>
			<p>Our team, inspired and led forward by the tradition of Badarinath Ayurveda practitioners,  includes Research Scientists from the pharmaceutical industry, Siddha Vaidyas, Ayurvedic Doctors as well as traditional Vaidyas, Yoga Masters, Psychologists, Counselors, University Professors and School Teachers.</p>
			<div class="imp">We pursue localized production, giving more focus on quality through personalized attention.</strong></div>
			<p>Our portfolio of wellness products promote menstrual health, gastro health, respiratory health and mind health, which we believe are the pillars of good health. Added to that, our team is also engaged in comprehensive research studies on conceiving healthier babies and circumventing fertility problems.</p>
		</div><!--#about-us .section-->
		<!--products page - dynamic-->
		<div id="products" class="section" style="overflow-x:hidden;">
			<br>
			<!-- product_list.php is pure php for fetching the product details of sall products -->
			<?php include('product_list.php'); ?>
		</div> <!--#products .section-->
		<!--contact page with e-mail feature-->
		<div id="contact" class="section">
			<h3>Shreekaram Wellness</h3>
			<p>
				30/1322 G, RSAC road , Vyttila - 682 019 , Kerala, India <br>
				Tel: +91- 484-2307006, 2389127 <br>
				nulifeayurveda@gmail.com <br>
			</p>
			<br/>
			<!--e-mail division of contact page with form-->
			<div id="email">
				<form name="contact" autocomplete="off">
					<input type="text" name="name" placeholder="Name">
					<input type="text" name="email" placeholder="E-mail">
					<input type="text" name="tel" placeholder="Tel/cell number">
					<textarea name="message" rows="2" placeholder="Message"></textarea>
					<div class="errMsg"></div>
					<div class="scssMsg"></div>
					<button type="submit">Submit</button>
				</form>
			</div><!--#email-->
		</div><!--#contact .section-->
		<!--product details page is displayed when a product in the product list is clicked-->
		<div id="product-details" class="section">
			<!--
				* #product details is divided into two; top and bottom
				  - .top has the image, name of the product and a short description
				  - .bottom got infos like specification/indication, detailed description etc.
			-->
			<!--top division
					- product image, name,
					- short description and buttons
			-->
			<div id="top">
				<!--left portion - the image-->
				<div class="left"></div>
				<!--right portion - name, short desc and buttons-->
				<div class="right">
					<div class="name"></div>
					<div class="short"></div>
					<!--buy and share buttons-->
					<div class="buttons">
						<div class="bttn-prdt buy">
							Buy online
						</div>
						<div class="bttn-prdt share" style="display: none;">
							Share &nbsp; <img src="img/share.svg" alt="NuLife share" width="10px" style="display: inline-block;">
							<div class="shareMenu">
								<div class="shareSub fbshare" onClick="ttshare()">
									Facebook
								</div>
								<div class="shareSub ttshare" onClick="ttshare()">
									Twitter
								</div>
								<div class="shareSub inshare" onClick="inshare()">
									LinkedIn
								</div>
							</div>
						</div>
						<br><br>
					</div><!-- .buttons -->
				</div><!-- .right -->
			</div><!--#top-->
			<!--bottom division-->
			<div id="bottom">
				<!--specification - value taken from the hidden div .specs product list section-->
				<div class="specs"></div>
				<!--detailed info - value taken from the hidden div .description product list section -->
				<div class="in-detail"></div>
			</div><!--#botoom-->
		</div><!--#product-details .section-->
	</div><!--.container-->

	<!--jQuery-->
    <script src="js/jquery.min.js"></script>
    <!--mousewheel tracking-->
    <script src="js/jquery.mousewheel.min.js"></script>
    <!--touchswipe tracks the swipe of fingers-->
    <script src="js/jquery.touchSwipe.min.js"></script>
    <!--nicescroll manipulates the scrollbar-->
    <script src="js/jquery.nicescroll.min.js"></script>
	<!--custon javascript-->
	<script src="js/main.js"></script>
	
	<script>
		//Social media sharing
		function fbshare() {
			alert('fb');
		}

		function ttshare() {
			alert('tt');
		}

		function inshare() {
			alert('in');
		}
	</script>
</body>
</html>
