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
    }

    $(window).resize(slide)
    $(document).ready(slide)
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
                makeWhite('.footer')
            } else {
                makeBlack('.header')
                makeBlack('.button-svg')
                makeBlack('.footer')
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

    //menu open
    $('.menu-burger').click(function(e){
        e.preventDefault()
        $(this).toggleClass('_active')
        $('.menu').toggleClass('_active')
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

    makeWhite('.header')
    makeWhite('.button-svg')
    if(isMobile.any()) {
        sections.forEach((section, index) => {
            callback = (entries, observer) => {
                if (entries[0].isIntersecting) {
                    //console.log(index, entries);
                    if (index === 0) {
                        makeWhite('.header')
                        makeWhite('.button-svg')
                        makeWhite('.footer')
                    } else {
                        makeBlack('.header')
                        makeBlack('.button-svg')
                        makeBlack('.footer')
                    }
                }
            }
            let observerHead = new IntersectionObserver(callback, {threshold: 0.5})
            //let observerFoot = new IntersectionObserver(callback, {threshold: 0.2})
            observerHead.observe(section)
            //observerFoot.observe(section)
        })
    }

    //swipers
    let swiperWorks = new Swiper(".swiper.works-swiper", {
        navigation: {
            nextEl: ".works__btns__container .swiper-button-next",
            prevEl: ".works__btns__container .swiper-button-prev",
        },
        slidesPerView: 1,
        spaceBetween: 18,
    })
})