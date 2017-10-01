var i = 0;
var timer;
var $active = $('.active');
$active.parent().addClass('col7-hover');

$('.section-col-7').hover(function() {
	clearInterval(timer);
	$active.fadeOut(300);
	$active.parent().removeClass('col7-hover');
	$active = $(this).find('.product-container')
	$active.fadeIn(300);
	$active.parent().addClass('col7-hover');
	i = $(this).index()+1-1;
},function() {
	clearInterval(timer);
	resumeTimer();
});

var startSlider = function() {
	if (i===7)
		i=0;
	i++;
	$active.fadeOut(300);
	$active.parent().removeClass('col7-hover');
	$active = $('.product-container').eq(i%7);
	$active.fadeIn(300);
	$active.parent().addClass('col7-hover');
};

var resumeTimer = function() {
	timer = setInterval(startSlider, 2000);
};
resumeTimer();


$('.nav-link').click(function(e){
	e.preventDefault();
	var linkHref = $(this).attr('href');
	$('html, body').animate({
		scrollTop: $(linkHref).offset().top
	}, 500);
});