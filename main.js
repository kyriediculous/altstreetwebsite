$(document).ready(function(){
    $(window).scroll(function() { // check if scroll event happened
        if ($(document).scrollTop() > 50) { // check if user scrolled more than 50 from top of the browser window
          $(".fixed-top").css("background-color", "#1D1F20"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
        } else {
          $(".fixed-top").css("background-color", "transparent"); // if not, change it back to transparent
        }
      });
    });

    $(function () {
    	var $content = $('#jsonContent');
    	var data = {
    		rss_url: 'https://medium.com/feed/@alt_street'
    	};
    	$.get('https://api.rss2json.com/v1/api.json', data, function (response) {
    		if (response.status == 'ok') {
    			var output = '';
    			$.each(response.items, function (k, item) {
    				var visibleSm;
    				if(k < 3){
            } else {
    					visibleSm = '';
    					 visibleSm = ' visible-sm';
    				 }

    				output += '<div class="blog-post"><div>';
    				output += '<h4 class="date">' + $.format.date(item.pubDate, "dd<br>MMM") + "</h4>";
    				var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
    				var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
    				var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
    				var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
    				var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
    				output += '<div class="blog-element"><img class="img-responsive" src="' + src + '" max-width="360px" max-height="240px"></div></div>';
    				output += '<div class="blog-content"><h4><a href="'+ item.link + '">' + item.title + '</a></h4>';
    				output += '<div class="post-meta"><span>By ' + item.author + '</span></div>';
    				var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
    				var maxLength = 120 // maximum number of characters to extract
    				//trim the string to the maximum length
    				var trimmedString = yourString.substr(0, maxLength);
    				//re-trim if we are in the middle of a word
    				trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    				output += '<p>' + trimmedString + '...</p>';
    				output += '</div></div>';
    				return k < 3;
    			});
    			$content.html(output);
    		}
    	});
    });

    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });


    // handle links with @href started with '#' only
    $(document).on('click', 'a[href^="#"]', function(e) {
        // target element id
        var id = $(this).attr('href');

        // target element
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }

        // prevent standard hash navigation (avoid blinking in IE)
        e.preventDefault();

        // top position relative to the document
        var pos = $id.offset().top;

        // animated top scrolling
        $('body, html').animate({scrollTop: pos});
    });

    wow = new WOW().init();
