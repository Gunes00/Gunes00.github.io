(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});


	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});


	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});


	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});


	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}


	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);


var canvas = document.getElementById("matrix");
var ctx = canvas.getContext("2d");

canvas.width = screen.width;
canvas.height = screen.height;

var matrix = "\u0402\u0403\u040A\u040B\u0411\u0414\u0416\u0419\u041B\u0423\u0424\u0426\u0429\u042A\u042E\u042F\u0434\u0436\u0444\u0452\u0457\u045C\u0461\u0463\u0464\u0466\u0468\u046A\u046E\u0471\u0472\u047A\u0481\u0482\u0483\u0494\u0498\u049C\u04A0\u04A8\u04B0\u04B4\u04FC\u04FD\u04FE\u04C7\u04C3\u04C1";
matrix = matrix.split('');
var rainColor = "rgb(0, 255, 0)";
var backgroundColor = "#000000";
var rainbowMode = false;

var style = window.getComputedStyle(canvas, null).getPropertyValue("font-size");
canvas.style.fontSize = (font_size + 1) + "px";
var font_size = parseFloat(style);

var drops = [];
function createDrops() {
  drops = [];
  var num_columns = canvas.width / font_size;
  
  for (let xCoord = 0; xCoord < num_columns; xCoord++) {
    drops[xCoord] = 1;
  }
}
createDrops();

const getRandomColor = () => Math.floor(Math.random() * 256);

function draw() {
  canvas.style.fontSize = (font_size + 1) + 'px';

  let viewportHeight = (typeof window.innerHeight != 'undefined' ? window.innerHeight : document.body.offsetHeight);
  document.getElementById("container").setAttribute("style","height:" + viewportHeight + "px")


  ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let rainbowColor = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
  ctx.fillStyle = rainbowMode ? rainbowColor : rainColor;
  ctx.font = font_size + "px arial";

  for (let i = 0; i < drops.length; i++) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);
    ctx.fillStyle = rainbowMode ? rainbowColor : rainColor;

    let letter = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(letter, i * font_size, drops[i] * font_size);

    if (drops[i] * font_size > canvas.height && Math.random() > 0.975)
      drops[i] = 0;

    drops[i]++;
  }

  if (fastSpeedOver) setTimeout(draw, speed);
}


let speed = 30;
let fastSpeedOver = false;
let interval = setInterval(draw, 10);
setTimeout(function() {
  clearInterval(interval);
  fastSpeedOver = true;
  draw();
}, 1000);



window.wallpaperPropertyListener = {
  applyUserProperties: function(properties) {
    if (properties.text) {
      let text = properties.text.value;
      document.getElementById("text").innerText = text;
    }

    if (properties.textcolor) {
      let textColor = properties.textcolor.value.split(' ');
      textColor = textColor.map(c => Math.ceil(c * 255));
      textColor = `rgb(${textColor})`;
      document.getElementById("text").style.color = textColor;
    }

    if (properties.textsize) {
      let textSize = properties.textsize.value + "px";
      document.getElementById("text").style.fontSize = textSize;
    }

    if (properties.raincolor) {
      let color = properties.raincolor.value.split(' ');
      color = color.map(c => Math.ceil(c * 255));
      rainColor = `rgb(${color})`;
    }

    if (properties.rainbowmode) rainbowMode = properties.rainbowmode.value;
    if (properties.speed) speed = 101 - properties.speed.value;
    if (properties.rainsize) {
      font_size = properties.rainsize.value;
      createDrops();
    }
    if (properties.rainbackground) {
      if (properties.rainbackground.value === "0") {
        backgroundColor = "#000000";
      } else {
        let backColor = properties.rainbackground.value.split(' ');
        backColor = backColor.map(c => Math.ceil(c * 255));
        backgroundColor = `rgb(${backColor})`;
      }
    }

    if (properties.schemecolor) {
      let schemeColor = properties.schemecolor.value.split(' ');
      schemeColor = schemeColor.map(c => Math.ceil(c * 255));
      var schemeColorAsCSS = `rgb(${schemeColor})`;
    }
  }
};
