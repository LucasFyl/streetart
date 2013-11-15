$( document ).ready(function() {

    var headerH = $('header').height();
    var windowH = $(window).height();
    var windowW = $(window).width();
	
	$('#home').css({
		'height': windowH
	});

	$('#home > .wrap > section > a').bind("click", function(e){
		e.preventDefault();
		$('#home > .wrap > section.active').removeClass('active');
		$(this).parent().addClass('active');
		$(this).hide();
		$.fn.openCity()
	});

	$.fn.openCity = function() {
		$('.active').css({
			'width': '100%',
			'z-index': 99
		});
		setTimeout(function() {
			$('section.active').css({
				'height': windowH +'px'
			});
		}, 500);
		setTimeout(function() {
			$('section.active').css({
				'top': 0, 'bottom': 0,
				'left': 0, 'right': 0
			});
			$('section#berlin.active').css({
				'backgroundPositionY': '70px'
			});

			$('section#newyork.active').css({
				'backgroundPositionY': '70px'
			});
			var ville = $('section.active a').text();
			$.ajax({
	            url: ville + '.html',
	            success: function(data){
	                $('#home section.active').html(data);
	            }	
            });
		}, 500);

		setTimeout(function() {
			$('section#paris.active').addClass('bgposition');
		}, 625);
	}

	$(window).on('resize', function () {
   		var windowH = $(window).height();
		$('#home, section.active').css({
			'height': windowH
		});
	});

	function rewriteURL() {
		// if there's already an #

		// var city = $('section.active');
		// var cityName = city.find('a').text();
		// console.log(cityName);
		
		if (window.location.hash) {
			//cut the "#/" part
        	hash = window.location.hash.split("/").pop();
			$(projects).each(function(index) {
				var projectName = $(this).attr('id');
				if(hash === projectName) {
					currentProject = index + 1;
					loadProject();
					upDownNav('down', currentProject, true);			
					
				}
			});
		} // end if (window.location.hash)
	} // end function rewriteURL
});
	