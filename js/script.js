$(document).ready(function(){

    const isMobile = {
        Android: function(){
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function(){
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function(){
            return navigator.userAgent.match(/Opera mini/i)
        },
        Windows: function(){
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function(){
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            )
        }
    }

    if(isMobile.any()){
        $('body').addClass('_touch')

    }else{
        $('body').addClass('_pc')
    }

    //scroll
    let sections = Array.from(document.querySelectorAll('section'))
    let index = 0
    let currentSection = sections[index]
    function slide() {
        h = document.documentElement.clientHeight
        $('section').css('height', h)
        //$('section.contacts').css('height', 2 * h)
    }

    if(!isMobile.any()){
        $(window).resize(slide)
        $(window).resize(function(){
            if(window.scrollY > h) {
                makeBlack('.header')
                makeBlack('.button-svg')
            } else {
                makeWhite('.header')
                makeWhite('.button-svg')
            }
        })
        $(document).ready(slide)
        $(document).ready(function(){
            if(window.scrollY > h) {
                makeBlack('.header')
                makeBlack('.button-svg')
            } else {
                makeWhite('.header')
                makeWhite('.button-svg')
            }
        })
    } else{
        $(window).resize(function(){
            $('section').addClass('_mobile')
            h = document.documentElement.clientHeight
            $('.banner').css('height', h)
            
            if(window.scrollY > h) {
                makeBlack('.header')
                makeBlack('.button-svg')
            } else {
                makeWhite('.header')
                makeWhite('.button-svg')
            }
        })
        $(document).ready(function(){
            $('section').addClass('_mobile')
            h = document.documentElement.clientHeight
            $('.banner').css('height', h)

            if(window.scrollY > h) {
                makeBlack('.header')
                makeBlack('.button-svg')
            } else {
                makeWhite('.header')
                makeWhite('.button-svg')
            }
        })
    }
    let currentScroll = window.scrollY
    let lastScroll = currentScroll
    let ticking = true

    function listener(evt){
        lastScroll = currentScroll
        currentScroll = window.scrollY 
        console.log(currentScroll, lastScroll, ticking);

        if(ticking) {
            if(lastScroll - currentScroll < 0) {
                console.log('down');
                index = Math.min(index + 1, sections.length - 1)
            }
            if(lastScroll - currentScroll > 0) {
                console.log('up');
                index = Math.max(index - 1, 0)
            }
            console.log(index);

            if (index === 0) {
                makeWhite('.header')
                makeWhite('.button-svg')
                //makeWhite('.footer')
            } else {
                makeBlack('.header')
                makeBlack('.button-svg')
                //makeBlack('.footer')
            }
            //console.log(currentScroll);
            // setTimeout(() => {
            //     //ticking = true
            //     // document.addEventListener('scroll', listener)
            // }, 500);
        }
        
        document.removeEventListener('scroll', listener)
        $('html, body').animate({
            scrollTop: $(sections[index]).offset().top
        }, 300, "linear", () => {
            currentScroll = window.scrollY
            ticking = true
            document.addEventListener('scroll', listener)
        })
    }
    if(!isMobile.any()){
        document.addEventListener('scroll', listener)
    }

    //menu anchors
    $('.menu-list__item').click(function(e){
        e.preventDefault()
        const goto = $(e.target).attr('data-goto')
        const currentIndex = $(e.target).attr('data-index')

        $('.menu-burger').removeClass('_active')
        $('.menu').removeClass('_active')
        $('body').removeClass('_lock')
        makeBlack('.header')
        makeBlack('.button-svg')

        if(!isMobile.any()){
            document.removeEventListener('scroll', listener)
            $('html, body').animate({
                scrollTop: $(goto).offset().top
            }, 200, "linear", () => {
                currentScroll = window.scrollY
                ticking = true
                index = +currentIndex
                document.addEventListener('scroll', listener)
            })
        } else {
            $('html, body').animate({
                scrollTop: $(goto).offset().top
            }, 200, "linear")
        }
    })
    

    //menu open
    $('.menu-burger').click(function(e){
        e.preventDefault()
        $(this).toggleClass('_active')
        $('.menu').toggleClass('_active')
        $('body').toggleClass('_lock')
    })

    //make white/black header/footer
    function makeWhite(section) {
        $(section).removeClass('_black')
        $(section).addClass('_white')
    }
    function makeBlack(section) {
        $(section).removeClass('_white')
        $(section).addClass('_black')
    }

    // makeWhite('.header')
    // makeWhite('.button-svg')
    if(isMobile.any()) {
        // sections.forEach((section, index) => {
        //     callback = (entries, observer) => {
        //         if (entries[0].isIntersecting) {
        //             //console.log(index, entries);
        //             if (index === 0) {
        //                 makeWhite('.header')
        //                 makeWhite('.button-svg')
        //                 //makeWhite('.footer')
        //             } else {
        //                 makeBlack('.header')
        //                 makeBlack('.button-svg')
        //                 //makeBlack('.footer')
        //             }
        //         }
        //     }
        //     let observerHead = new IntersectionObserver(callback, {threshold: 0.5})
        //     //let observerFoot = new IntersectionObserver(callback, {threshold: 0.2})
        //     observerHead.observe(section)
        //     //observerFoot.observe(section)
        // })
        
        console.log(sections[1]);
        callbackWhite = (entries, observer) => {
            if (entries[0].isIntersecting) {
                //console.log(index, entries);
                makeWhite('.header')
                makeWhite('.button-svg')                
            }
        }
        callbackBlack = (entries, observer) => {
            if (entries[0].isIntersecting) {
                //console.log(index, entries);
                makeBlack('.header')
                makeBlack('.button-svg')                
            }
        }
        let observerWhite = new IntersectionObserver(callbackWhite, {threshold: 0.5})
        let observerBlack = new IntersectionObserver(callbackBlack, {threshold: 0.5})
        //let observerFoot = new IntersectionObserver(callback, {threshold: 0.2})
        observerWhite.observe(sections[0])
        observerBlack.observe(sections[1])
    }

    //popup open/close
    $('.popup .popup__close').click(function(e){
        e.preventDefault()
        $('body').removeClass('_lock')

        $('.popup').each(function(index, element){
            $(element).removeClass('_open');
        })
    })

    $('.popup-open').click(function(e){
        e.preventDefault()
        const popup = $(this).attr('data-popup')
        $(popup).addClass('_open')
        $('body').addClass('_lock')
    })

    //video banner popup
    $('.popup-banner__video__container').click(function(e){
        $(this).children('.popup-banner__play').css('display', 'none')
        $(this).children('.popup-banner__bg').css('display', 'none')
        //$('.popup-banner__video__container video')[0].load()
        $('.popup-banner__video__container video')[0].play()
    })

    $('.popup-banner__video .popup__close').click(function(e){
        $('.popup-banner__video__container video')[0].pause()
        $('.popup-banner__play').css('display', 'block')
    })

    //date counter year
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 2022 ? 2022 : count;
        $input.val(count);
        $input.change();
        return false;
    });

    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) + 1;
        count = count > 2025 ? 2025 : count;
        $input.val(count);
        return false;
    });

    //date-list appear
    $('.date-list').fadeOut(300)
    if(isMobile.any()) {
        $('.date__title').click(function(e){
            $(this).parent().children('.date-list').fadeToggle(300)
        })
        // $('body').not($('.date__title')).click(function(e){
        //     console.log(1);
        //     // $('.date-list').each(function(index, element){
        //     //     $(element).fadeOut(300)
        //     // })
        // })
    } else {
        $('.date').hover(function(e){
            $(this).children('.date-list').fadeToggle(300)
        })
    }

    //scroll to date

    function makeHorizontalScroll(section) {
        $(`${section} .date-list__months__item`).click(function(e){
            e.preventDefault()
            if (isMobile.any()) {
                $(`${section} .date-list`).fadeOut(300)
            }
            //select year and month for sorting
            const year = $(this).parent().parent().parent().children('.date-list__year').children('.year').val()
            const month = $(this).attr('data-month')
    
            //get all elements of timeline list
            const yearsArr = Array.from(document.querySelectorAll(`${section} .horizontal-list-timeline .horizontal-list-timeline__item`))
    
            //get elements with current year
            let sortYears = []
            yearsArr.forEach(item => {
                if( $(item).attr('data-year') == year ){
                    sortYears.push(item)
                }
            })
    
            if(sortYears.length === 0) {
                return false
            }
    
            //select element with current month
            let choosenItem = sortYears[0]
    
            sortYears.forEach(item => {
                if($(choosenItem).attr('data-month') == month) {
                    return
                }
                if($(item).attr('data-month') == month) {
                    choosenItem = item
                    return
                }
                if($(item).attr('data-month') < month && $(item).attr('data-month') > $(choosenItem).attr('data-month')) {
                    choosenItem = item
                    return
                }
            })
    
            if($(choosenItem).hasClass('_current')) {
                return false
            }
    
            $(`${section} .horizontal-list-timeline__item`).each(function(index, element){
                $(element).removeClass('_current')
            })
            $(choosenItem).addClass('_current')
            
            $(`${section} .horizontal-list__wrapper`).animate({
                scrollLeft: $(choosenItem).offset().left - +$(`${section} .horizontal-list`).css('marginLeft').slice(0, -2)
            }, 300, "linear")
        })
    }
    
    makeHorizontalScroll('.timeline')
    makeHorizontalScroll('.digest')

    //swipers
    let swiperWorks = new Swiper(".swiper.works-swiper", {
        navigation: {
            nextEl: ".works__btns__container .swiper-button-next",
            prevEl: ".works__btns__container .swiper-button-prev",
        },
        slidesPerView: 1,
        spaceBetween: 18,
        on:{
            init: setCurrentCounter,
            slideChange: counterChange,
        }
    })

    function setCurrentCounter(swiper){
        let currentCounts = document.querySelectorAll('.works-swiper__counter .current')
        let allCounts = document.querySelectorAll('.works-swiper__counter .all')

        let index = swiper.activeIndex + 1;
        let swiperLength = swiper.slides.length

        currentCounts.forEach(currentCount => currentCount.innerHTML = index)
        allCounts.forEach( allCount => allCount.innerHTML = swiperLength)
    }
    function counterChange(swiper) {
        let currentCounts = document.querySelectorAll('.works-swiper__counter .current')
        let index = swiper.activeIndex + 1;
        currentCounts.forEach(currentCount => currentCount.innerHTML = index)
    }
})