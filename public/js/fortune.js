(function () {
  const $ = document.querySelector.bind(document);

  const btnShowBanner = $('.button-fortune');
  const btnCloseBanner = $('.button-close');
  const banner = $('.banner');
  const vase = $('.vase');
  const vaseWrapper = $('.vase-wrapper');
  const tag = $('.tag-5');

  const inputDate = $('.input--date');
  const inputMonth = $('.input--month');
  const inputYear = $('.input--year');

  const isValidDate = (day, month, year) => {

    if (year < 1000 || year > new Date().getFullYear() || month <= 0 || month > 12) {
      return false;
    }

    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }

    return day > 0 && day <= monthLength[month - 1];
  }

  const timeOut = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const showBanner = () => {
    banner.classList.add('show');
  }


  const openBanner = () => {
    banner.classList.add('open');
  }


  const shakeTag = async () => {
    vase.classList.add('shake');
    await timeOut(2000);
    vase.classList.remove('shake');
  }

  const takeSentence = async () => {
    tag.classList.add('tag-active');
    vaseWrapper.classList.add('zoom-in');
    await timeOut(4000);
    showBanner();
    setTimeout(() => {
      openBanner();
    }, 1000);
  }

  const closeAll = () => {
    banner.classList.remove('show');
    banner.classList.remove('open');
    tag.classList.remove('tag-active');
    vaseWrapper.classList.remove('zoom-in');

    inputDate.value = '';
    inputMonth.value = '';
    inputYear.value = '';
  }

  btnShowBanner.addEventListener('click', async () => {
    let date = inputDate.value;
    let month = inputMonth.value;
    let year = inputYear.value;

    if (isValidDate(+date, +month, +year)) {
      await shakeTag();
      await takeSentence();
    } else {
      console.log("Invalid date");
    };
  });

  btnCloseBanner.addEventListener('click', () => {
    closeAll();
  })

})();