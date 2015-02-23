$(function(){

	$('[data-dialog]').click(function(){
		$('#' + $(this).attr('data-dialog'))[0].showModal();
	});

	$('dialog').each(function(){
		var $dialog = $(this);
		if (!this.show) {
			dialogPolyfill.registerDialog(this);
		}
		$dialog.find('.action.close').click(function(){
			$dialog[0].close();
		});
	});

	$('.coupon .share').click(function(){
		$(this).closest('.coupon').toggleClass('social-open');
	});
	$('.coupon-slider').each(function(){
		var $couponListItems = $(this).find('.coupon-list li');
		function repaint() {
			//dirty fix for chrome not repainting bug
			$couponListItems.find('img').hide();
			$couponListItems.find('img').outerWidth();
			$couponListItems.find('img').show();
		}
		$couponListItems.click(function(e){
			var $couponListItem = $(this);
			e.preventDefault();
			$couponListItems.removeClass('current');
			$couponListItem.addClass('current');
			repaint();
		});
		$(this).find('.action.next').click(function(){
			var $currentItem = $couponListItems.filter('.current');
			var $firstItem = $couponListItems.filter(':first');
			var $lastItem = $couponListItems.filter(':last');
			$currentItem.removeClass('current');
			if ( $currentItem.is($lastItem) ) {
				$firstItem.addClass('current');
			}
			else {
				$currentItem.next().addClass('current');
			}
			repaint();
		});

		$(this).find('.action.prev').click(function(){
			var $currentItem = $couponListItems.filter('.current');
			var $firstItem = $couponListItems.filter(':first');
			var $lastItem = $couponListItems.filter(':last');
			$currentItem.removeClass('current');
			if ( $currentItem.is($firstItem) ) {
				$lastItem.addClass('current');
			}
			else {
				$currentItem.prev().addClass('current');
			}
			repaint();
		});
	});

	$('.coupon-list-aside .categories>ul>li').each(function(){
		var $listItem = $(this);
		$listItem.find('.category').click(function(e){
			e.preventDefault();
			$listItem.toggleClass('open');
		});
	});

	$('.shop-description').each(function(){
		var $description = $(this).find('.description');
		$(this).find('.toggle').click(function(){
			$description.toggleClass('open');
			var altText = $(this).attr('data-alt-text');
			$(this).attr('data-alt-text', $(this).text());
			$(this).text(altText);
		});
	});

	$('.abc').each(function(){
		var $langSwitch = $(this).find('.lang-switch');
		var $langSwitchLink = $langSwitch.find('a');
		var $letters = $(this).find('.letters');
		var $letterLinks = $letters.find('a');
		$langSwitchLink.click(function(e){
			e.preventDefault();
			$langSwitchLink.removeClass('current');
			$(this).addClass('current');
			$letters.removeClass('current');
			$($(this).attr('href')).addClass('current')
		});
		$letterLinks.click(function(){
			$letterLinks.removeClass('current');
			$(this).addClass('current');
		});
	});

	$('.events-calendar .calendar-container').pickmeup({
		flat: true,
		calendars: 3,
		prev: '',
		next: '',
		locale: {
			days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
			daysShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт', 'Вск'],
			daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
			months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
		},
		render: function(date) {
			if (date.getTime() == new Date(2015, 1, 24).getTime()) {
				return {
					class_name: 'has-event'
				}
			}
		}
	});
});