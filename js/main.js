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
	//Включение прокрутки мышкой
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
	//Включение прокрутки мышкой
	trucks.mousewheel.enable();

	//Яндекс Карты
	//Переменная для включения/отключения индикатора загрузки
	var spinner = $('.ymap-container').children('.loader');
	//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
	var check_if_load = false;
	//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
	var myMapTemp, myGeoObjectTemp;
	// Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    function init(){
        // Создание карты.
        var myMapTemp = new ymaps.Map("yaMap", {
            // Координаты центра карты.
            center: [57.626236, 39.852302],
			zoom: 16.4,
			controls: ['zoomControl', 'fullscreenControl']
		},
		// Создаем геообъект с типом геометрии "Точка".
        myGeoObjectTemp = new ymaps.GeoObject({
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
		myMapTemp.geoObjects
		.add(myGeoObjectTemp);
		// Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
		var layer = myMapTemp.layers.get(0).get(0);
		// Решение по callback-у для определения полной загрузки карты
		waitForTilesLoad(layer).then(function() {
			// Скрываем индикатор загрузки после полной загрузки карты
			spinner.removeClass('is-active');
		});
    }
	// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
	return new ymaps.vow.Promise(function (resolve, reject) {
	  var tc = getTileContainer(layer), readyAll = true;
	  tc.tiles.each(function (tile, number) {
		if (!tile.isReady()) {
		  readyAll = false;
		}
	  });
	  if (readyAll) {
		resolve();
	  } else {
		tc.events.once("ready", function() {
		  resolve();
		});
	  }
	});
  }
   
  function getTileContainer(layer) {
	for (var k in layer) {
	  if (layer.hasOwnProperty(k)) {
		if (
		  layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
		) {
		  return layer[k];
		}
	  }
	}
	return null;
  }
   
  // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
  function loadScript(url, callback){
	var script = document.createElement("script");
   
	if (script.readyState){  // IE
	  script.onreadystatechange = function(){
		if (script.readyState == "loaded" ||
				script.readyState == "complete"){
		  script.onreadystatechange = null;
		  callback();
		}
	  };
	} else {  // Другие браузеры
	  script.onload = function(){
		callback();
	  };
	}
   
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
  }
   
  // Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
  var ymap = function() {
	$('.ymap-container').mouseenter(function(){
		if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
   
			// Чтобы не было повторной загрузки карты, мы изменяем значение переменной
		  check_if_load = true; 
   
		  // Показываем индикатор загрузки до тех пор, пока карта не загрузится
		  spinner.addClass('is-active');
   
		  // Загружаем API Яндекс.Карт
		  loadScript("https://api-maps.yandex.ru/2.1/?apikey=493af2c5-0bad-4687-b870-cb81def0a6c7&lang=ru_RU", function(){
			 // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
			 ymaps.load(init);
		  });                
		}
	  }
	);  
  };
   
  $(function() {
   
	//Запускаем основную функцию
	ymap();
   
  });
});