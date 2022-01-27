document.querySelector('.envelope').addEventListener('click', function () {
    if (document.querySelector('.letter').classList.contains('letter--open')) {
        document.querySelector('.letter').classList.remove('letter--open');
        document.querySelector('.letter').classList.add('letter--close');
        setTimeout(function () {
            document.querySelector('.letter').classList.remove('letter--close');
        }, 600);
    } else {
        document.querySelector('.letter').classList.remove('letter--close');
        document.querySelector('.letter').classList.add('letter--open');
    }
});

document.querySelector('.paper-close').addEventListener('click', function () {
    document.querySelector('.letter').classList.remove('letter--open');
    document.querySelector('.letter').classList.add('letter--close');
    setTimeout(function () {
        document.querySelector('.letter').classList.remove('letter--close');
        document.querySelector('.overlay').classList.add('displayNone');
        document.querySelector('.letter').classList.add('displayNone');
    }, 600);
});


document.querySelector('.content').addEventListener('submit', event => {
    event.preventDefault();
    document.querySelector('.overlay').classList.remove('displayNone');
    setTimeout(function () {
        document.querySelector('.letter').classList.remove('displayNone');
    }, 600);
})