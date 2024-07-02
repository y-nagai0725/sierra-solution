//TOPページ用JS
document.addEventListener('DOMContentLoaded', function () {

  //ページ全体
  const pageWrapper = document.getElementById("wrapper");

  //グローバルナビゲーションメニュー
  const gnavMenu = document.getElementById("gnav__menu");

  //グローバルナビゲーションボタン
  const gnavButton = document.getElementById("gnav__button");

  //GSAPメディアクエリ
  const mm = gsap.matchMedia();

  gnavButton.addEventListener("click", function () {
    this.classList.toggle("js-opened");
    gnavMenu.classList.toggle("js-opened");
    pageWrapper.classList.toggle("js-blur");
  });









  //ScrollTrigger使用
  gsap.registerPlugin(ScrollTrigger);

  //gsapのメディアクエリ設定
  function setGsapMatchMedia() {
    mm.add("(max-width: 767px)", () => {

    });

    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {

    });

    mm.add("(min-width: 1024px)", () => {

    });
  }

}, false);