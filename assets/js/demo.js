$(function(){
	$('.coupon .share').click(function(){
		$(this).closest('.coupon').toggleClass('social-open');
	});
	$('.coupon-slider').each(function(){
		var $couponListItems = $(this).find('.coupon-list li');
		function repaint() {
			//dirty fix for chrome not repaint bug
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
});