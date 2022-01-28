(function () {
  const $ = document.querySelector.bind(document);

  const btnShowBanner = $('.button-fortune');
  const btnCloseBanner = $('.button-close');

  const banner = $('.banner');
  const bannerText = $('.banner-text');

  const bannerContent = $('.banner-content');
  const bannerError = $('.banner-error');

  const bannerContentLove = $('.content-love');
  const bannerContentCareer = $('.content-career');
  const bannerContentMoney = $('.content-money');

  const vase = $('.vase');
  const vaseWrapper = $('.vase-wrapper');
  const tag = $('.tag-5');

  const inputDate = $('.input--date');
  const inputMonth = $('.input--month');
  const inputYear = $('.input--year');

  const lNumber = $('#lNumber');

  const inputs = $('.inputs');

  const isValidDate = (day, month, year) => {

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return false;
    }

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

  const showBanner = (fortune) => {

    bannerContent.classList.remove('fade');
    bannerError.classList.add('fade');

    bannerContentLove.textContent = fortune.love;
    bannerContentCareer.textContent = fortune.career;
    bannerContentMoney.textContent = fortune.money;
    lNumber.textContent = fortune.number;

    banner.classList.add('show');
    setTimeout(() => {
      banner.classList.add('open');
    }, 1000);
  }

  const showBannerError = (error = 'Đã có lỗi xảy ra. Vui lòng nhập lại') => {

    bannerContent.classList.add('fade');
    bannerError.classList.remove('fade');

    bannerError.textContent = error;

    banner.classList.add('show');
    setTimeout(() => {
      banner.classList.add('open');
    }, 1000);
  }

  const shakeTag = async () => {
    vase.classList.add('shake');
    await timeOut(2000);
    vase.classList.remove('shake');
  }

  const takeTag = async () => {
    tag.classList.add('tag-active');
    vaseWrapper.classList.add('zoom-in');
    await timeOut(4000);
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

  // get fortune

  const getFortune = async (date) => {
    const URL = '/api/prophecies';
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: date })
    }

    const fetchResponse = await fetch(URL, settings);
    return fetchResponse.json();
  }


  btnShowBanner.addEventListener('click', async () => {
    let date = inputDate.value;
    let month = inputMonth.value;
    let year = inputYear.value;
    inputs.classList.add('fade');

    console.log(isValidDate(+date, +month, +year));

    if (isValidDate(+date, +month, +year)) {

      let dateString = date + '/' + month + '/' + year;

      console.log(+date, +month, +year);

      await shakeTag();
      await takeTag();

      getFortune(dateString).then(data => {
        const { career, love, money, number } = data.status;
        showBanner({ career, love, money, number });
      }).catch(err => showBannerError('Đã có lỗi xảy ra. Vui lòng nhập lại'));

    } else {
      showBannerError('Ngày sinh không hợp lệ. Vui lòng nhập lại');
    };

  });

  btnCloseBanner.addEventListener('click', () => {
    closeAll();
  });

  bannerText.addEventListener('mousewheel', (event) => {
    event.stopPropagation();
  })

})();