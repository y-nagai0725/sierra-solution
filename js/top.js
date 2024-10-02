//TOPページ用JS
document.addEventListener('DOMContentLoaded', function () {
  //PC表示ブレイクポイント
  const breakPoint = 1024;

  //main要素
  const main = document.getElementById("main");

  //header要素
  const header = document.getElementById("header");

  //footer要素
  const footer = document.getElementById("footer");

  //グローバルナビゲーションメニュー
  const gnavMenu = document.getElementById("gnav__menu");

  //グローバルナビゲーションボタン
  const hamburgerButton = document.getElementById("hamburger-button");

  //トップへ戻るボタン
  const pageTopButton = document.getElementById("footer__page-top-button");

  //画面上部メニューエリア:PC
  const topMenu = document.getElementById("top-menu");

  //画面下部メニューエリア:PC
  const bottomMenu = document.getElementById("bottom-menu");

  //背景video
  const bgVideo = document.getElementById("bg-video");

  //GSAPメディアクエリ
  const mm = gsap.matchMedia();

  //GSAPでのスクロールのeasing
  const gsapScrollEasing = "power2.out";

  //GSAPでのスクロールのduration
  const gsapScrollDuration = 0.8;

  //GSAPでのscrub値
  const gsapScrubValue = 1;

  //背景アニメーション対象要素
  const bgAnimationTargets = [...document.querySelectorAll("[class$='__background']")];

  //見出し
  const titles = [...document.getElementsByClassName("js-title")];

  //FV:ロゴ
  const fvLogo = document.getElementById("fv__logo");

  //FV:キャッチコピー文字
  const fvCatchcopyCharacters = [...document.getElementsByClassName("fv__character")];

  //whoセクション:introduction
  const whoIntroduction = document.getElementById("who__introduction");

  //Whoセクション:図
  const whoFigures = [...document.getElementsByClassName("who__figure")];

  //Whoセクション:円
  const whoCircle = document.getElementById("who__circle");

  //Serviceセクション:全ての詳細カード
  const serviceDetailCards = [...document.getElementsByClassName("service__detail-item")];

  //Serviceセクション:service1の詳細カード
  const serviceFirstDetailCards = [...document.querySelectorAll(".service__first .service__detail-item")];

  //Serviceセクション:service2の詳細カード
  const serviceSecondDetailCards = [...document.querySelectorAll(".service__second .service__detail-item")];

  //Serviceセクション:画像エリア
  const serviceImageArea = document.getElementById("service__image-area");

  //video要素
  const videos = [...document.querySelectorAll("video")];

  //現在のウィンドウ幅
  let currentWindowWidth = window.innerWidth;

  //path初期化ターゲット
  const initialPathTarget = document.querySelectorAll(".js-path-target");
  const initialPathTargetReverse = document.querySelectorAll(".js-path-target-reverse");

  //Serviceセクション:Card
  const service1Card1 = document.getElementById("service__service-1-card-1");
  const service1Card2 = document.getElementById("service__service-1-card-2");
  const service1Card3 = document.getElementById("service__service-1-card-3");
  const service1Card4 = document.getElementById("service__service-1-card-4");
  const service2Card1 = document.getElementById("service__service-2-card-1");
  const service2Card2 = document.getElementById("service__service-2-card-2");
  const service2Card3 = document.getElementById("service__service-2-card-3");

  //Serviceセクション:Service-1-card-1:SVG
  const service1Card1SVG = document.getElementById("service__service-1-card-1-svg");
  const service1Card1RectangleCorner = service1Card1SVG.querySelector(".rectangle-corner");
  const service1Card1Balloon = service1Card1SVG.querySelector(".balloon");
  const service1Card1BalloonIcon = service1Card1SVG.querySelector(".balloon-icon");
  const service1Card1EmphasisMark = service1Card1SVG.querySelectorAll(".emphasis-mark");
  const service1Card1CenterRectangle = service1Card1SVG.querySelector(".center-rectangle");
  const service1Card1Character = service1Card1SVG.querySelectorAll(".character");
  const service1Card1Line = service1Card1SVG.querySelectorAll(".line");

  //Serviceセクション:Service-1-card-2:SVG
  const service1Card2SVG = document.getElementById("service__service-1-card-2-svg");
  const service1Card2RectangleCorner = service1Card2SVG.querySelector(".rectangle-corner");
  const service1Card2Balloon = service1Card2SVG.querySelector(".balloon");
  const service1Card2BalloonIcon = service1Card2SVG.querySelectorAll(".balloon-icon");
  const service1Card2EmphasisMark = service1Card2SVG.querySelectorAll(".emphasis-mark");
  const service1Card2PIcon = service1Card2SVG.querySelectorAll(".p-icon");
  const service1Card2Character = service1Card2SVG.querySelectorAll(".character");

  //Serviceセクション:Service-1-card-3:SVG
  const service1Card3SVG = document.getElementById("service__service-1-card-3-svg");
  const service1Card3RectangleCorner = service1Card3SVG.querySelector(".rectangle-corner");
  const service1Card3Balloon = service1Card3SVG.querySelector(".balloon");
  const service1Card3BalloonIcon = service1Card3SVG.querySelectorAll(".balloon-icon");
  const service1Card3EmphasisMark = service1Card3SVG.querySelectorAll(".emphasis-mark");
  const service1Card3Character = service1Card3SVG.querySelectorAll(".character");
  const service1Card3CoinTop = service1Card3SVG.querySelectorAll(".coin-top");
  const service1Card3CoinMiddle = service1Card3SVG.querySelectorAll(".coin-middle");
  const service1Card3CoinBottom = service1Card3SVG.querySelectorAll(".coin-bottom");

  //Serviceセクション:Service-2-card-1:ドットサークル画像
  const dotCircleImage = document.getElementById("service__dot-circle");

  //Serviceセクション:Service-2-card-1:circle-personSVG
  const circlePersonSVG = document.getElementsByClassName("service__circle-person");

  //Serviceセクション:Service-2-card-2:item
  const service2Card2Item = document.getElementsByClassName("service__service-2-card-2-item");

  //Serviceセクション:Service-2-card-2:circle
  const service2Card2Circle = document.querySelectorAll(".service__service-2-card-2-item .circle--green");

  //Serviceセクション:Service-2-card-2:image
  const service2Card2Image = document.getElementsByClassName("service__service-2-card-2-image");

  //Serviceセクション:Service-2-card-3:
  const service2Card3DspImage = document.getElementById("service__dsp-image");
  const service2Card3DspArrow = document.getElementById("service__dsp-arrow");
  const service2Card3SspText = document.getElementById("service__ssp-text");
  const service2Card3SspImage = document.getElementById("service__ssp-image");
  const service2Card3Middle = document.getElementById("service__service-2-card-3-middle");
  const service2Card3PlatformText = document.getElementById("service__platform-text");
  const service2Card3PlatformImage = document.getElementsByClassName("service__platform-image");

  const companySection = document.getElementById("company");
  const opening = document.getElementById("opening");
  const openingProgressLine = [...document.getElementsByClassName("opening__progress-line")];
  const scrollCircle = document.getElementById("bottom-menu__scroll-circle");
  const indexSection = document.getElementById("index");
  const contentsWrapper = document.getElementById("contents-wrapper");
  const contents = document.getElementById("contents");
  const serviceDetail1 = document.getElementById("service__detail-1");
  const serviceDetail2 = document.getElementById("service__detail-2");
  const serviceList1 = document.getElementById("service__detail-list-1");
  const serviceList2 = document.getElementById("service__detail-list-2");
  const serviceWrapper = document.getElementById("service__service-wrapper");
  const topMenuNav = document.getElementById("top-menu__nav");
  const whoValue = document.getElementById("who__value");
  const whoValueTextBox = gsap.utils.toArray(".who__value-text--box");
  const progressBar = document.getElementById("progress-bar");
  const progressBarProperty = "--bar-scale";
  const newsCardList = document.getElementById("news__card-list");
  const information = document.getElementById("bottom-menu__information-list");
  const sectionList = [...document.getElementsByTagName("section")];
  const categorySelectBox = document.getElementById("news__select");
  const categoryList = {
    "all": "All",
    "event": "イベント",
    "notice": "お知らせ",
    "release": "プレリリース",
  };
  const newsContents = document.getElementById("news__contents");
  const newsScrollTarget = gsap.utils.toArray(".js-news-scroll");
  const links = document.querySelectorAll("a[href^='#']");
  let horizontalScrollTween;

  //ウィンドウリサイズ時処理
  window.addEventListener("resize", function () {
    ScrollTrigger.refresh();
    if (window.innerWidth >= breakPoint) {
      closeGnavMenu();
    }

    if (((currentWindowWidth < breakPoint) && (window.innerWidth >= breakPoint)) || ((currentWindowWidth >= breakPoint) && (window.innerWidth < breakPoint))) {
      videos.forEach(video => {
        setVideoSource(video, video.dataset.baseSrc);
      });

      //保持データ更新
      currentWindowWidth = window.innerWidth;
    }
  });

  //スクロール時処理
  window.addEventListener("scroll", function () {
    //ウィンドウ幅
    const windowWidth = window.innerWidth;

    if (windowWidth >= breakPoint) {
      //PC表示時
      checkIndexArea();
      checkServiceArea();
      checkSectionArea();
    }
  });

  //グローバルナビゲーションボタンクリック時処理
  hamburgerButton.addEventListener("click", function () {
    if (this.classList.contains('js-opened')) {
      //閉じる処理
      closeGnavMenu();
    } else {
      //開く処理
      openGnavMenu();
    }
  });

  //ページトップボタンクリック時処理
  pageTopButton.addEventListener("click", function () {
    gsap.to(window, {
      duration: gsapScrollDuration,
      ease: gsapScrollEasing,
      scrollTo: {
        y: 0,
      },
      onComplete: () => {
        scrollCircle.classList.add("js-showed");
        progressBar.classList.remove("js-showed");
      },
    });
  });

  //カテゴリーセレクトボックス選択時処理
  categorySelectBox.addEventListener("change", function () {
    const selectedCategory = this.value;
    if (categoryList[selectedCategory]) {
      getNewsData(selectedCategory);
    } else {
      console.error("不正な値が選択されています。");
    }
  });

  //main要素タッチ時処理
  main.addEventListener("touchstart", function (e) {
    if (isOpenedMenu()) {
      //メニューが開かれている場合は閉じる
      e.preventDefault();
      closeGnavMenu();
    }
  });

  //アンカーリンクのクリック処理設定
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const anchorName = link.getAttribute("href");

      if (anchorName === "#") {
        gsap.to(window, {
          duration: gsapScrollDuration,
          ease: gsapScrollEasing,
          scrollTo: {
            y: 0,
          },
          onComplete: closeGnavMenu(),
        });
      } else {
        mm.add("(max-width: 1023px)", () => {
          gsap.to(window, {
            duration: gsapScrollDuration,
            ease: gsapScrollEasing,
            scrollTo: {
              y: anchorName,
            },
            onComplete: closeGnavMenu(),
          });
        });

        mm.add("(min-width: 1024px)", () => {
          const target = document.getElementById(anchorName.slice(1));
          const targetPosition = target.getBoundingClientRect().left + window.scrollY;
          gsap.to(window, {
            duration: gsapScrollDuration,
            ease: gsapScrollEasing,
            scrollTo: {
              y: targetPosition,
            }
          });
        });
      }
    });
  });

  //横スクロールGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
    horizontalScrollTween = gsap.timeline({
      scrollTrigger: {
        trigger: contentsWrapper,
        start: "top top",
        end: () => "+=" + (contentsWrapper.scrollWidth - window.innerWidth),
        scrub: gsapScrubValue,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => {
          progressBar.style.setProperty(progressBarProperty, self.progress + " 1");
        },
      }
    }).to(contents, {
      x: () => -(contents.scrollWidth - window.innerWidth),
      ease: "none",
    }, "horizontalScroll").to(bottomMenu, {
      x: () => (contents.scrollWidth - window.innerWidth),
      ease: "none",
    }, "horizontalScroll").to(topMenu, {
      x: () => (contents.scrollWidth - window.innerWidth),
      ease: "none",
    }, "horizontalScroll").to(bgVideo, {
      x: () => (contents.scrollWidth - window.innerWidth),
      ease: "none",
    }, "horizontalScroll");
  });

  //横スクロールGSAP設定クリア:SP
  mm.add("(max-width: 1023px)", () => {
    //ウィンドウリサイズ時（PCからSP）にインラインスタイルが残ってしまうのを解除
    gsap.to(contents, {
      clearProps: true,
    });
  });

  //WhoセクションのGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
    //図の表示設定
    ScrollTrigger.create({
      pinnedContainer: contentsWrapper,
      trigger: whoIntroduction,
      start: () => whoIntroduction.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.6,
      invalidateOnRefresh: true,
      onEnter: () => {
        whoFigures.forEach(figure => {
          figure.classList.add("js-showed");
        });
        whoCircle.classList.add("js-showed");
      },
    });

    //value部分
    gsap.to(whoValue, {
      x: 900,
      ease: "none",
      scrollTrigger: {
        pinnedContainer: contentsWrapper,
        trigger: whoValue,
        start: () => whoValue.getBoundingClientRect().left + window.scrollY - 100,
        end: "+=900",
        scrub: gsapScrubValue,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress >= 0.5) {
            showValueTextBox();
          }
        },
      },
    });
  });

  //WhoセクションのGSAP設定:SP
  mm.add("(max-width: 1023px)", () => {
    //図の表示設定
    ScrollTrigger.create({
      trigger: whoIntroduction,
      start: "top center+=10%",
      invalidateOnRefresh: true,
      onEnter: () => {
        whoFigures.forEach(figure => {
          figure.classList.add("js-showed");
        });
        whoCircle.classList.add("js-showed");
      },
    });

    //value部分
    ScrollTrigger.create({
      trigger: whoValue,
      start: "top top+=7%",
      end: "+=700",
      pin: true,
      scrub: gsapScrubValue,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (self.progress >= 0.5) {
          showValueTextBox();
        }
      },
    });
  });

  //NewsセクションのGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
    gsap.to(newsScrollTarget, {
      x: () => newsContents.offsetWidth * 0.6,
      ease: "none",
      scrollTrigger: {
        pinnedContainer: contentsWrapper,
        trigger: newsContents,
        start: () => newsContents.getBoundingClientRect().left + window.scrollY,
        end: () => "+=" + (newsContents.offsetWidth * 0.6),
        scrub: gsapScrubValue,
        invalidateOnRefresh: true,
      },
    });
  });

  //ServciceセクションのGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
    //各カード共通設定
    serviceDetailCards.forEach(card => {
      ScrollTrigger.create({
        pinnedContainer: contentsWrapper,
        trigger: card,
        start: () => card.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.75,
        invalidateOnRefresh: true,
        toggleClass: {
          targets: card,
          className: "js-showed",
        },
        once: true,
      });
    });

    //service1Card1のアニメーション設定
    const service1Card1Animation = gsap.timeline({
      paused: true,
    }).to(service1Card1RectangleCorner, {
      duration: 0.8,
      ease: "liner",
      strokeDashoffset: Math.ceil(service1Card1RectangleCorner.getTotalLength()),
    }).to(service1Card1Balloon, {
      duration: 0.4,
      ease: gsapScrollEasing,
      opacity: 1,
    }, "-=0.3").to(service1Card1BalloonIcon, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.2, opacity: 0.5, y: -5 },
        { duration: 0.2, opacity: 1, y: 0 },
      ],
    }, "<").to(service1Card1EmphasisMark, {
      duration: 0.15,
      ease: gsapScrollEasing,
      strokeDashoffset: 0,
      stagger: {
        each: 0.1,
      },
    }, "<").to(service1Card1CenterRectangle, {
      duration: 0.4,
      ease: "liner",
      strokeDashoffset: 0,
    }, "<").to(service1Card1Character, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.2, opacity: 0.5, y: -5 },
        { duration: 0.2, opacity: 1, y: 0 },
      ],
    }, "<").to(service1Card1Line, {
      duration: 0.2,
      ease: "liner",
      strokeDashoffset: 0,
      stagger: {
        each: 0.1,
      },
    }, "<")

    const resetService1Card1Animation = function () {
      gsap.set(service1Card1RectangleCorner, {
        strokeDashoffset: 0,
      });
      gsap.set([service1Card1Balloon, service1Card1BalloonIcon, service1Card1Character], {
        opacity: 0,
      });
      service1Card1EmphasisMark.forEach(mark => {
        gsap.set(mark, {
          strokeDashoffset: Math.ceil(mark.getTotalLength()),
        });
      });
      gsap.set(service1Card1CenterRectangle, {
        strokeDashoffset: Math.ceil(service1Card1CenterRectangle.getTotalLength()),
      });
      service1Card1Line.forEach(line => {
        gsap.set(line, {
          strokeDashoffset: Math.ceil(line.getTotalLength()),
        });
      });
    };

    ScrollTrigger.create({
      pinnedContainer: contentsWrapper,
      trigger: service1Card1,
      start: () => service1Card1.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.75,
      end: () => "+=" + (window.innerWidth * 0.75 + service1Card1.offsetWidth),
      invalidateOnRefresh: true,
      onEnter: () => {
        service1Card1Animation.restart();
      },
      onLeave: () => {
        service1Card1Animation.kill();
        resetService1Card1Animation();
      },
      onEnterBack: () => {
        service1Card1Animation.restart();
      },
      onLeaveBack: () => {
        service1Card1Animation.kill();
        resetService1Card1Animation();
      },
    });

    //service1Card2のアニメーション設定
    const service1Card2Animation = gsap.timeline({
      paused: true,
    }).to(service1Card2RectangleCorner, {
      duration: 0.8,
      ease: "liner",
      strokeDashoffset: Math.ceil(service1Card2RectangleCorner.getTotalLength()),
    }).to(service1Card2Balloon, {
      duration: 0.4,
      ease: gsapScrollEasing,
      opacity: 1,
    }, "-=0.3").to(service1Card2BalloonIcon, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.2, opacity: 0.5, y: -5 },
        { duration: 0.2, opacity: 1, y: 0 },
      ],
    }, "<").to(service1Card2EmphasisMark, {
      duration: 0.15,
      ease: gsapScrollEasing,
      strokeDashoffset: 0,
      stagger: {
        each: 0.1,
      },
    }, "<").to(service1Card2PIcon, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.2, opacity: 0.5, y: -5 },
        { duration: 0.2, opacity: 1, y: 0 },
      ],
    }, "<").to(service1Card2Character, {
      duration: 0.4,
      ease: gsapScrollEasing,
      opacity: 1,
    }, "<");

    const resetService1Card2Animation = function () {
      gsap.set(service1Card2RectangleCorner, {
        strokeDashoffset: 0,
      });
      gsap.set([service1Card2Balloon, service1Card2BalloonIcon, service1Card2PIcon, service1Card2Character], {
        opacity: 0,
      });
      service1Card2EmphasisMark.forEach(mark => {
        gsap.set(mark, {
          strokeDashoffset: Math.ceil(mark.getTotalLength()),
        });
      });
    };

    ScrollTrigger.create({
      pinnedContainer: contentsWrapper,
      trigger: service1Card2,
      start: () => service1Card2.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.75,
      end: () => "+=" + (window.innerWidth * 0.75 + service1Card2.offsetWidth),
      invalidateOnRefresh: true,
      onEnter: () => {
        service1Card2Animation.restart();
      },
      onLeave: () => {
        service1Card2Animation.kill();
        resetService1Card2Animation();
      },
      onEnterBack: () => {
        service1Card2Animation.restart();
      },
      onLeaveBack: () => {
        service1Card2Animation.kill();
        resetService1Card2Animation();
      },
    });

    //service1Card3のアニメーション設定
    const service1Card3Animation = gsap.timeline({
      paused: true,
    }).to(service1Card3RectangleCorner, {
      duration: 0.8,
      ease: "liner",
      strokeDashoffset: Math.ceil(service1Card3RectangleCorner.getTotalLength()),
    }).to(service1Card3Balloon, {
      duration: 0.4,
      ease: gsapScrollEasing,
      opacity: 1,
    }, "-=0.3").to(service1Card3BalloonIcon, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.2, opacity: 0.5, y: -5 },
        { duration: 0.2, opacity: 1, y: 0 },
      ],
    }, "<").to(service1Card3EmphasisMark, {
      duration: 0.15,
      ease: gsapScrollEasing,
      strokeDashoffset: 0,
      stagger: {
        each: 0.1,
      },
    }, "<").to(service1Card3Character, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.08, opacity: 0.5, y: -5 },
        { duration: 0.08, opacity: 1, y: 0 },
      ],
      stagger: {
        each: 0.08,
      }
    }, "<").to(service1Card3CoinBottom, {
      duration: 0.2,
      ease: gsapScrollEasing,
      opacity: 1,
      y: 0,
    }, "<0.3").to(service1Card3CoinMiddle, {
      duration: 0.2,
      ease: gsapScrollEasing,
      opacity: 1,
      y: 0,
    }, "<0.1").to(service1Card3CoinTop, {
      duration: 0.2,
      ease: gsapScrollEasing,
      opacity: 1,
      y: 0,
    }, "<0.1");

    const resetService1Card3Animation = function () {
      gsap.set(service1Card3RectangleCorner, {
        strokeDashoffset: 0,
      });
      gsap.set([service1Card3Balloon, service1Card3BalloonIcon, service1Card3Character], {
        opacity: 0,
      });
      service1Card3EmphasisMark.forEach(mark => {
        gsap.set(mark, {
          strokeDashoffset: Math.ceil(mark.getTotalLength()),
        });
      });
      gsap.set([service1Card3CoinBottom, service1Card3CoinMiddle, service1Card3CoinTop], {
        opacity: 0,
        y: -5,
      });
    };

    ScrollTrigger.create({
      pinnedContainer: contentsWrapper,
      trigger: service1Card3,
      start: () => service1Card3.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.75,
      end: () => "+=" + (window.innerWidth * 0.75 + service1Card3.offsetWidth),
      invalidateOnRefresh: true,
      onEnter: () => {
        service1Card3Animation.restart();
      },
      onLeave: () => {
        service1Card3Animation.kill();
        resetService1Card3Animation();
      },
      onEnterBack: () => {
        service1Card3Animation.restart();
      },
      onLeaveBack: () => {
        service1Card3Animation.kill();
        resetService1Card3Animation();
      },
    });

    //service1Card4のアニメーション設定


    //service2Card1のアニメーション設定
    ScrollTrigger.create({
      pinnedContainer: contentsWrapper,
      trigger: service2Card1,
      start: () => service2Card1.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.75,
      end: () => "+=" + (window.innerWidth - service2Card1.offsetWidth / 2),
      invalidateOnRefresh: true,
      toggleClass: {
        targets: [dotCircleImage, circlePersonSVG],
        className: "js-actived",
      },
    });

    //service2Card2のアニメーション設定
    const service2Card2Animation = gsap.timeline({
      paused: true,
    }).to(service2Card2Item, {
      opacity: 1,
      duration: 0.4,
      ease: gsapScrollEasing,
      stagger: {
        each: 0.2,
      },
    }).to(service2Card2Circle, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "liner",
      stagger: {
        each: 0.2,
      },
    }, "<").to(service2Card2Image, {
      keyframes: [
        { duration: 0.3, scale: 1.3 },
        { duration: 0.3, scale: 1 },
      ],
      ease: gsapScrollEasing,
      stagger: {
        each: 0.2,
      },
    }, "<");

    const resetService2Card2Animation = function () {
      gsap.set(service2Card2Item, {
        opacity: 0,
      });
      gsap.set(service2Card2Circle, {
        strokeDashoffset: 300,
      });
    }

    ScrollTrigger.create({
      pinnedContainer: contentsWrapper,
      trigger: service2Card2,
      start: () => service2Card2.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.75,
      end: () => "+=" + (window.innerWidth * 0.75 + service2Card2.offsetWidth),
      invalidateOnRefresh: true,
      onEnter: () => {
        service2Card2Animation.restart();
      },
      onLeave: () => {
        service2Card2Animation.kill();
        resetService2Card2Animation();
      },
      onEnterBack: () => {
        service2Card2Animation.restart();
      },
      onLeaveBack: () => {
        service2Card2Animation.kill();
        resetService2Card2Animation();
      },
    });

    //service2Card3のアニメーション設定
    const service2Card3Animation = gsap.timeline({
      paused: true,
    }).to(service2Card3DspImage, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.2, opacity: 0.5, y: -10 },
        { duration: 0.2, opacity: 1, y: 0 },
      ],
    }).to(service2Card3DspArrow, {
      duration: 0.4,
      ease: gsapScrollEasing,
      clipPath: "inset(0 0% 0 0)",
    }, "<0.1").to(service2Card3SspText, {
      duration: 0.4,
      ease: gsapScrollEasing,
      opacity: 1,
    }, "<0.1").to(service2Card3SspImage, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.2, opacity: 0.5, y: -10 },
        { duration: 0.2, opacity: 1, y: 0 },
      ],
    }, "<0.1").to(service2Card3Middle, {
      duration: 0.4,
      ease: gsapScrollEasing,
      opacity: 1,
    }, "<0.1").to(service2Card3PlatformText, {
      duration: 0.4,
      ease: gsapScrollEasing,
      opacity: 1,
    }, "<0.1").to(service2Card3PlatformImage, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.2, opacity: 0.5, y: -5 },
        { duration: 0.2, opacity: 1, y: 0 },
      ],
      stagger: {
        each: 0.1,
      }
    }, "<0.1");

    const resetService2Card3Animation = function () {
      gsap.set([service2Card3DspImage, service2Card3SspText, service2Card3SspImage, service2Card3Middle, service2Card3PlatformText, service2Card3PlatformImage], {
        opacity: 0,
      });
      gsap.set(service2Card3DspArrow, {
        clipPath: "inset(0 100% 0 0)",
      });
    }

    ScrollTrigger.create({
      pinnedContainer: contentsWrapper,
      trigger: service2Card3,
      start: () => service2Card3.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.75,
      end: () => "+=" + (window.innerWidth * 0.75 + service2Card3.offsetWidth),
      invalidateOnRefresh: true,
      onEnter: () => {
        service2Card3Animation.restart();
      },
      onLeave: () => {
        service2Card3Animation.kill();
        resetService2Card3Animation();
      },
      onEnterBack: () => {
        service2Card3Animation.restart();
      },
      onLeaveBack: () => {
        service2Card3Animation.kill();
        resetService2Card3Animation();
      },
    });

    //画像スクロール連動アニメーション
    gsap.timeline({
      scrollTrigger: {
        pinnedContainer: contentsWrapper,
        trigger: serviceImageArea,
        start: () => serviceImageArea.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.6,
        end: () => "+=" + serviceImageArea.offsetWidth,
        scrub: gsapScrubValue,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.to(serviceImageArea.children, {
            ease: gsapScrollEasing,
            opacity: 1,
            duration: 0.4,
            scale: 1,
            stagger: {
              each: 0.2,
            },
          });
        },
      }
    }).to(".service__image--top", {
      xPercent: 13,
    }, "<").to(".service__image--middle", {
      xPercent: 13,
    }, "<").to(".service__image--bottom", {
      xPercent: 13,
    }, "<");
  });

  //ServciceセクションのGSAP設定:SP
  mm.add("(max-width: 1023px)", () => {
    //service1設定
    gsap.set(serviceList1, {
      opacity: 0,
    });

    gsap.to(serviceList1, {
      opacity: 1,
      duration: 0.4,
      ease: gsapScrollEasing,
      scrollTrigger: {
        trigger: serviceList1,
        start: "top center+=10%",
        invalidateOnRefresh: true,
      }
    });

    const scrollServiceFirst = gsap.to(serviceList1, {
      x: () => -(serviceList1.scrollWidth - serviceList1.offsetWidth),
      ease: "none",
      scrollTrigger: {
        trigger: serviceDetail1,
        start: 'top top+=7%',
        end: () => "+=" + (serviceList1.scrollWidth - serviceList1.offsetWidth),
        scrub: gsapScrubValue,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    serviceFirstDetailCards.forEach(card => {
      ScrollTrigger.create({
        pinnedContainer: serviceDetail1,
        containerAnimation: scrollServiceFirst,
        trigger: card,
        start: () => "left right",
        invalidateOnRefresh: true,
        toggleClass: {
          targets: card,
          className: "js-showed",
        },
        once: true,
      });
    });

    //service2設定
    gsap.set(serviceList2, {
      opacity: 0,
    });

    gsap.to(serviceList2, {
      opacity: 1,
      duration: 0.4,
      ease: gsapScrollEasing,
      scrollTrigger: {
        trigger: serviceList2,
        start: "top center+=10%",
        invalidateOnRefresh: true,
      }
    });

    const scrollServiceSecond = gsap.to(serviceList2, {
      x: () => -(serviceList2.scrollWidth - serviceList2.offsetWidth),
      ease: "none",
      scrollTrigger: {
        trigger: serviceDetail2,
        start: 'top top+=7%',
        end: () => "+=" + (serviceList2.scrollWidth - serviceList2.offsetWidth),
        scrub: gsapScrubValue,
        pin: true,
        aniticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    serviceSecondDetailCards.forEach(card => {
      ScrollTrigger.create({
        pinnedContainer: serviceDetail2,
        containerAnimation: scrollServiceSecond,
        trigger: card,
        start: () => "left right",
        invalidateOnRefresh: true,
        toggleClass: {
          targets: card,
          className: "js-showed",
        },
        once: true,
      });
    });

    //service2Card1のアニメーション設定
    ScrollTrigger.create({
      pinnedContainer: serviceDetail2,
      containerAnimation: scrollServiceSecond,
      trigger: service2Card1,
      start: () => "left right",
      invalidateOnRefresh: true,
      toggleClass: {
        targets: [dotCircleImage, circlePersonSVG],
        className: "js-actived",
      },
    });

    //service2Card2のアニメーション設定
    const service2Card2Animation = gsap.timeline({
      paused: true,
    }).to(service2Card2Item, {
      opacity: 1,
      duration: 0.4,
      ease: gsapScrollEasing,
      stagger: {
        each: 0.2,
      },
    }).to(service2Card2Circle, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "liner",
      stagger: {
        each: 0.2,
      },
    }, "<").to(service2Card2Image, {
      keyframes: [
        { duration: 0.3, scale: 1.3 },
        { duration: 0.3, scale: 1 },
      ],
      ease: gsapScrollEasing,
      stagger: {
        each: 0.2,
      },
    }, "<");

    const resetService2Card2Animation = function () {
      gsap.set(service2Card2Item, {
        opacity: 0,
      });
      gsap.set(service2Card2Circle, {
        strokeDashoffset: 300,
      });
    }

    ScrollTrigger.create({
      pinnedContainer: serviceDetail2,
      containerAnimation: scrollServiceSecond,
      trigger: service2Card2,
      start: "left center+=20%",
      end: "right left+=10%",
      invalidateOnRefresh: true,
      onEnter: () => {
        service2Card2Animation.restart();
      },
      onLeave: () => {
        service2Card2Animation.kill();
        resetService2Card2Animation();
      },
      onEnterBack: () => {
        service2Card2Animation.restart();
      },
      onLeaveBack: () => {
        service2Card2Animation.kill();
        resetService2Card2Animation();
      },
    });

    //service2Card3のアニメーション設定
    const service2Card3Animation = gsap.timeline({
      paused: true,
    }).to(service2Card3DspImage, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.2, opacity: 0.5, y: -10 },
        { duration: 0.2, opacity: 1, y: 0 },
      ],
    }).to(service2Card3DspArrow, {
      duration: 0.4,
      ease: gsapScrollEasing,
      clipPath: "inset(0 0% 0 0)",
    }, "<0.1").to(service2Card3SspText, {
      duration: 0.4,
      ease: gsapScrollEasing,
      opacity: 1,
    }, "<0.1").to(service2Card3SspImage, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.2, opacity: 0.5, y: -10 },
        { duration: 0.2, opacity: 1, y: 0 },
      ],
    }, "<0.1").to(service2Card3Middle, {
      duration: 0.4,
      ease: gsapScrollEasing,
      opacity: 1,
    }, "<0.1").to(service2Card3PlatformText, {
      duration: 0.4,
      ease: gsapScrollEasing,
      opacity: 1,
    }, "<0.1").to(service2Card3PlatformImage, {
      ease: gsapScrollEasing,
      keyframes: [
        { duration: 0.2, opacity: 0.5, y: -5 },
        { duration: 0.2, opacity: 1, y: 0 },
      ],
      stagger: {
        each: 0.1,
      }
    }, "<0.1");

    const resetService2Card3Animation = function () {
      gsap.set([service2Card3DspImage, service2Card3SspText, service2Card3SspImage, service2Card3Middle, service2Card3PlatformText, service2Card3PlatformImage], {
        opacity: 0,
      });
      gsap.set(service2Card3DspArrow, {
        clipPath: "inset(0 100% 0 0)",
      });
    }

    ScrollTrigger.create({
      pinnedContainer: serviceDetail2,
      containerAnimation: scrollServiceSecond,
      trigger: service2Card3,
      start: "left center+=20%",
      end: "right left+=10%",
      invalidateOnRefresh: true,
      onEnter: () => {
        service2Card3Animation.restart();
      },
      onLeave: () => {
        service2Card3Animation.kill();
        resetService2Card3Animation();
      },
      onEnterBack: () => {
        service2Card3Animation.restart();
      },
      onLeaveBack: () => {
        service2Card3Animation.kill();
        resetService2Card3Animation();
      },
    });

    //画像スクロール連動アニメーション
    gsap.timeline({
      scrollTrigger: {
        trigger: serviceImageArea,
        start: "top center",
        scrub: gsapScrubValue,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.to(serviceImageArea.children, {
            ease: gsapScrollEasing,
            opacity: 1,
            duration: 0.4,
            scale: 1,
            stagger: {
              each: 0.2,
            },
          });
        },
      }
    }).to(".service__image--top", {
      yPercent: -15,
    }, "<").to(".service__image--middle", {
      yPercent: -15,
    }, "<").to(".service__image--bottom", {
      yPercent: -15,
    }, "<");
  });

  //グローバルナビゲーションボタンGSAP設定:SP
  mm.add("(max-width: 1023px)", () => {
    gsap.to(hamburgerButton, {
      autoAlpha: 0,
      duration: 0.4,
      scrollTrigger: {
        trigger: footer,
        start: "top bottom",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });
  });

  //背景アニメーションGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
    ScrollTrigger.create({
      pinnedContainer: contentsWrapper,
      trigger: indexSection,
      start: () => indexSection.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.6,
      end: () => companySection.getBoundingClientRect().right + window.scrollY - window.innerWidth * 0.6,
      invalidateOnRefresh: true,
      toggleClass: {
        targets: bgAnimationTargets,
        className: "js-visibled",
      },
    });
  });

  //背景アニメーションGSAP設定:SP
  mm.add("(max-width: 1023px)", () => {
    ScrollTrigger.create({
      trigger: indexSection,
      start: "top center",
      endTrigger: companySection,
      end: "bottom center",
      invalidateOnRefresh: true,
      toggleClass: {
        targets: bgAnimationTargets,
        className: "js-visibled",
      },
    });
  });

  //見出しのGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
    titles.forEach(title => {
      ScrollTrigger.create({
        pinnedContainer: contentsWrapper,
        trigger: title,
        start: () => title.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.6,
        invalidateOnRefresh: true,
        onEnter: () => {
          if (!title.classList.contains("js-showed")) {
            title.classList.add("js-showed");
          }
        },
      });
    });
  });

  //見出しのGSAP設定:SP
  mm.add("(max-width: 1023px)", () => {
    titles.forEach(title => {
      ScrollTrigger.create({
        trigger: title,
        start: "top center+=10%",
        invalidateOnRefresh: true,
        onEnter: () => {
          if (!title.classList.contains("js-showed")) {
            title.classList.add("js-showed");
          }
        },
      });
    });
  });

  //イベント処理禁止用
  function noScroll(e) {
    e.preventDefault();
  }

  //スクロール許可
  function allowWindowScroll() {
    document.removeEventListener('touchmove', noScroll);
    document.removeEventListener('wheel', noScroll);
  }

  //スクロール禁止
  function disallowWindowScroll() {
    document.addEventListener('touchmove', noScroll, { passive: false });
    document.addEventListener('wheel', noScroll, { passive: false });
  }

  function isOpenedMenu() {
    if (hamburgerButton.classList.contains("js-opened")) {
      return true;
    } else {
      return false;
    }
  }

  function openGnavMenu() {
    if (!isOpenedMenu()) {
      hamburgerButton.classList.add("js-opened");
      gnavMenu.classList.add("js-opened");
      main.classList.add("js-blur");
      header.classList.add("js-blur");

      //メニューが開かれているときはスクロール禁止
      disallowWindowScroll();
    }
  }

  function closeGnavMenu() {
    if (isOpenedMenu()) {
      hamburgerButton.classList.remove("js-opened");
      gnavMenu.classList.remove("js-opened");
      main.classList.remove("js-blur");
      header.classList.remove("js-blur");

      //スクロール禁止を解除
      allowWindowScroll();
    }
  }

  function checkSectionArea() {
    const adjustmentValue = window.innerWidth * 0.5;
    const currentScroll = window.scrollY + adjustmentValue;
    let targetPointList = [];
    sectionList.forEach(section => {
      const sectionPoint = section.getBoundingClientRect().left + window.scrollY;
      targetPointList.push(sectionPoint);
    });
    const footerPoint = footer.getBoundingClientRect().left + window.scrollY;
    targetPointList.push(footerPoint);

    for (let i = 0; i < targetPointList.length - 1; i++) {
      const sectionStartPoint = targetPointList[i];
      const sectionEndPoint = targetPointList[i + 1];
      const baseClassName = "js-show-section-";

      if (sectionStartPoint <= currentScroll && currentScroll < sectionEndPoint) {
        const addClassName = baseClassName + (i + 1);
        //追加クラス名が存在しない場合
        if (!information.classList.contains(addClassName)) {
          //既存の追加されたクラス名を削除
          removeClass(information, baseClassName + ".+", "g");

          //クラス名追加
          information.classList.add(addClassName);
        }
        break;
      } else if ((i === 0 && currentScroll < sectionStartPoint) || (i === targetPointList.length - 2 && sectionEndPoint <= currentScroll)) {
        removeClass(information, baseClassName + ".+", "g");
        break;
      }
    }

  }

  function checkIndexArea() {
    const adjustmentValue = window.innerWidth * 0.5;
    const startPoint = indexSection.getBoundingClientRect().left + window.scrollY;
    const currentScroll = window.scrollY;

    if (startPoint <= currentScroll + adjustmentValue) {
      scrollCircle.classList.remove("js-showed");
      progressBar.classList.add("js-showed");
    } else {
      scrollCircle.classList.add("js-showed");
      progressBar.classList.remove("js-showed");
    }
  }

  function checkServiceArea() {
    const startPoint = serviceWrapper.getBoundingClientRect().left + window.scrollY;
    const endPoint = serviceWrapper.getBoundingClientRect().right + window.scrollY;
    const currentScroll = window.scrollY;

    if (startPoint <= currentScroll && currentScroll <= endPoint) {
      topMenuNav.classList.add("js-opened");
    } else {
      topMenuNav.classList.remove("js-opened");
    }
  }

  function showValueTextBox() {
    whoValueTextBox.forEach((box, index) => {
      box.classList.add("js-show-box");
      box.classList.add("js-delay" + index);
    });
  }

  function removeClass(targetElement, regExpString, option) {
    const targetClassName = targetElement.className;
    const regExp = new RegExp(regExpString, option);
    const matchedList = targetClassName.match(regExp) || [];
    for (let i = 0; i < matchedList.length; i++) {
      targetElement.classList.remove(matchedList[i]);
    }
  }

  function getNewsData(category, isInitialLoading = false) {
    //----------------------------------
    //実際はapi呼び出しでjsonデータ取得想定
    //----------------------------------

    //今回はカテゴリー別にjsonファイル読み込みで仮実装
    fetch("js/" + category + ".json")
      .then(response => response.json())
      .then(data => {
        //リストの既存要素削除
        while (newsCardList.firstChild) {
          newsCardList.removeChild(newsCardList.firstChild);
        }

        //リスト作成
        for (let i = 0; i < data.length; i++) {
          //上限5件
          if (i === 5) break;

          const date = data[i].date;
          const text = data[i].text;
          const categoryJp = categoryList[data[i].category];
          const temp = `<a href="#" class="news__card-link">
                          <span class="news__date">${date}</span>
                          <p class="news__text">
                            ${text}
                          </p>
                          <span class="news__tag" data-tag="${category}">${categoryJp}</span>
                        </a>`;
          const li = document.createElement("li");
          li.classList.add("news__card");
          li.innerHTML = temp;
          newsCardList.appendChild(li);

          //ローディングのプログレスバー更新
          if (isInitialLoading) {
            const value = ((i + 1) / data.length);
            openingProgressLine.forEach(line => {
              line.style.setProperty("scale", value + " 1");
            })
          }
        }

        const newsCard = [...document.getElementsByClassName("news__card")];

        //作成したnewsリストへのGSAP設定:PC
        mm.add("(min-width: 1024px)", () => {
          gsap.set(newsCard, {
            opacity: 0,
            xPercent: 10,
          });

          gsap.timeline({
            scrollTrigger: {
              pinnedContainer: contents,
              trigger: newsContents,
              start: () => newsContents.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.6,
              invalidateOnRefresh: true,
            },
          }).to(newsCard, {
            keyframes: [
              { duration: 0.6, opacity: 0.5, xPercent: -3 },
              { duration: 0.6, opacity: 1, xPercent: 0 },
            ],
            ease: gsapScrollEasing,
            stagger: {
              each: 0.2,
            },
          });
        });

        //作成したnewsリストへのGSAP設定:SP
        mm.add("(max-width: 1023px)", () => {
          gsap.set(newsCard, {
            opacity: 0,
            yPercent: 10,
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: newsContents,
              start: "top center+=10%",
              invalidateOnRefresh: true,
            },
          }).to(newsCard, {
            keyframes: [
              { duration: 0.4, opacity: 0.5, yPercent: -3 },
              { duration: 0.4, opacity: 1, yPercent: 0 },
            ],
            ease: gsapScrollEasing,
            stagger: {
              each: 0.2,
            },
          });
        });

        //DOM削除と追加による調整の為
        ScrollTrigger.refresh();

        //PC表示時、スクロール位置をリストの先頭へ
        if (!isInitialLoading && window.innerWidth >= breakPoint) {
          const targetPosition = newsContents.getBoundingClientRect().left + window.scrollY;
          gsap.to(window, {
            duration: 0.8,
            ease: gsapScrollEasing,
            scrollTo: {
              y: targetPosition,
            }
          });
        }

        //OPアニメーション画面非表示
        if (isInitialLoading) {
          gsap.to(opening, {
            autoAlpha: 0,
            duration: 0.6,
            delay: 1.2,
            onComplete: () => {
              //スクロール禁止を解除
              allowWindowScroll();
              showFirstView();
            }
          });
        }

      })
      .catch(error => {
        console.error("データ取得に失敗しました。", error);
      });
  }

  function resetPathStorke(pathElement, reverse = false) {
    const totalLength = Math.ceil(pathElement.getTotalLength());
    pathElement.style.strokeDasharray = totalLength;
    pathElement.style.strokeDashoffset = reverse ? 0 : totalLength;
  }

  /**
   * videoにsourceを設定
   *
   * @param {*} video video要素
   * @param {*} baseSource 基準パス
   */
  function setVideoSource(video, baseSource) {
    //ウィンドウ幅に対応したpath作成
    const suffix = window.innerWidth < breakPoint ? "_sp" : "_pc";
    const src = baseSource + suffix + ".mp4";

    //source要素作成
    const source = document.createElement("source");
    source.setAttribute("src", src);
    source.setAttribute("type", "video/mp4");

    //video要素に追加
    video.innerHTML = "";
    video.appendChild(source);
  }

  /**
   * FV表示処理
   */
  function showFirstView() {
    const tl = gsap.timeline();
    tl.to(fvLogo, {
      opacity: 1
    }).to(fvCatchcopyCharacters, {
      y: 0,
      opacity: 1,
      stagger: {
        each: 0.05,
      },
    }, "<");
  }

  //初期実行処理
  function init() {
    //スクロール禁止
    disallowWindowScroll();

    //video設定
    videos.forEach(video => {
      setVideoSource(video, video.dataset.baseSrc);
    });

    //Newsデータを取得
    getNewsData("all", true);

    //スクロール促し円表示
    if (window.scrollY === 0) {
      scrollCircle.classList.add("js-showed");
    }

    //pathの初期化
    initialPathTarget.forEach(path => {
      resetPathStorke(path);
    });
    initialPathTargetReverse.forEach(path => {
      resetPathStorke(path, true);
    });
  }

  init();

}, false);