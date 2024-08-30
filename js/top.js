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

  //GSAPメディアクエリ
  const mm = gsap.matchMedia();

  //画面上部メニューエリア:PC
  const topMenu = document.getElementById("top-menu");

  //画面下部メニューエリア:PC
  const bottomMenu = document.getElementById("bottom-menu");

  //GSAPでのスクロールのeasing
  const gsapScrollEasing = "power2.out";

  //GSAPでのスクロールのduration
  const gsapScrollDuration = 0.8;

  //GSAPでのscrub値
  const gsapScrubValue = 1;

  //見出し
  const titles = [...document.getElementsByClassName("js-title")];

  const opening = document.getElementById("opening");
  const openingProgressLine = [...document.getElementsByClassName("opening__progress-line")];
  const scrollCircle = document.getElementById("bottom-menu__scroll-circle");
  const indexSection = document.getElementById("index");
  const contentsWrapper = document.getElementById("contents-wrapper");
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
    } else {
      //SP,TAB表示時
      checkWhoValueArea();
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
    }).to(contentsWrapper, {
      x: () => -(contentsWrapper.scrollWidth - window.innerWidth),
      ease: "none",
    }, "horizontalScroll").to(bottomMenu, {
      x: () => (contentsWrapper.scrollWidth - window.innerWidth),
      ease: "none",
    }, "horizontalScroll").to(topMenu, {
      x: () => (contentsWrapper.scrollWidth - window.innerWidth),
      ease: "none",
    }, "horizontalScroll");
  });

  //WhoセクションのGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
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

  //ServciceセクションのGSAP設定:SP
  mm.add("(max-width: 1023px)", () => {
    gsap.to(serviceList1, {
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

    gsap.to(serviceList2, {
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
  });

  //見出しのGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
    titles.forEach(title => {
      gsap.to(title, {
        scrollTrigger: {
          pinnedContainer: contentsWrapper,
          trigger: title,
          start: () => title.getBoundingClientRect().left + window.scrollY - window.innerWidth * 0.6,
          onEnter: () => {
            if (!title.classList.contains("js-showed")) {
              title.classList.add("js-showed");
            }
          },
        }
      });
    });
  });

  //見出しのGSAP設定:SP
  mm.add("(max-width: 1023px)", () => {
    titles.forEach(title => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: "top center",
          onEnter: () => {
            if (!title.classList.contains("js-showed")) {
              title.classList.add("js-showed");
            }
          },
        }
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

  function checkWhoValueArea() {
    const startPoint = whoValue.getBoundingClientRect().top + window.scrollY;
    const currentScroll = window.scrollY;

    if (startPoint <= currentScroll) {
      showValueTextBox();
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

        //DOM削除と追加による調整の為
        ScrollTrigger.refresh();

        //PC表示時、スクロール位置をリストの先頭へ
        if (!isInitialLoading && window.innerWidth >= breakPoint) {
          const targetPosition = newsContents.getBoundingClientRect().left + window.scrollY;
          gsap.to(window, {
            duration: 0.8,
            ease: "power2.out",
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
            }
          });
        }

      })
      .catch(error => {
        console.error("データ取得に失敗しました。", error);
      });
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