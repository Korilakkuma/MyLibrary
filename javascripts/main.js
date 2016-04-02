$(function() {

    var BREAKPOINT_1 = 768;
    var BREAKPOINT_2 = 1024;
    var templates    = ['epilogue', '2014', '2013', '2012', '2011', 'prolog'];

    var renderTemplate = function(template) {
        var deferred = $.Deferred();

        var settings = {
            'url'        : 'templates/' + template + '.html',
            'type'       : 'GET',
            'dataType'   : 'html',
            'timeout'    : 5000,
            'beforeSend' : function(jqXHR, settings) {
                var div = $('<div />').addClass('loading-animation-container');

                div.append('<img src="images/loading-animation.gif" alt="Now Loading ..." width="25" height="25" />');
                $('#maincontents').append(div);
            },
            'success'    : function(data, textStatus, jqXHR) {
                $('#maincontents').append(data);

                if ($('#section-prolog, #section-2011, #section-2012, #section-2013, #section-2014, #section-epilogue').length === templates.length) {
                    $('#section-prolog').appendTo($('#maincontents'));
                    $('#section-2011').insertAfter($('#section-prolog'));
                    $('#section-2012').insertAfter($('#section-2011'));
                    $('#section-2013').insertAfter($('#section-2012'));
                    $('#section-2014').insertAfter($('#section-2013'));
                    $('#section-epilogue').insertAfter($('#section-2014'));
                }

                deferred.resolve();
            },
            'error'      : function(jqXHR, textStatus, errorThrown) {
                deferred.reject();
            },
            'complete'   : function(jqXHR, textStatus) {
                $('.loading-animation-container').remove();
            }
        };

        $.ajax(settings);

        return deferred.promise();
    };

    if (window.innerWidth < BREAKPOINT_1) {
        // Smartphone
        var THRESHOLD = 200;  // px

        renderTemplate(templates.pop());

        $(window).scroll(function() {
            var documentHeight = $(document).height();
            var scrollPosition = $(window).height() + $(window).scrollTop();
            var diff           = documentHeight - scrollPosition;

            if (diff < THRESHOLD) {
                if (templates.length > 0) {
                    renderTemplate(templates.pop());
                }
            }
        });
    } else {
        // Tablet, Desktop
        var OFFSET      = 200;
        var sidebar     = $('nav');
        var initTop     = sidebar.offset().top;
        var marginTop   = parseInt(sidebar.css('margin-top'));

        renderTemplate(templates[5])
            .pipe(renderTemplate(templates[4]))
            .pipe(renderTemplate(templates[3]))
            .pipe(renderTemplate(templates[2]))
            .pipe(renderTemplate(templates[1]))
            .pipe(renderTemplate(templates[0]))
            .pipe(function() {
                if (window.innerWidth < BREAKPOINT_2) {
                    // Tablet
                } else {
                    // Desktop
                    $(window).scroll(function() {
                        $('nav ol li a').removeClass('current-section');

                        var scrollTop         = $(this).scrollTop();
                        var adjustedScrollTop = scrollTop + OFFSET;

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
            });
    }

});
