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

  //GSAPメディアクエリ
  const mm = gsap.matchMedia();

  //GSAPでのスクロールのeasing
  const gsapScrollEasing = "power2.out";

  //GSAPでのスクロールのduration
  const gsapScrollDuration = 0.8;

  //GSAPでのscrub値
  const gsapScrubValue = 1;

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
      x: 700,
      ease: "none",
      scrollTrigger: {
        pinnedContainer: contentsWrapper,
        trigger: whoValue,
        start: () => whoValue.getBoundingClientRect().left + window.scrollY,
        end: "+=700",
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
      start: "top top",
      end: "+=500",
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

    //画像スクロール連動アニメーション
    gsap.timeline({
      scrollTrigger: {
        pinnedContainer: contentsWrapper,
        trigger: serviceImageArea,
        start: () => serviceImageArea.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.6,
        end: () => serviceImageArea.getBoundingClientRect().right + window.scrollY - window.innerWidth * 0.6,
        scrub: gsapScrubValue,
        invalidateOnRefresh: true,
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
        start: 'top top',
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
        start: 'top top',
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

    //画像スクロール連動アニメーション
    gsap.timeline({
      scrollTrigger: {
        trigger: serviceImageArea,
        start: "top center",
        scrub: gsapScrubValue,
        invalidateOnRefresh: true,
      }
    }).to(".service__image--top", {
      yPercent: -15,
    }, "<").to(".service__image--middle", {
      yPercent: -15,
    }, "<").to(".service__image--bottom", {
      yPercent: -15,
    }, "<");
  });

  //見出しのGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
    titles.forEach(title => {
      ScrollTrigger.create({
        pinnedContainer: contentsWrapper,
        trigger: title,
        start: () => title.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.6,
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

    //Newsデータを取得
    getNewsData("all", true);

    //スクロール促し円表示
    if (window.scrollY === 0) {
      scrollCircle.classList.add("js-showed");
    }
  }

  init();

}, false);