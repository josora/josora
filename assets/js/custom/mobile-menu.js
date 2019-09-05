(function($){
//Mobile Navigation off canvas

  $(document).ready(function() {
    var isMenuOpen = false;

    $('#mobile-toggle-open').click(function() {
      if (isMenuOpen == false) {
        $('.mobile-navigation-wrapper').clearQueue().animate({
          right : '0px'
        })
        $('#mobile-grey-back').fadeIn('fast');
        //$(this).fadeOut(200);
        //$('.close').fadeIn(300);
        isMenuOpen = true;
      }
    });

    $('#mobile-grey-back, #mobile-toggle-close').click(function() {
      if (isMenuOpen == true) {
        $('.mobile-navigation-wrapper').clearQueue().animate({
          right : '-380px'
        })
        //$('#page').clearQueue().animate({
        //  'margin-right' : '0px'
        //})
        $('#mobile-grey-back').fadeOut('fast');
        //$(this).fadeOut(200);
        //$('.mobile-nav-toggle').fadeIn(300);
        isMenuOpen = false;
      }
    });

  });

})(jQuery);
