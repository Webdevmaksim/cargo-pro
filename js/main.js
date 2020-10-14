$(document).ready(function($) {
	//main form title
	$('.hero-form__title').val ($('.hero-form__title').attr('data-main'));
	$('.extra-form__title').val ($('.extra-form__title').attr('data-question'));
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

	var trucks = new Swiper('.extra__car-slider', {
		slidesPerView: 1,
		spaceBetween: 20,
		scrollbar: {
        	el: '.extra__scrollbar',
        	hide: false,
        	draggable: true,
	  },
	});
	trucks.mousewheel.enable();
	//Яндекс Карты
	// Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("yaMap", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [57.626236, 39.852302],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 16.4
		},{
			searchControlProvider: 'yandex#search'
		},
		// Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [57.626236, 39.852302]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Улица Свободы, 87А'
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blueStretchyIcon'
            
        })
		);
		myMap.geoObjects
        .add(myGeoObject);
    }

});