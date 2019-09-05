(function($){

  // Flex Slider Configuration
  var flexslider = { vars:{} } ;

  $(window).load(function() {

    function getItemWidth() {
      //return (window.innerWidth < 420) ? 420 : 320;
      if (window.innerWidth < 768) {
        return 510;
      }else if (window.innerWidth < 576) {
        return 440;
      }else {
        return 320;
      }
    }

    $('.products-slider-wrapper').flexslider({
      selector: ".products-slider-container > .product",
      animation: "slide",
      slideshow: false,
      controlNav: false,
      prevText: "",
      nextText: "",
      itemWidth: getItemWidth(),
      touch: true,
      itemMargin: 30,
      minItems: 1,
      maxItems: 3,
      direction: "horizontal",
    });

    // The slider being synced must be initialized first
    $('#product-gallery').flexslider({
      animation: "slide",
      controlNav: false,
      prevText: "",
      nextText: "",
      animationLoop: true,
      slideshow: true,
      itemWidth: 100,
      itemMargin: 5,
      asNavFor: '#product-slider'
    });

    $('#product-slider').flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      sync: "#product-gallery"
    });

    // Initialize the Lightbox for any links with the 'fancybox' class
    $(".fancybox").fancybox();

    $("[data-fancybox]").fancybox({
    // Options will go here
     });

    // Initialize the Lightbox automatically for any links to images with extensions .jpg, .jpeg, .png or .gif
    $("a[href$='.jpg'], a[href$='.png'], a[href$='.jpeg'], a[href$='.gif']").fancybox();

    // Initialize the Lightbox and add rel="gallery" to all gallery images when the gallery is set up using [gallery link="file"] so that a Lightbox Gallery exists
    $(".gallery a[href$='.jpg'], .gallery a[href$='.png'], .gallery a[href$='.jpeg'], .gallery a[href$='.gif']").attr('data-fancybox','group').fancybox();

    // Initalize the Lightbox for any links with the 'video' class and provide improved video embed support
    $(".video").fancybox({
        maxWidth        : 800,
        maxHeight       : 600,
        fitToView       : false,
        width           : '70%',
        height          : '70%',
        autoSize        : false,
        closeClick      : false,
        openEffect      : 'none',
        closeEffect     : 'none'
    });

  });

  // check grid size on resize event
  /*$window.resize(function() {
    var itemWidth = getItemWidth();
    var itemMargin = getItemMargin();
    var itemsNumber = getItemsNumber();

    flexslider.vars.itemWidth = itemWidth;
    flexslider.vars.itemMargin = itemMargin;
    flexslider.vars.maxItems = itemsNumber;

    console.log(getItemWidth(), getItemMargin(), getItemsNumber());
  });*/

  // Searchbar toggle
  $( document ).ready(function() {

    $(".searchform-toggle").click(function(e){
      e.preventDefault();
      $(".header-search-form-wrapper").slideToggle("300", "swing");
      $( ".searchform-toggle > .fa" ).toggleClass( "fa-times" );
    });

  });

  // Button Scroll to top
  $(window).scroll(function(){
    /*if ($(this).scrollTop() >= 200) {        // If page is scrolled more than 50px
      $('#btn-return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#btn-return-to-top').fadeOut(200);   // Else fade out the arrow
    }*/
  });
  $('#btn-return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 700);
  });

})(jQuery);
