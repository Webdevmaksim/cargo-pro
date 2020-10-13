$(document).ready(function($) {
	//main form title
	$('.hero-form__title').val ($('.hero-form__title').attr('data-main'));
	//swiper

	var swiper = new Swiper('.feedback__slider-container', {
		direction: 'vertical',
		slidesPerView: 2,
      	scrollbar: {
        	el: '.swiper-scrollbar',
        	hide: false,
        	draggable: true,
	  },
	});
	swiper.mousewheel.enable();
});