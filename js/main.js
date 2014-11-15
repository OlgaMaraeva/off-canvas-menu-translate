jQuery(document).ready(function ($) {

		  //js-vertical-tab-content 
$(".js-vertical-tab-content").hide();
$(".js-vertical-tab-content:first").show();

/*start fadeOut for pics*/
var $next;
function fade($ele) {
    $ele.fadeIn(2000).delay(3000).fadeOut(2000, function() {
        $next = $(this).next().next();
        fade($next.length > 0 ? $next : $(this).parent().find($('.js-vertical-tab-content:first')));
   });
   
};  

fade($('.js-vertical-tab-content:first'));


/*start fadeOut for tab buttons*/

var time;

var $anchors = $('.js-vertical-tab'), counter = 1;

 if(typeof time != 'undefined'){
        clearInterval(time);
    }

time=setInterval(function(){

  $anchors.removeClass('is-active');
  $anchors.eq(counter++ % $anchors.length).addClass('is-active');

}, 7000);

/*
var $anchors = $('.vertical-tab');

  (function _loop(idx) {
    $anchors.removeClass('is-active').eq(idx).addClass('is-active');

    time=setInterval(function () {
      _loop((idx + 1) % $anchors.length);
    }, 5000);
          }(0));
*/		  	  
var thisTab;
/* if in tab mode */
$(".js-vertical-tab").click(function(event) {
  event.preventDefault();
  
   $('.js-vertical-tab-content').stop(true);
  clearInterval(time);
thisTab = $(this);
$(".js-vertical-tab-content").hide();
  var activeTab = $(this).attr("rel");
  $("#"+activeTab).fadeIn(800);

  $(".js-vertical-tab").removeClass("is-active");
  $(this).addClass("is-active");

  $(".js-vertical-tab-accordion-heading").removeClass("is-active");
  $(".js-vertical-tab-accordion-heading[rel^='"+activeTab+"']").addClass("is-active");
});

/* if in accordion mode */
$(".js-vertical-tab-accordion-heading").click(function(event) {
  event.preventDefault();

  $(".js-vertical-tab-content").hide();
  var accordion_activeTab = $(this).attr("rel");
  $("#"+accordion_activeTab).show();

  $(".js-vertical-tab-accordion-heading").removeClass("is-active");
  $(this).addClass("is-active");

  $(".js-vertical-tab").removeClass("is-active");
  $(".js-vertical-tab[rel^='"+accordion_activeTab+"']").addClass("is-active");
});

/*uncomment if you want restart tab on mouseleave
$(".vertical-tabs-container").mouseleave(function() {

$('.js-vertical-tab-content').stop(true);
$(".js-vertical-tab-content").hide();

      fade($('.js-vertical-tab-content:first'));
	 
    thisTab.removeClass('is-active');	 
	$anchors.eq(0).addClass('is-active');
	counter = 1;
	  
	   if(typeof time != 'undefined'){
        clearInterval(time);
    }
	
	
time=setInterval(function(){

  $anchors.removeClass('is-active');
  $anchors.eq(counter++ % $anchors.length).addClass('is-active');

}, 7000);

	  
});
*/

/*----left-floating-menu with width changing
var $mobileMenu = $('.mobile-menu'),
       $floatingMenu = $('.floating-menu'),
	   $maskModal = $('.mask-modal'),
	   $closeMenu = $('.close-menu');
	

 $mobileMenu.click(function(){
 $mobileMenu.addClass('mobile-menu-border');
$floatingMenu.animate({
    width: 240
  }, 800 );
 $maskModal.addClass('mask-modal-visible'); 
});

$closeMenu.click(function(){
$mobileMenu.removeClass('mobile-menu-border');
$floatingMenu.animate({
    width: 0
  }, 800 );
 $maskModal.removeClass('mask-modal-visible'); 
}); 
----*/


/*//left-floating-menu

var $mobileMenu = $('.mobile-menu'),
       $contentWrapper = $('.content-wrapper'),
	   $maskModal = $('.mask-modal'),
	   $closeMenu = $('.close-menu');
	

 $mobileMenu.click(function(){
 $mobileMenu.toggleClass('mobile-menu-border');
$contentWrapper.toggleClass('is-open'); 
 $maskModal.toggleClass('mask-modal-visible'); 
});

//Drop down ul animation

var $floatingMenuLi = $('.floating-menu li');


$floatingMenuLi.click(function() {
    $(this).next('ul').slideToggle();
});
*/

//left-floating-menu

var $mobileMenu = $('.mobile-menu'),
       $contentWrapper = $('.hide-scroll');
	

 $mobileMenu.click(function(){
 $('.arrow-mobile').first().toggleClass('rotatePlus');
  $('.arrow-mobile').last().toggleClass('rotateMinus');
    $('span.arrow-mobile:odd').toggleClass('leftAlign');
$contentWrapper.toggleClass('is-open'); 
});

//Drop down ul animation

var $floatingMenuLi = $('.floating-menu li');


$floatingMenuLi.click(function() {
    $(this).next('ul').slideToggle();
});

//top-floating-menu

var $seach = $('.seach'),
       $topFloatingMenu = $('.top-floating-menu'), $seachRipple = $('.seach-ripple'); 

$seach.click(function(){
$topFloatingMenu.slideToggle();
$seachRipple.addClass('seach-ripple-on');
$seachRipple.animate({
    width: 30,
	height: 30,
	top: 0,
    left: 0,
	marginTop:0
  }, 1000, function() {
     $seachRipple.removeClass('seach-ripple-on');
  });
}); 

//scroll-to-top-of-window

$(window).scroll(function(){
		if ($(this).scrollTop() > 200) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});

$('.scroll-to-top').click(function() {
$('html, body').animate({scrollTop : 0},800);
		return false;
});

//start-ripple
/* Copyright 2014+, Federico Zivolo, LICENSE at https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE.md */
/* globals CustomEvent */

var ripples = {
    init : function(withRipple) {
        "use strict";

        // Cross browser matches function
        function matchesSelector(dom_element, selector) {
            var matches = dom_element.matches || dom_element.matchesSelector || dom_element.webkitMatchesSelector || dom_element.mozMatchesSelector || dom_element.msMatchesSelector || dom_element.oMatchesSelector;
            return matches.call(dom_element, selector);
        }

        // animations time
        var rippleOutTime = 100,
            rippleStartTime = 500;

        // Helper to bind events on dynamically created elements
        var bind = function(event, selector, callback) {
            document.addEventListener(event, function(e) {
                var target = (typeof e.detail !== "number") ? e.detail : e.target;

                if (matchesSelector(target, selector)) {
                    callback(e, target);
                }
            });
        };

        var rippleStart = function(e, target) {

            // Init variables
            var $rippleWrapper  = target,
                $el             = $rippleWrapper.parentNode,
                $ripple         = document.createElement("div"),
                elPos           = $el.getBoundingClientRect(),
                mousePos        = {x: e.clientX - elPos.left, y: e.clientY - elPos.top},
                scale           = "transform:scale(" + Math.round($rippleWrapper.offsetWidth / 5) + ")",
                rippleEnd       = new CustomEvent("rippleEnd", {detail: $ripple}),
                refreshElementStyle;

            $ripplecache = $ripple;

            // Set ripple class
            $ripple.className = "ripple";

            // Move ripple to the mouse position
            $ripple.setAttribute("style", "left:" + mousePos.x + "px; top:" + mousePos.y + "px;");

            // Insert new ripple into ripple wrapper
            $rippleWrapper.appendChild($ripple);

            // Make sure the ripple has the class applied (ugly hack but it works)
            refreshElementStyle = window.getComputedStyle($ripple).opacity;

            // Let other funtions know that this element is animating
            $ripple.dataset.animating = 1;

            // Set scale value to ripple and animate it
            $ripple.className = "ripple ripple-on";
            $ripple.setAttribute("style", $ripple.getAttribute("style") + ["-ms-" + scale,"-moz-" + scale,"-webkit-" + scale,scale].join(";"));

            // This function is called when the animation is finished
            setTimeout(function() {

                // Let know to other functions that this element has finished the animation
                $ripple.dataset.animating = 0;
                document.dispatchEvent(rippleEnd);

            }, rippleStartTime);

        };

        var rippleOut = function($ripple) {
            console.log($ripple);
            // Clear previous animation
            $ripple.className = "ripple ripple-on ripple-out";

            // Let ripple fade out (with CSS)
            setTimeout(function() {
                $ripple.remove();
            }, rippleOutTime);
        };

        // Helper, need to know if mouse is up or down
        var mouseDown = false;
        document.body.onmousedown = function() {
            mouseDown = true;
        };
        document.body.onmouseup = function() {
            mouseDown = false;
        };

        // Append ripple wrapper if not exists already
        var rippleInit = function(e, target) {

            if (target.getElementsByClassName("ripple-wrapper").length === 0) {
                target.className += " withripple";
                var $rippleWrapper = document.createElement("div");
                $rippleWrapper.className = "ripple-wrapper";
                target.appendChild($rippleWrapper);
            }

        };


        var $ripplecache;

        // Events handler
        // init RippleJS and start ripple effect on mousedown
        bind("mouseover", withRipple, rippleInit);

        console.log(withRipple);
        // start ripple effect on mousedown
        bind("mousedown", ".ripple-wrapper", rippleStart);
        // if animation ends and user is not holding mouse then destroy the ripple
        bind("rippleEnd", ".ripple-wrapper .ripple", function(e, $ripple) {
            if (!mouseDown) {
                rippleOut($ripple);
            }
        });
        // Destroy ripple when mouse is not holded anymore if the ripple still exists
        bind("mouseup", ".ripple-wrapper", function() {
            var $ripple = $ripplecache;
            if ($ripple.dataset.animating != 1) {
                rippleOut($ripple);
            }
        });

    }
};
 
$(function (){

    if (ripples) {
        ripples.init("nav li, .close-menu");
    }
	});
//end-ripple

});
