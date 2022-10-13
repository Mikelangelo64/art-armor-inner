$(document).ready(function(){
    $('.inner-video__content__wrapper').click(function(e) {
        $(this).children('.inner-video__bg').css('display', 'none')
        $(this).children('.inner-video__play').css('display', 'none')
    })
})