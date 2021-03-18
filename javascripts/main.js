'use strict';

const BREAKPOINT_1 = 768;
const BREAKPOINT_2 = 1024;

if (window.innerWidth < BREAKPOINT_1) {
  // Smartphone
  const THRESHOLD = 200;  // px

  $(window).scroll(() => {
    const documentHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    const diff           = documentHeight - scrollPosition;
  });
} else {
  // Tablet, Desktop
  const OFFSET    = 200;
  const sidebar   = $('nav');
  const initTop   = sidebar.offset().top;
  const marginTop = parseInt(sidebar.css('margin-top'));

  if (window.innerWidth < BREAKPOINT_2) {
    // Tablet
  } else {
    // Desktop
    $(window).scroll(function() {
      $('nav ol li a').removeClass('current-section');

      const scrollTop         = $(this).scrollTop();
      const adjustedScrollTop = scrollTop + OFFSET;

      if ($('#section-epilogue').offset().top <= adjustedScrollTop) {
        $('nav ol li [href="#section-epilogue"]').addClass('current-section');
      } else if ($('#section-2014').offset().top <= adjustedScrollTop) {
        $('nav ol li [href="#section-2014"]').addClass('current-section');
      } else if ($('#section-2013').offset().top <= adjustedScrollTop) {
        $('nav ol li [href="#section-2013"]').addClass('current-section');
      } else if ($('#section-2012').offset().top <= adjustedScrollTop) {
        $('nav ol li [href="#section-2012"]').addClass('current-section');
      } else if ($('#section-2011').offset().top <= adjustedScrollTop) {
        $('nav ol li [href="#section-2011"]').addClass('current-section');
      } else if ($('#section-prolog').offset().top <= adjustedScrollTop) {
        $('nav ol li [href="#section-prolog"]').addClass('current-section');
      }

      if (initTop < (scrollTop + marginTop)) {
        sidebar.addClass('fixed');
      } else {
        sidebar.removeClass('fixed');
      }
    });

    sidebar.find('ol li a').on('click', function() {
      $('html, body').animate({scrollTop : ($($(this).attr('href')).offset().top + 'px')}, 'fast', 'swing');
      return false;
    });
  }
}
