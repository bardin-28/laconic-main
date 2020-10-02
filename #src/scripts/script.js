var app = {

    init: function() {
        app.menu();
        app.screen_scroll();
        app.sliders();
        app.lazyload();
        // app.stages();
        // app.modal();
        // app.preloader();
        // app.formValidation();
        // app.phoneMask();
        // app.section_services();
    }, // init END

    menu: function() {

        $('.menu-toggle').on('click', function(e) {
            e.preventDefault();
            $('.hamburger').toggleClass('active');
            $('body').toggleClass('site-menu-open');
        });

    }, // menu END

    screen_scroll: function() {

        fullpage = $('#fullpage').fullpage({
            licenseKey: '6D5A2159-B20143E0-8CE02F7F-AF19A3C4',
            //Навигация
            menu: '#screen-menu',
            lockAnchors: true,
            // anchors:['intro', 'Проекты', 'services', 'contacts'],
            navigation: false,
            navigationPosition: 'right',
            // navigationTooltips: ['', ''],
            showActiveTooltip: false,
            slidesNavigation: false,
            slidesNavPosition: 'bottom',

            //Скроллинг
            css3: true,
            scrollingSpeed: 1000,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 2000,
            scrollBar: false,
            easing: 'easeInOutCubic',
            easingcss3: 'ease',
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            continuousVertical: false,
            continuousHorizontal: true,
            scrollHorizontally: false,
            interlockedSlides: false,
            dragAndMove: false,
            offsetSections: false,
            resetSliders: false,
            fadingEffect: false,
            normalScrollElements: '#element1, .element2',
            scrollOverflow: false,

            scrollOverflowOptions: {
                scrollbars: true,
                mouseWheel: true,
                hideScrollbars: false,
                fadeScrollbars: true
            },

            scrollOverflowReset: false,
            scrollOverflowOptions: null,
            touchSensitivity: 15,
            bigSectionsDestination: null,

            //Доступ
            keyboardScrolling: true,
            animateAnchor: true,
            recordHistory: true,

            //Дизайн
            controlArrows: true,
            verticalCentered: false,
            // sectionsColor : ['#fff', '#fff'],
            paddingTop: '0px',
            paddingBottom: '0px',
            // fixedElements: '#site-header, #site-footer',
            responsiveWidth: 0,
            responsiveHeight: 0,
            responsiveSlides: false,
            parallax: false,
            parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
            cards: false,
            cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},

            //Настроить селекторы
            sectionSelector: '.section',
            slideSelector: '.screen-slide',

            lazyLoading: true,

            //события
            onLeave: function(origin, destination, direction){
                // alert('onLeave');
                $('.page-index').addClass('animate-start');
                $('.page-index').removeClass('animate-finish');
                $('.section-title').addClass('hidden');
                $('.section-subtitle').addClass('hidden');

            },
            afterLoad: function(origin, destination, direction){
                // alert('afterLoad')
                $('.page-index').removeClass('animate-start');
                $('.page-index').addClass('animate-finish');
                $('.section-title').removeClass('hidden');
                $('.section-subtitle').removeClass('hidden');
            },
            afterRender: function(){
                // alert('afterRender')
            },
            afterResize: function(width, height){
                // alert('afterResize')
            },
            afterReBuild: function(){alert('afterReBuild')},
            afterResponsive: function(isResponsive){alert('afterResponsive')},
            afterSlideLoad: function(section, origin, destination, direction){alert('afterSlideLoad')},
            onSlideLeave: function(section, origin, destination, direction){alert('onSlideLeave')}
            // onLeave: function(origin, destination, direction){},
            // afterLoad: function(origin, destination, direction){},
            // afterRender: function(){},
            // afterResize: function(width, height){},
            // afterReBuild: function(){},
            // afterResponsive: function(isResponsive){},
            // afterSlideLoad: function(section, origin, destination, direction){},
            // onSlideLeave: function(section, origin, destination, direction){}
        });


        $('#scroll-down').on('click', function() {

            $.fn.fullpage.moveSectionDown();
            
        });


        $('#scroll-up').on('click', function() {

            $.fn.fullpage.moveTo(1);
            
        });

    }, // screen_scroll END

    sliders: function() {

        var $portfolioSlider = $('#home-portfolio-item-slider');
        if (!$portfolioSlider) {} else {

            var home_portfolio_item_slider = new Swiper('#home-portfolio-item-slider .swiper-container', {
                spaceBetween: 0,
                speed: 1000,
                pagination: {
                    el: '#home-portfolio-item-pagination',
                    clickable: true,
                    type: 'bullets',
                },
                on: {
                    slideChange: function () {
                      home_portfolio_logo_slider.slideTo(this.realIndex);
                      home_portfolio_link_slider.slideTo(this.realIndex);
                    },
                }
            });

            var home_portfolio_logo_slider = new Swiper('#home-portfolio-logo-slider .swiper-container', {
                spaceBetween: 0,
                speed: 800,
                direction: 'vertical',
                allowTouchMove: false,
                // lazy: {
                //     loadPrevNext: true,
                // }
            });

            var home_portfolio_link_slider = new Swiper('#home-portfolio-link-slider .swiper-container', {
                spaceBetween: 0,
                allowTouchMove: false,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
            });
        }

        var $servicesSlider = $('#home-services-slider .swiper-container');
        if (!$servicesSlider) {} else {

            var servicesSliderCarousel = new Swiper('#home-services-slider .swiper-container', {
                // Default parameters
                slidesPerView: 1,
                loop: true,
                spaceBetween: 0,
                breakpoints: {
                    // when window width is >= 992
                    1220: {
                        slidesPerView: 3,
                        allowTouchMove: false
                    },
                },
                navigation: {
                    nextEl: '#home-services-slider-next',
                    prevEl: '#home-services-slider-prev',
                },
                pagination: {
                    el: '#home-services-slider-pagination',
                    clickable: true,
                    type: 'bullets',
                },
            });
        }

        var $homeContactsSlider = $('#home-contacts-slider .swiper-container');
        if (!$homeContactsSlider) {} else {

            var homeContactsCarousel = new Swiper('#home-contacts-slider .swiper-container', {
                // Default parameters
                slidesPerView: 1,
                spaceBetween: 0,
                breakpoints: {
                    // when window width is >= 992
                    1220: {
                        slidesPerView: 2,
                        // allowTouchMove: false
                    },
                },
                // navigation: {
                //     nextEl: '#home-contact-slider-next',
                //     prevEl: '#home-contact-slider-prev',
                // },
            });
        }

    }, // sliders END

    lazyload: function() {
        var bLazy = new Blazy({
            offset: 100, // Loads images 100px before they're visible

            success: function(element){
                setTimeout(function(){
                    // We want to remove the loader gif now.
                    // First we find the parent container
                    // then we remove the "loading" class which holds the loader image
                    var parent = element.parentNode;
                    parent.className = parent.className.replace(/\bloading\b/,'');
                }, 200);
            }
        });

         console.log( 'bLazy' );

    }, // lazyload END
}

$(document).ready(function($) {
    console.log( 'Документ и все ресурсы загружены' );
    app.init();

    function sayHi() {
        $('.scroll-down').removeAttr("style");
        $('.scroll-down').addClass('infinite-animated');
    
    }

    setTimeout(sayHi, 3000);

    // function sayHi2() {

        $('.screen-preloader').remove();
    
    // }
    // setTimeout(sayHi2, 2000);

    // function alertHeight() {
    //     alert("Window Height: " + $(window).height() + ", Document Height: " + $(document).height() + ", content Height: " + $('.site-content').height());
    // }

    $(window).resize(function() {

        if ($(window).width() <= 1280) {
            $('html').css('height', $(window).height());
            // alert("Window Height: " + $(window).height() + ", Document Height: " + $(document).height() + ", content Height: " + $('.site-content').height());
        }
           
    });

    // alertHeight();
});


$(document).ready(function () {
    $("a").click(function () {
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        $("body,html").animate({ scrollTop: destination - 50}, 1000);
    });
});

// ANIMATION  FUNCTIONS
const toogleMenuBtn = document.getElementsByClassName('header-menu')[0];
const headerSection = document.getElementsByClassName('header-section')[0];
const toogleLines = document.querySelector('.header-toogleButton');
const hiddenMenu = document.getElementsByClassName('header-hiddenMenu')[0];
const docBody = document.getElementsByTagName('body')[0];

if(toogleMenuBtn){
    toogleMenuBtn.addEventListener('click', () => {
        toogleLines.classList.toggle('menuOpen');
        toogleMenuBtn.classList.toggle('menu-active');
        hiddenMenu.classList.toggle('d-none');
        docBody.classList.toggle('scroll-block');
    });
}

