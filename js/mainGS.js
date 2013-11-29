$( document ).ready(function() {

	var windowH = $(window).height();
    var windowW = $(window).width();
    var halfH = ($(window).height())/2;
    var halfW = ($(window).width())/2;
	var section = $('section.city');

	// Gives each section the good size before expanding
	giveSize();

	// Gives each section the good size even when resizing 
	// $(window).on('resize', giveSize());

	// attach event on section when clicked
	section.on('click', openCity);

	// Open / Close Sidebar
	$('section.city').on('click', '#sidebarBtn', openSidebar);
	
	// Open / Close Video
	$('section.city').on('click', '#sidebar h3', openVideo);
	$('#fancybox-overlay').on('click', "a.close", closeVideo);

	// tabs on main page
	$('section.city').on('click', '#main', mainFirst);
	$('section.city').on('click', '#friends', friendsFirst);

	// open submit form
	$('section.city').on('click', "#create", openForm); 
	$('section.city').on('click', "#closeForm ", openForm); 

	// open single-event page 
	$("section.city").on('click', ".eventSlider-wrap.main .onHover a", loadEvent);

	// open single-event page 
	$("section.city").on('click', ".eventSlider-wrap.friends .onHover a", loadFriendEvent);

	// Close event and return to city
	$("section.city").on('click', '.single-event a.close', closeEvent);

	// lorsque je soumets le formulaire
    $('section.city').on('submit','#eventForm',submitForm);


	// Give accurate size even when window is resized
	$(window).on('resize', function () {
		var section = $('section.active');
		var windowH = $(window).height();
	    var windowW = $(window).width();
	    TweenLite.to(section, 0, {width:windowW, height:windowH});
	});

	// to give accurate size to each section
	function giveSize(){
		var section = $('section.city');
	    TweenLite.set(section, {width:halfW, height:halfH});
	}

	// Animation to open city 
	function openCity(event) {
		event.preventDefault(); 

		$('section.city').off('click', openCity);

		var section = $(this);
		var header = $('header');
		$(section).addClass('active');
		$('section.active a').fadeOut(0.35);
		$('#artist-week').fadeOut(0.35);
		$('#home').addClass('opened');

	    TweenLite.to(section, 0.35, {width:windowW, ease:Power2.easeInOut});
	    TweenLite.to(section, 0.35, {height:windowH, ease:Power2.easeInOut, delay:0.35});
	    TweenLite.to(header, 0.25, {height:'75px', opacity: 1, ease:Power2.easeIn, delay:0.70});
	    TweenLite.to(section, 0, {css:{backgroundPosition:'0px 10px !important'}, delay:0.95});
		
		setTimeout(loadCity, 950);
	}

	// to load each city html with ajax
	function loadCity() {
		var city = $('section.active a').text() + '.html';
		$.ajax({
            url: city,
            success: function(data){
                $('section.active').html(data);
                darken();
    			childSectionSize();
    			makeitAppear();
    			audiojs.events.ready(function() {
				  var as = audiojs.createAll();
				});
    			manageHover();
    			imgSize();
    			horizontalScroll();
            }	
        });
	}

	// to darken city.active background
	function darken() {
		sidebar = $('#sidebar');
		sidebar.before('<div class="darken"></div>');
		cityDark = $('div.darken');	
		TweenLite.to(cityDark, 1.5, {opacity: 1, ease:Power2.easeOut});
	}
	
	// Give half of the height without header to each section inside city.active
	function childSectionSize(){
		var newWindowH = ($(window).height() - '75') / 2 + 'px';
		var introSection = $('.cityIntro');
		var eventSection = $('.eventSlider-wrap');
		var article = $('.eventSlider-wrap article');
		var tabBar = $('section.event ul');
    	var windowW = $(window).width();

	    TweenLite.to(introSection, 0, {width:windowW, height:newWindowH});
	    //TweenLite.to(eventSection, 0, {width:windowW, height:newWindowH});
	    TweenLite.to(tabBar, 0, {width:windowW});
	    TweenLite.to(article, 0, {height:newWindowH});
	}
	
	// Fancy animation show the various parts of the website 
	function makeitAppear() {
		var tabsBar = $('.event ul');
		var eventSection = $('.eventSlider-wrap');
		var sidebarBtn = $('#sidebarBtn');

		TweenMax.fromTo(eventSection, 1, 
			{y:500, ease:Power4.easeInOut}, 
			{y:0, ease:Power4.easeOut, delay: 0.5});
		TweenMax.fromTo(tabsBar, 1, 
			{y:500, ease:Power4.easeInOut}, 
			{y:0, ease:Power4.easeOut, delay: 0.5});
		TweenMax.fromTo(sidebarBtn, 1, 
			{x:-100, ease:Power4.easeInOut}, 
			{x:0, ease:Power4.easeOut, delay: 1});
  	}

	// 2 function to switch tabs on city.active
	function mainFirst(e) {
		e.preventDefault();
		$('.event ul li').removeClass('selected');
		$(this).parent('li').addClass('selected');
		var friends = $('.eventSlider-wrap.friends');
		var main = $('.eventSlider-wrap.main');
		friends.removeClass('onTop').addClass('onBottom');
		main.removeClass('onBottom').addClass('onTop');
	}
	function friendsFirst(e) {
		e.preventDefault();
		$('.event ul li').removeClass('selected');
		$(this).parent('li').addClass('selected');
		var friends = $('.eventSlider-wrap.friends');
		var main = $('.eventSlider-wrap.main');
		main.removeClass('onTop').addClass('onBottom');
		friends.removeClass('onBottom').addClass('onTop');
	}

	// to give accurate size to each section
	function giveSize(){
		var section = $('section.city');
	    TweenLite.to(section, 0, {width:halfW, height:halfH});
	}

	// to open the sidebar
	function openSidebar() {
		var sidebar = $('#sidebar');
		var content = $('#sidebar span'); 
		var title = $('section.cityIntro h2');
		var eventSlider = $('section.event');

		if( sidebar.width() == 0 ) {
		    TweenLite.to(sidebar, 0.25, {width:'350px', ease:Power2.easeIn});
		    TweenLite.to(content, 0, {css:{display:'block'}, ease:Power2.easeIn, delay:0.15});
		}
		else {
		    TweenLite.to(sidebar, 0.25, {width:'0px', ease:Power2.easeIn});
		    TweenLite.to(content, 0, {css:{display:'none'}, ease:Power2.easeIn, delay:0.15});
		}

		// if statements séparés en deux pour la fluidité de l'animation
		if( sidebar.width() == 0 ) {
		    TweenLite.to(title, 0.25, {x:+350, ease:Power2.easeIn});
			TweenLite.to(eventSlider, 0.25, {x:+350, ease:Power2.easeIn});
		}
		else {
			TweenLite.to(title, 0.25, {x:0, ease:Power2.easeIn});
			TweenLite.to(eventSlider, 0.25, {x:0, ease:Power2.easeIn});
		}
	}	

	// to manage hover on each event
	function manageHover() {
		var hoverContent = $('.onHover'); 
		TweenLite.set(hoverContent, {opacity:0});
		$('.eventSlider-wrap article').on('mouseover', function(){
			var thisContent = $(this).find('.onHover');
			TweenLite.to(thisContent, 0, {opacity:1});
		});

		$('.eventSlider-wrap article').on('mouseout', function(){
			var thisContent = $(this).find('.onHover');
			TweenLite.to(thisContent, 0, {opacity:0});
		});
	}

	// to give accurate size to event's images if width is bigger or if height is bigger
	function imgSize() {
		var image = $('.eventSlider article img');

		image.each(function(){
			var _this = $(this);

			_this.load(function(){
				var imageW = _this.width();
				var imageH = _this.height();

				if ( imageW > imageH ) {
					_this.addClass('height');
				}
				else if ( imageH > imageW ) {
					_this.addClass('width');
				}
			});
		});
	}

	// to load each event html with ajax
	function loadEvent(e) {
		e.preventDefault();

		var thisImg = $(this).parent('.onHover').siblings('img');
		var thisEvent = thisImg.attr("alt") + '.html';

		var theCity = $('body').find('section.active').attr('id');
		var theFile = 'events/' + theCity + '/' + thisEvent;

		$.ajax({
            url: theFile,
            success: function(data){
                $('section.active').html(data);
            }	
        });
	}
	function loadFriendEvent(e) {
		e.preventDefault();

		var thisImg = $(this).parent('.onHover').siblings('img');
		var thisEvent = thisImg.attr("alt") + '.html';

		var theCity = $('body').find('section.active').attr('id');
		var theFile = 'friends-events/' + theCity + '/' + thisEvent;

		$.ajax({
            url: theFile,
            success: function(data){
                $('section.active').html(data);
            }	
        });
	}

	// to close single-event and load back the current city
	function closeEvent(e) {
		e.preventDefault();
		var theEvent = $('.single-event');
		var theCity = $('body').find('section.active').attr('id') + '.html';
		theEvent.remove();
		$.ajax({
            url: theCity,
            success: function(data){
                $('section.active').html(data);
                darken();
    			childSectionSize();
    			makeitAppear();
    			manageHover();
    			imgSize();
    			horizontalScroll();
            }	
        });
	}

	// to open the submit form
	function openForm(e) {
		e.preventDefault();
		var form = $('#form');
		form.toggleClass('hidden');
	}



    function submitForm(e) {
 		e.preventDefault();

        // je récupère les valeurs
        var eventName = $('#eventName').val();
        var description = $('#description').val();
        var location = $('#address').val();
        var date = $('#date').val();
        var startTime = $('#start_time').val();
        var endTime = $('#end_time').val();

        // appel Ajax
        $.ajax({
            url: $(this).attr('action'), // le nom du fichier indiqué dans le formulaire
            type: $(this).attr('method'), // la méthode indiquée dans le formulaire (get ou post)
            data: $(this).serialize(), // je sérialise les données (voir plus loin), ici les $_POST
            success: function(html) { // je récupère la réponse du fichier PHP
                var event = {
				    access_token: "CAABvO7bVoBYBAHJ4d2JlCynvXdhkalmk6CCJfbJW0FQJVFbd5yUVo1ZAoDK8V9rrxhKnZAt5VNBIlLqxd7R79jDoxATSRJ9R30KgPb9VZAUq4L5PyWIvcUttjsy6rEjaZCFiAszQUS3VXOEidVWfRODOVGtbFmKFZCBElenaT73fsOjL9wW2ZAtHNA4xHU0KoZD",
				    name: eventName, 
				    description: description,
				    location: location,
				    date: date,                        
				    start_time: startTime, 
				    end_time: endTime 
				};

				FB.api('/122302261207062/events', 'post', event, function (result) {
				    alert("We have successfully created a Facebook event with ID: " + result.id + "you can access it through this link : <a href='http://facebook.com/"+result.id+"'></a>");						
				});
                // alert(html); j'affiche cette réponse
            }
        });

        return false; // j'empêche le navigateur de soumettre lui-même le formulaire
    }

	// Horizontal scroll sur la parti event, vertical avec une souris 
	function horizontalScroll(event) {
		$(".eventSlider-wrap").mousewheel(function(event, delta) {
	    	this.scrollLeft -= (delta * 2);
	    	event.preventDefault();
	    });
	}

	// Fonction to define which video to show and loads it 
	function onYouTubePlayerAPIReady() {
		setTimeout(function(){
			var activeCity = $('body').find('.city.active');
			var thisId = activeCity.attr("id");

			if ( thisId == 'paris') {
				setTimeout(function(){
					player = new YT.Player('ytplayer', {
					  height: '490',
					  width: '740',
					  videoId: 'wOQzndDPWLU'
					});
				}, 500); 
			}
			if ( thisId == 'london') {
				setTimeout(function(){
					player = new YT.Player('ytplayer', {
					  height: '490',
					  width: '740',
					  videoId: 'lbD0PVNO_wI'
					});
				}, 500); 
			}
			if ( thisId == 'berlin') {
				setTimeout(function(){
					player = new YT.Player('ytplayer', {
					  height: '490',
					  width: '740',
					  videoId: 'DCEfWHm6m08'
					});
				}, 500); 
			}
			if ( thisId == 'new-york') {
				setTimeout(function(){
					player = new YT.Player('ytplayer', {
					  height: '490',
					  width: '740',
					  videoId: 'xah8gX6-2uA'
					});
				}, 500); 
			}
		}, 200); 
	}	
	
	// to be able to remove dom elements
	Element.prototype.remove = function() {
	    this.parentElement.removeChild(this);
	}
	NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	    for(var i = 0, len = this.length; i < len; i++) {
	        if(this[i] && this[i].parentElement) {
	            this[i].parentElement.removeChild(this[i]);
	        }
	    }
	}

	// Open and Close video overlay
	function openVideo() {

		var overlay = $('body').find("#fancybox-overlay");
		overlay.html('<a class="close" href="#"></a><div id="ytplayer"></div>');
		initializeYtApi();
		overlay.fadeIn();
		onYouTubePlayerAPIReady();
	}
	function closeVideo(e) {
		e.preventDefault();
		var _this = $(this);
		var parent = _this.parent('div');
		parent.empty().fadeOut();
	}



});





