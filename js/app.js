const imagesBgLayers = document.querySelectorAll('.layer');
const imagesContainer = document.querySelectorAll('.carousel-img'); 
let current = imagesContainer[0];

function handleMediaQuery(x) {
    if (x.matches) { 
        let contents = $('#img-content').children();
        if (contents.length > 1) {
            contents.each(function () {
                let p = $(`[data-id=${this.id}]`).parent();
                p.append(this)

            });
        } else {
            let img = ($('#img-content').find(':first-child'))[0];
            $(current).append(img);
        }
    } else {
        $('#img-content').append($('#' + $(current).find(':first-child').data('id'))[0]);
    }
}

let x = window.matchMedia("(max-width: 929px)")
handleMediaQuery(x)
x.addEventListener('change', () => {
    handleMediaQuery(x);
});

imagesBgLayers.forEach(function (layer) {

    layer.addEventListener('click', function (event) {

        let img = $(this).parent()[0]; 

        if (img.classList.contains('not-active')) {

            imagesContainer.forEach(function (oimg) {

                oimg.classList.remove('active');
                oimg.classList.add('not-active');

                if (!x.matches) {
                    $('#img-content').append($('#' + $(oimg).find(':first-child').data('id'))[0]);
                } else {
                    $(oimg).append($('#' + $(oimg).find(':first-child').data('id'))[0]);
                }

                $(oimg).find(':first-child').fadeIn('slow');
                $('#' + $(oimg).find(':first-child').data('id')).hide();
                $('#' + $(oimg).find(':first-child').data('content')).hide();

            });

            img.classList.remove('not-active');
            img.classList.add('active');

            $(this).fadeOut('slow');

            $('#' + $(this).data('id')).fadeIn('slow');
            $('#' + $(this).data('content')).fadeIn('slow');

            current = img;
        }
    });
});
