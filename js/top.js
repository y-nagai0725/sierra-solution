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

  //GSAPメディアクエリ
  const mm = gsap.matchMedia();

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