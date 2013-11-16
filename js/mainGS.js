$( document ).ready(function() {

	var windowH = $(window).height();
    var windowW = $(window).width();
    var halfH = ($(window).height())/2;
    var halfW = ($(window).width())/2;
	var section = $('section.city');

	// Gives each section the good size before expanding
	giveSize();

	// Gives each section the good size even when resizing 
	$(window).on('resize', giveSize());

	// attach event on section when clicked
	$(section).on('click', openCity);

	// Give accurate size even when window is resized
	// $(window).on('resize', function () {
	// 	var sectionActive = $('section.active');
	//     TweenLite.to(sectionActive, 0, {width:windowW, height:windowH});
	// });

	function openCity(event) {
		event.preventDefault(); 

		$('section.city').off('click', openCity);

		var section = $(this);
		var header = $('header');
		$(section).addClass('active');
		$('section.active a').fadeOut(0.35);

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
    			childSectionSize();
    			manageHover();
    			imgSize();
            }	
        });
	}

	// Open / Close Sidebar
	$('section.city').on('click', '#sidebarBtn', openSidebar);

	// tabs on main page
	$('section.city').on('click', '#main', mainFirst);
	$('section.city').on('click', '#friends', friendsFirst);
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

	// Give half of the height without header to each section inside active city
	function childSectionSize(){
		var newWindowH = ($(window).height() - '75') / 2 + 'px'
		var introSection = $('.cityIntro');
		var eventSection = $('.eventSlider-wrap');
		var article = $('.eventSlider-wrap article');
		var tabBar = $('section.event ul');
    	var windowW = $(window).width();

	    TweenLite.to(introSection, 0, {width:windowW, height:newWindowH});
	    TweenLite.to(eventSection, 0, {width:windowW, height:newWindowH});
	    TweenLite.to(tabBar, 0, {width:windowW});
	    TweenLite.to(article, 0, {height:newWindowH});
	}


	// to open the sidebar
	function openSidebar() {
		var sidebar = $('#sidebar');
		var content = $('#sidebar p');
		var title = $('section.cityIntro h2');
		var eventSlider = $('section.event');
		if( $(sidebar).width() == 0 ) {
		    TweenLite.to(sidebar, 0.25, {width:'350px', ease:Power2.easeIn});
		    TweenLite.to(content, 0, {css:{display:'block'}, ease:Power2.easeIn, delay:0.15});
		}
		else {
		    TweenLite.to(sidebar, 0.25, {width:'0px', ease:Power2.easeIn});
		    TweenLite.to(content, 0, {css:{display:'none'}, ease:Power2.easeIn, delay:0.15});
		}
		// $(sidebar).on('mouseout', function(){
		// 	setTimeout(closeIt, 1000)
		// });
		if( $(sidebar).width() == 0 ) {
		    TweenLite.to(title, 0.25, {left:"+=350px", ease:Power2.easeIn});
		    TweenLite.to(eventSlider, 0.25, {left:"+=350px", ease:Power2.easeIn});
		}
		else {
		    TweenLite.to(title, 0.25, {left:"-=350px", ease:Power2.easeIn});
		    TweenLite.to(eventSlider, 0.25, {left:"-=350px", ease:Power2.easeIn});
		}
	}	

	function manageHover() {
		$('.onHover').hide();
		$('.eventSlider-wrap article').on('mouseover', function(){
			var content = $(this).find('.onHover');
			$(content).show();
		});

		$('.eventSlider-wrap article').on('mouseout', function(){
			var content = $(this).find('.onHover');
			$(content).hide();
		});
	}

	function imgSize() {
		var image = $('.eventSlider article img');
		var imgW = image.parent('article').width();
		var imgH = image.parent('article').height();

		console.log('tarace');

		if ( image.width() > image.height() ) {
		    TweenLite.to(image, 0, {height:imgH,width:'auto'});
		} 
		else if ( image.width() < image.height() ) {
		    TweenLite.to(image, 0, {width:imgW,height:'auto'});
		}

	}

});





