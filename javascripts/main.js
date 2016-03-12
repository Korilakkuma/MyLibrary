$(function() {

    var OFFSET    = 200;
    var sidebar   = $('nav');
    var initTop   = sidebar.offset().top;
    var marginTop = parseInt(sidebar.css('margin-top'));

    $(window).scroll(function() {
        // if (window.innerWidth < 1024) {
        //    return;
        // }

        $('nav ol li a').removeClass('current-section');

        var scrollTop         = $(this).scrollTop();
        var adjustedScrollTop = scrollTop + OFFSET;

        if ($('#section-epilogue').offset().top <= adjustedScrollTop) {
            $('#section-epilogue').addClass('fade-in');
            $('nav ol li [href="#section-epilogue"]').addClass('current-section');
        } else if ($('#section-2014').offset().top <= adjustedScrollTop) {
            $('#section-2014').addClass('fade-in');
            $('nav ol li [href="#section-2014"]').addClass('current-section');
        } else if ($('#section-2013').offset().top <= adjustedScrollTop) {
            $('#section-2013').addClass('fade-in');
            $('nav ol li [href="#section-2013"]').addClass('current-section');
        } else if ($('#section-2012').offset().top <= adjustedScrollTop) {
            $('#section-2012').addClass('fade-in');
            $('nav ol li [href="#section-2012"]').addClass('current-section');
        } else if ($('#section-2011').offset().top <= adjustedScrollTop) {
            // $('#section-2011').addClass('fade-in');
            $('nav ol li [href="#section-2011"]').addClass('current-section');
        } else if ($('#section-prolog').offset().top <= adjustedScrollTop) {
            // $('#section-prolog').addClass('fade-in');
            $('nav ol li [href="#section-prolog"]').addClass('current-section');
        }

        if (initTop < (scrollTop - marginTop)) {
            sidebar.addClass('fixed');
        } else {
            sidebar.removeClass('fixed');
        }
    });

    sidebar.find('ol li a').on('click', function() {
        $('html, body').animate({scrollTop : ($($(this).attr('href')).offset().top + 'px')}, 'fast', 'swing');
        return false;
    });

});
