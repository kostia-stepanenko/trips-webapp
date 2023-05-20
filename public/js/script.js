const open_btn = document.querySelector('.open-btn')
const close_btn = document.querySelector('.close-btn')
const nav = document.querySelectorAll('.nav')

open_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.add('visible'))
})

close_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.remove('visible'))
})


/* start of Expandable panels*/

const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
    })
})

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}

function updateWishList(elementId){

    // add new place to wish list
    if( elementId.checked ){
        $.ajax({
            type: "POST",
            url: "/api/addToWishList",
            data: JSON.stringify({ placeId: elementId.id }),
            contentType: "application/json"
        })
            .done(function(data){
                elementId.checked = true;
            })
            .fail(function(errMsg) {
                elementId.checked = false;
            });
    }

    // delete place from wish list
    else {
        $.ajax({
            type: "POST",
            url: "/api/deleteFromWishList",
            data: JSON.stringify({ placeId: elementId.id }),
            contentType: "application/json"
        })
            .done(function(data){
                elementId.checked = false;
            })
            .fail(function(errMsg) {
                elementId.checked = true;
            });
    }
}

/* notes/wishlist part*/

