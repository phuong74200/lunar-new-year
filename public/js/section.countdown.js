(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let nextYear = '2/1/2022';

    const checkTime = new Date(nextYear).getTime() - new Date().getTime();

    if(checkTime > 0) {
        document.getElementById('countDown').style.display = 'block';
    }

    const countDown = new Date(nextYear).getTime(),
        x = setInterval(function () {

            const now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("days").innerText = Math.floor(distance / (day)).toString().padStart(2, '0'),
                document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)).toString().padStart(2, '0'),
                document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)).toString().padStart(2, '0'),
                document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second).toString().padStart(2, '0');

            //do something later when date is reached
            if (distance < 0) {
                document.getElementById('countDown').remove();
                document.getElementById('happyNewYear').style.display = 'flex';
                clearInterval(x);
            }
            //seconds
        }, 33) // 30 fps
}());