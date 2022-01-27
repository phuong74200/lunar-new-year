
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

function calNumerology(date) {
    let number = parseInt(date.split('/').join('').concat('2022'));
    let sum = number;
    while (sum >= 10) {
        number = sum;
        sum = 0;
        while (number > 0) {
            sum += number % 10;
            number = Math.floor(number / 10);
        }
    }
    return sum;
}
module.exports = {
    getRandomInt,
    calNumerology
}