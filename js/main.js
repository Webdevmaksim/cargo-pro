$(document).ready(function($) {
	//main form title
	$('.hero-form__title').val ($('.hero-form__title').attr('data-main'));
	//swiper
	var swiper = new Swiper('.swiper-container', {
		direction: 'vertical',
        slidesPerView: 1,
      	scrollbar: {
        	el: '.swiper-scrollbar',
        	hide: false,
        	draggable: true,
      },
    });
});