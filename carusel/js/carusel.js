jQuery(document).ready(function ($) {
   
   // set global vars
   
	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;
    var clicked=$(),
    curImg=$(),
    skip = true; 
	
	// width and height for one slide. For more information visit http://codepen.io/zuraizm/pen/vGDHl 
	
  $('#slider').css({ width: slideWidth, height: slideHeight });
  
  // Width for all carusel and width for one animation step
	
	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
  
    $('#slider ul li:last-child').prependTo('#slider ul');
	
	  // Width and height for carusel images
	
	$('#slider ul li img').width(slideWidth/3.2).height(slideWidth/4);
	
	// animation for prev and next

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
      
    };
	
// set carusel cicle. On mouseenter carusel stops, on mouseenter it starts running again.	
      
  
var timer=setInterval(moveRight, 3000);
  
  $('#slider ul').mouseenter(function(){  
clearInterval(timer);

});
    

 
$('#slider ul').mouseleave(function(){ 
clearInterval(timer);
timer=setInterval(moveRight, 3000);

});

// Title panel animation
    
    $('.dark-wrapper').hover(function(e) {
            e.preventDefault();
        $(this).find($('.slide-title')).slideToggle();

            
        });
		
// Prev and next button for carusel
		
    $('.control_next').click(function (e) {
	e.preventDefault();
        moveLeft();
    });

    $('.control_prev').click(function (e) {
	e.preventDefault();
        moveRight();
    });


// Let's make carusel responsive.  Set new wrapper (with 100% width and height) for changing carusel size.  	
	

var responsive = function() {
var height = $('#content-slider').height(); 
    var width = $('#content-slider').width();
    $('#slider ul li').height(height/2);
    $('#slider ul li').width(width); 
      $('#slider ul li img').width(width/3.2).height(width/4);
         $('#slider ul li div').width(width/3.2).height(width/4);
    $('#slider').css({ width:width, height: height });
 
    $('#slider ul').css({ width: slideCount*width, marginLeft: - width });
    slideWidth=width; 
      
 var browserWidth =$( window ).width(); 
 
   
   
  if (browserWidth<420) {
            $('#slider ul li img').width(width/2.2).height(width/3);
      $('.dark-wrapper').width(width/2.2).height(width/3);
      
                            
        }       
       
          
if (browserWidth<300) {
            $('#slider ul li img').width(width).height(width/2);
    $('.dark-wrapper').width(width).height(width/2);
        }
   
    };

	responsive();
    
   
$(window).on('resize',function(){
    
		responsive();
		
		// How to center modal window  
		
		$('.modal-content').css({
	   	'top':($(window).height() - $('.modal-content').outerHeight()) / 2,
	        'left':($(window).width() - $('.modal-content').outerWidth()) / 2
	   });
      
});

   
    // Modal window 

    
    $(".dark-wrapper").click(function() {

        $(".modal-content, #modal-background").fadeIn();
		

          $('.modal-content img').attr('src',$(this).find('img').attr('src'));
     
        $('.title').text($(this).find( 'p' ).text());
        
         $('.modal-content a').attr('href',$(this).find("a").attr('href'));

 $('.modal-content').css({
	   	'top':($(window).height() - $('.modal-content').outerHeight()) / 2,
	        'left':($(window).width() - $('.modal-content').outerWidth()) / 2
	   });
	   
  clicked = $(this);
  curImg.removeClass('active');
  curImg = clicked.find('img');
  curImg.addClass('active'); 

$('html, body').animate({scrollTop : 0},400);
		return false;   
	   

}); 

    $("#modal-background, .modal-close").click(function() {

        $(".modal-content, #modal-background").fadeOut();
       
  
});


// Prev and next button for modal window. 
//With thanks for eicto (http://hashcode.ru/users/11304/eicto) for making this code
 
    
$('button.nextPrev').click(clickNextPrev);
  function clickNextPrev(e){    
    var direction=parseInt(this.value,10); //direction is button parameters
    return clicked[direction?'nextAll':'prevAll']('.dark-wrapper')  //choose direction and set nextAll/prevAll 
                 .first().click() //click (if there is no elements, nothing happened)
                 .length?true: 
     //there is no next wrapper?
                         clicked.parents('li').first() //container
                         [direction?'nextAll':'prevAll']('li') //next/prev container
                         .first() //first container
                         .find('.dark-wrapper')[direction?'first':'last']() //first/last container
                         .click() && true; //click            
  } 

 
  
      
    }); 
