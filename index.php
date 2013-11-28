<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title></title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

      <link rel="stylesheet" href="css/normalize.css">
      <link rel="stylesheet" href="css/less/main.css">
      <link href="css/css/font-awesome.css" rel="stylesheet">
      <link rel="stylesheet" href='css/less/iphone.css' media='screen and (min-width: 320px) and (max-width: 640px)'/>
      <link rel="stylesheet" type="text/css" href="css/jquery.fancybox-1.3.1.css">
      <link rel="stylesheet" type="text/css" href="css/jquery.fancyPhotoset.css">
      <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400' rel='stylesheet' type='text/css'>
      <script src="js/vendor/modernizr-2.6.2.min.js"></script>
      <!-- je charge jQuery dans le <head> car j'en ai besoin pour le loader -->
      <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
      <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
      <!-- Preloader -->
      <script type="text/javascript">
          //<![CDATA[
              $(window).load(function() { 
                  $('#status').fadeOut(); 
                  $('#preloader').delay(350).fadeOut('slow'); 
                  $('body').delay(350).css({'overflow':'visible'});
              })

                function initializeYtApi() {
                  console.log('hey');
                  // Load the IFrame Player API code asynchronously.
                  var tag = document.createElement('script');
                  tag.src = "https://www.youtube.com/player_api";
                  var firstScriptTag = document.getElementsByTagName('script')[0];
                  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                  // Replace the 'ytplayer' element with an <iframe> and
                  // YouTube player after the API code downloads.
                  var player;
                }
          //]]>
      </script>
  </head>
  <body>
      <!--[if lt IE 7]>
          <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->
      <!-- J'initialise Facebook SDK  -->
      <div id="fb-root"></div>
      <script>
        window.fbAsyncInit = function() {
          // init the FB JS SDK
          FB.init({
            appId      : '122302261207062',                    
            status     : true,                                 
            xfbml      : true                                  
          });
        };

        // Load the SDK asynchronously
        (function(){
           // If we've already installed the SDK, we're done
           if (document.getElementById('facebook-jssdk')) {return;}

           // Get the first script element, which we'll use to find the parent node
           var firstScriptElement = document.getElementsByTagName('script')[0];

           // Create a new script element and set its id
           var facebookJS = document.createElement('script'); 
           facebookJS.id = 'facebook-jssdk';

           // Set the new script's source to the source of the Facebook JS SDK
           facebookJS.src = '//connect.facebook.net/en_US/all.js';

           // Insert the Facebook JS SDK into the DOM
           firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
         }());
      </script> 
      <!-- Preloader -->
      <div id="preloader">
          <div id="status">&nbsp;</div>
      </div>


      <header>
          <h1><a href=""></a></h1>
          <a href="artist-of-the-week.html">Artist of the week</a>
      <a href="participate.html" style="color:#f39c12;">Participez</a>
      </header>
  
      <div id="home">
              <section class="city" id="paris" >
                  <a href="#">paris</a> 
              </section>
              <section class="city" id="berlin" >
                  <a href="#">berlin</a> 
              </section>
              <section class="city" id="new-york" >
                  <a href="#">new-york</a>
               </section>
              <section class="city" id="london" >
                  <a href="#">london</a> 
              </section>
      </div>
      
      <!--CDN link for the latest TweenMax-->
      <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
      <!-- fancybox for the Flickr Api -->
      <script type="text/javascript" src="js/jquery.fancybox-1.3.1.pack.js"></script>
      <script type="text/javascript" src="js/jquery.fancy-photoset.min.js"></script>
      <!-- Mousewheel prends en charge le scroll dans la section event -->
      <script src="js/jquery.mousewheel.js"></script>
      <!-- audiojs for  cross browser compatibility -->
      <script src="js/audiojs/audio.js"></script>
      <!-- fichier JS principal -->
      <script src="js/mainGS.js"></script>


  </body>
</html>
