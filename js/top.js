//TOPページ用JS
document.addEventListener('DOMContentLoaded', function () {
  //PC表示ブレイクポイント
  const breakPoint = 1024;

  //グローバルナビゲーション
  const gnav = document.getElementById("gnav");

  //グローバルナビゲーションメニュー
  const gnavMenu = document.getElementById("gnav__menu");

  //グローバルナビゲーションボタン
  const gnavButton = document.getElementById("gnav__button");

  //トップへ戻るボタン
  const pageTopButton = document.getElementById("footer__page-top-button");

  //GSAPメディアクエリ
  const mm = gsap.matchMedia();

  let serviceScrollValue1;
  let serviceScrollValue2;

  const contentsWrapper = document.getElementById("contents-wrapper");

  const serviceDetail1 = document.getElementById("service__detail-1");
  const serviceList1 = document.getElementById("service__detail-list-1");


  const serviceDetail2 = document.getElementById("service__detail-2");
  const serviceList2 = document.getElementById("service__detail-list-2");

  gnavButton.addEventListener("click", function () {
    this.classList.toggle("js-opened");
    gnavMenu.classList.toggle("js-opened");
    gnav.classList.toggle("js-blur");
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= breakPoint) {
      gnavButton.classList.remove("js-opened");
      gnavMenu.classList.remove("js-opened");
      gnav.classList.remove("js-blur");
    }
  });

  pageTopButton.addEventListener("click", function () {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });

  //SP,TAB用gsap設定
  mm.add("(max-width: 1023px)", () => {
    gsap.to(serviceList1, {
      x: () => -(serviceList1.scrollWidth - serviceList1.offsetWidth),
      ease: "none",
      scrollTrigger: {
        trigger: serviceDetail1,
        start: 'top top',
        end: () => `+=${serviceList1.scrollWidth - serviceList1.offsetWidth}`,
        //end: () => `+=200`,
        scrub: true,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
        markers: true,  // マーカーを表示させる
      }
    });

    // gsap.to(serviceList2, {
    //   x: "-50rem",
    //   scrollTrigger: {
    //     trigger: serviceDetail2,
    //     start: 'top top',
    //     //end: "",
    //     scrub: true,
    //     pin: true,
    //     aniticipatePin: 1,
    //     invalidateOnRefresh: true,
    //     //markers: true,  // マーカーを表示させる
    //   }
    // });
  });

  //PC用gsap設定
  mm.add("(min-width: 1024px)", () => {
    gsap.to(contentsWrapper, {
      x: () => -(contentsWrapper.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: contentsWrapper,
        start: "top top",
        end: () => `+=${contentsWrapper.scrollWidth - window.innerWidth}`,
        scrub: true,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
        markers: true,  // マーカーを表示させる
      }
    });
  });

}, false);