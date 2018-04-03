// JavaScript Document

		//initializing global variables
		var video         = document.getElementById("video"),
			audio         = document.getElementById("audio");
		var videoLoaded   = false,
			audioLoaded   = false,
				p_details = false;
		var screenWidth   = 0,
			distanceWidth = 0,
			moveLeyerX    = 0;

			screenWidth = $(window).width();

		var menu_names = ['intro','about','products', 'contact'];

		var currentPage = 0,
			finished    = false,
			pages = ['intro', 'about-us', 'products', 'contact'],
			device = '';

		$(document).ready(function(e) {
			var myInt = setInterval(function(){
					if ( video.readyState === 4 ) {
						//video loaded
						videoLoaded = true;
					}

					if ( audio.readyState === 4 ) {
						//audio loaded
						audioLoaded = true;
					}

					if( videoLoaded && audioLoaded ) {
						//both video and audio loaded
						clearInterval(myInt);
						if($(window).width() >= 750) {
							//large device
							device = 'large';
							initializeLg();
						} else {
							//small device
							device = 'small';
							initializeSm();
						}
					}
				}, 200); //interval's anonymous function end

			// on sreen resize recalculate the screen width
			// and bring the #fg-tree to the default location.
			$(window).resize(function(){
				if($(window).width() >= 750 && device == 'small') {
					window.location.reload();
				}
				if($(window).width() < 750 && device == 'large') {
					window.location.reload();
				}
			});

			//track mousemove and position the tree accordingly.
			$(window).mousemove(function(e) {
				distance = ( e.offsetX - screenWidth );
				moveLeyer = Math.floor( distance / 2 );
				$('#fg-tree').css({
					'transform':'translate(' + Math.floor(moveLeyer / 80) + 'px, 0px)'
				});
			});

			//track mousewheel over #overlay and #left-portion-lg
			$('#overlay, #left-portion-lg, #left-portion-sm').on('mousewheel', function(e){
				var direction = '';
				direction = e.deltaY == -1 ? 'up' : 'down';
				//call changePage function passing direction
				changePage(direction);
			});

			//track finger swipe over #overlay and #left-portion-lg
			$('#overlay, #left-portion-lg, #left-portion-sm').swipe( {
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					//call changePage function passing direction
					changePage(direction);
				}
			});

			//if the user clicked any one of the .menu-item-lg
			$('.menu-item-lg').click(function(){
				//next page is the data-index value
				var nextPage = parseInt($(this).data('index'));
				//if user clicked the current page, do nothing.
				var detailsVisible = $('#product-details').css('display');
				if(currentPage == nextPage && detailsVisible == 'none') return false;
				//otherwise call changepage function with parameters 'go' and nextPage
				changePage('go', nextPage);
			});

			//if the user clicked any one of the .menu-item-sm
			$('.menu-item-sm').click(function(){
				//next page is the data-index value
				var nextPage = parseInt($(this).data('index'));
				//if user clicked the current page, do nothing.
				var detailsVisible = $('#product-details').css('display');
				if(currentPage == nextPage && detailsVisible == 'none') return false;
				//otherwise call changepage function with parameters 'go' and nextPage
				changePage('go', nextPage);
			});

			//this event is not used. only for reference.
			$('#container').scroll(function() {
				var elem = $(this);
				if( elem[0].scrollHeight - elem.scrollTop()-1 < elem.outerHeight()){
					//end of scroll
				} else {
					//not end of scroll
				}
			});

			//activate niceScroll plugin on #container
			$('#container, .details, #products').niceScroll({
				//setting nicescroll style
				cursorcolor:"rgba(255,255,255,0.2)",
				cursorwidth:"10px",
				background: "rgba(255,255,255,0.1)",
				cursorborder:"none",
				horizrailenabled:false
			});

			//on click of a product
			$('.product').on('click', function(){
				//get specifications from the hidden div
				var element = $(this);
				//make the specifications unordered, 'ul'
				var specs = '<ul><li>' + element.find('.specs').text();
				//replace all new line chars with list item ending (</li>) and starting (<li>)
				specs = specs.replace(/\n/g, "</li><li>");
				//add the end of <ul>
				specs += '</li></ul>';
				//insert the ul into the target div
				$('#product-details').find('.specs').html(specs);

				//get full details from the hidden div
				//add a paragraph
				var details = '<p>' + element.find('.description').text();
				//replace all new lines with 'p'
				details = details.replace(/\n/g, "</p><p>");
				//close the 'p' tag
				details += '</p>';
				//insert the data into the target div
				$('#product-details').find('.in-detail').html(details);

				//get image from .products .image div
				var image = element.find('.image').html();
				//insert the data into the target div
				$('#product-details').find('.left').html(image);

				//get product name
				var name = element.find('.product-name').html();
				//insert the data into the target div
				$('#product-details').find('.name').html(name);

				//get product name
				var short = element.find('.short-desc').html();
				//insert the data into the target div
				$('#product-details').find('.short').html(short);

				// hide all sections and show clicked product details
				$('.section').hide(1);
				$('#product-details').show(1);
				//remove the active class to show the menu normal
				$('.menu-item-lg.active').removeClass('active');
				$('.menu-item-sm.active').removeClass('active');
				
				$('#container').scrollTop(0);
			});
			
			$('#contact').submit(function(e){
				e.preventDefault();
				// initially proceed variable set to true
				// then, as each condition dissatisfy, it is set to false.
				// So, finally, if proceed is true everything is okay;
				var proceed = true;
				// trim off all spaces before oand after the entries
				// and get their values to variables.
				// Then check if the values are empty (after trimming)
				var name = $.trim( $('input[name=name]').val() );
				if(name == '') {
					// if nothing entered, change its border colour to red
					$('input[name=name]').css('border-color', 'red');
					proceed = false;
				}
				var email = $.trim( $('input[name=email]').val() );
				if(email == '') {
					$('input[name=email]').css('border-color', 'red');
					proceed = false;
				}
				// phone number is not mandatory. So we dont need to check..
				var tel = $.trim( $('input[name=tel]').val() );
				var message = $.trim( $('textarea[name=message]').val() );
				if(message == '') {
					$('textarea[name=message]').css('border-color', 'red');
					proceed = false;
				}

				if(!proceed) {
					// something goes wrong...
					// show error message and end the function
					$('.errMsg').text('Please correct the field(s) with red outline').slideDown();
					return false;
				} else {
					// required fields are not null
					// Now see if the e-mail entered is correct
					if( !validateEmail(email) ) {
						// Nope! there's an error. Don't proceed.
						$('input[name=email]').css('border-color', 'red');
						$('.errMsg').slideDown();
						proceed = false;
					} else {
						// Successs!!!!!! Go ahead.
						$('.errMsg').slideUp();
						// post the data
						$.post('sendmail.php', {
							name: name,
							email: email,
							tel: tel,
							message: message
						}, function(data){
							// data is what we get back from the web service.
							if (data == 'success') {
								// mail sent
								$('form[name=contact]').find("input, textarea").val("");
								$('.scssMsg').clearQueue();
								$('.scssMsg').text('Your message sent successfully. Thank you!').slideDown().delay(5000).slideUp();
							} else {
								// there are some errors
								$('.scssMsg').clearQueue();
								$('.errMsg').text('Error sending message. Please try later').slideDown().delay(5000).slideUp();
							}
						}/* , 'json' *//* we dont need json here */);
					}
				}
			});

			$('input, textarea').on('change', function(){
				$(this).css('border-color', 'rgba(123,123,123,0.50)');
			});

			//reset the scrollbar size every second
			setInterval(function(){
				$("#container").getNiceScroll().resize();
			}, 1000);

			function validateEmail(mail) {
				var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				if (filter.test(mail)) {
					return true;
				}
				else {
					return false;
				}
			}
			
			//change the page according to the menu selected
			function changePage(direction, nextPage){
				if (direction == 'up' && finished) {
					//swiped or scrolled up and animations finished
					//do nothing if this is the last menu item
					if(currentPage == pages.length - 1) return false;
					finished = false;

					//hide current shown section
					$('#' + pages[currentPage]).hide(1, function(){
						//hide product details too...
						$('#product-details').hide(1);
						classChange(currentPage);

						finished = true;
						//show the page according to the user decision
						$('#' + pages[currentPage + 1]).show(1, function(){
							currentPage ++;
							//see if the current page variable is greater than
							//the number menu items. if so, set it to the last
							if(currentPage >= pages.length) currentPage = pages.length - 1;
						});
						//scroll the container to the top.
						//in case if the user had scrollled the details down
						$('#container').scrollTop(0);
					});
				} else if(direction == 'down' && finished) {
						//swiped down and animation finished
						//do nothing if this is the last menu item
						if(currentPage == 0) return false;
						finished = false;
						$('#' + pages[currentPage]).hide(1, function(){

							$('#product-details').hide(1);

							//remove active class
							$('.menu-item-lg').removeClass('active');
							$('.menu-item-sm').removeClass('active');
							//add active class to the current menu item
							$('.menu-item-lg.' + menu_names[currentPage - 1]).addClass('active');
							$('.menu-item-sm.' + menu_names[currentPage - 1]).addClass('active');

							finished = true;
							$('#' + pages[currentPage - 1]).show(1, function(){
								currentPage --;
								if(currentPage < 0) currentPage = 0;
							});
							$('#container').scrollTop(0);
						});
				} else if(direction == 'go' && finished) {
						//user clicked a menu item and animation finisjed
						finished = false;
						//hide all sections
						$('.section').hide(1, function(){
							//hide product details
							$('#product-details').hide(1);

							//remove active class and add active to the selected only
							$('.menu-item-lg').removeClass('active');
							$('.menu-item-sm').removeClass('active');
							$('.menu-item-lg.' + menu_names[nextPage]).addClass('active');
							$('.menu-item-sm.' + menu_names[nextPage]).addClass('active');

							finished = true;
							//show page
							$('#' + pages[nextPage]).show(1, function(){
								currentPage = nextPage;
								if(currentPage < 0) currentPage = 0;
							});
							$('#container').scrollTop(0);
						});
				}
			}

			function classChange(currentPage) {
				$('.menu-item-lg').removeClass('active');
				$('.menu-item-sm').removeClass('active');
				$('.menu-item-lg.' + menu_names[currentPage + 1]).addClass('active');
				$('.menu-item-sm.' + menu_names[currentPage + 1]).addClass('active');
			}

			function initializeLg() {
				$('.loading').remove();
				//show video and play audio
				$('#audio').prop({
					volume: 0.02,
					muted:false
				});
				//fade the audio in
				$('#audio').animate({volume: 0.2}, 10000);
				//fade video in
				$('#overlay').animate({
					opacity: .6
				}, 30000);

				//move logo left by making its width 50% from 100%;
				$('#left-portion-lg').delay(100).fadeIn(4000, function(){
					if( $(window).width() >= 750 ) {
						$(this).animate({
							width:'40%'
						}, 1000, function(){
							$(this).css({
								'border-right': '1px solid #fff'
							});
							//unhide container
							$('#container').show();
							//show menu
							$('.menudiv-lg').slideDown(2000);
							//show intro text
							$('#' + pages[0]).fadeIn(2000, function(){
								finished = true;
							});
						});
					}
				});
			}

			function initializeSm() {
				$('.loading').remove();
				//show video and play audio
				$('#audio').prop({
					volume: 0.02,
					muted:false
				});
				//fade the audio in
				$('#audio').animate({volume: 0.2}, 10000);
				//fade video in
				$('#overlay').animate({
					opacity: .6
				}, 30000);
				//move logo left by making its width 50% from 100%;
				$('#left-portion-sm').delay(100).fadeIn(4000, function(){
					if( $(window).width() < 750 ) {
						$(this).animate({
							height:'100px',
							top:85
						}, 1000, function(){
							//unhide container
							$('#container').show();
							//show menu
							$('.menudiv-sm').slideDown(2000);
							//show intro text
							$('#' + pages[0]).fadeIn(2000, function(){
								finished = true;
							});
						});
					}
				});
			}

		});
