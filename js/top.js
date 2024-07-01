//TOPページ用JS
document.addEventListener('DOMContentLoaded', function () {

  //GSAPメディアクエリ
  const mm = gsap.matchMedia();

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