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

  const contentsWrapper = document.getElementById("contents-wrapper");
  const serviceDetail1 = document.getElementById("service__detail-1");
  const serviceDetail2 = document.getElementById("service__detail-2");
  const serviceList1 = document.getElementById("service__detail-list-1");
  const serviceList2 = document.getElementById("service__detail-list-2");
  const serviceWrapper = document.getElementById("service__service-wrapper");
  const headerNav = document.getElementById("header__nav");
  const whoValue = document.getElementById("who__value");
  const whoValueTextArea = document.getElementById("who__value-text-area");
  const whoValueTextBox = gsap.utils.toArray(".who__value-text--box");


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

  window.addEventListener("scroll", function () {
    checkServiceArea();
  });

  pageTopButton.addEventListener("click", function () {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });

  //横スクロールGSAP設定:SP,TAB
  mm.add("(max-width: 1023px)", () => {
    gsap.to(serviceList1, {
      x: () => -(serviceList1.scrollWidth - serviceList1.offsetWidth),
      ease: "none",
      scrollTrigger: {
        trigger: serviceDetail1,
        start: 'top top',
        end: () => "+=" + (serviceList1.scrollWidth - serviceList1.offsetWidth),
        scrub: true,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
        markers: true,
      }
    });

    gsap.to(serviceList2, {
      x: () => -(serviceList2.scrollWidth - serviceList2.offsetWidth),
      ease: "none",
      scrollTrigger: {
        trigger: serviceDetail2,
        start: 'top top',
        end: () => "+=" + (serviceList2.scrollWidth - serviceList2.offsetWidth),
        scrub: true,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });
  });

  //横スクロールGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
    gsap.to(contentsWrapper, {
      x: () => -(contentsWrapper.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: contentsWrapper,
        start: "top top",
        end: () => "+=" + (contentsWrapper.scrollWidth - window.innerWidth),
        scrub: true,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });
  });

  //アンカーリンクのクリック処理設定
  const links = document.querySelectorAll("a[href^='#']");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const anchorName = link.getAttribute("href");

      if (anchorName === "#") {
        gsap.to(window, {
          duration: 0.8,
          ease: "power2.out",
          scrollTo: {
            y: 0,
          }
        });
      } else {
        mm.add("(max-width: 1023px)", () => {
          gsap.to(window, {
            duration: 0.8,
            ease: "power2.out",
            scrollTo: {
              y: anchorName,
            }
          });
        });

        mm.add("(min-width: 1024px)", () => {
          const target = document.getElementById(anchorName.slice(1));
          const targetPosition = target.getBoundingClientRect().left + window.scrollY;
          gsap.to(window, {
            duration: 0.8,
            ease: "power2.out",
            scrollTo: {
              y: targetPosition,
            }
          });
        });
      }
    });
  });

  function checkServiceArea() {
    const startPoint = serviceWrapper.getBoundingClientRect().left + window.scrollY;
    const endPoint = serviceWrapper.getBoundingClientRect().right + window.scrollY;
    const currentScroll = window.scrollY;

    if (startPoint <= currentScroll && currentScroll <= endPoint) {
      headerNav.classList.add("js-opened");
    } else {
      headerNav.classList.remove("js-opened");
    }
  }

  //Whoセクションのgsap設定
  mm.add("(min-width: 1024px)", () => {
    gsap.to(whoValue, {
      x: 700,
      ease: "none",
      scrollTrigger: {
        pinnedContainer: contentsWrapper,
        trigger: whoValue,
        start: () => whoValue.getBoundingClientRect().left + window.scrollY,
        end: () => "+=700",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          console.log(self.progress);
          if (self.progress >= 0.5) {
            showValueTextBox();
          }
        },
      },
    });
  });

  function showValueTextBox() {
    whoValueTextBox.forEach((box, index) => {
      box.classList.add("js-show-box");
      box.classList.add("js-delay" + index);
    });
  }

}, false);