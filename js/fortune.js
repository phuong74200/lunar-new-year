(function () {
  const $ = document.querySelector.bind(document);

  const btnShowBanner = $('.button-fortune');
  const btnCloseBanner = $('.button-close');
  const banner = $('.banner');
  const bannerContent = $('.banner-content');

  const vase = $('.vase');
  const vaseWrapper = $('.vase-wrapper');
  const tag = $('.tag-5');

  const inputDate = $('.input--date');
  const inputMonth = $('.input--month');
  const inputYear = $('.input--year');


  const inputs = $('.inputs');

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

  const showBanner = (content = '') => {
    bannerContent.textContent = content;
    banner.classList.add('show');
    setTimeout(() => {
      banner.classList.add('open');
    }, 1000);

    inputs.classList.add('fade');
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
    showBanner('Hello');
  }

  const closeAll = () => {
    banner.classList.remove('show');
    banner.classList.remove('open');
    tag.classList.remove('tag-active');
    vaseWrapper.classList.remove('zoom-in');
    inputs.classList.remove('fade');

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
      showBanner('Invalid date. Enter again');
    };
  });

  btnCloseBanner.addEventListener('click', () => {
    closeAll();
  })

})();