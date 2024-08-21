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

  const contentsWrapper = document.getElementById("contents-wrapper");
  const serviceDetail1 = document.getElementById("service__detail-1");
  const serviceDetail2 = document.getElementById("service__detail-2");
  const serviceList1 = document.getElementById("service__detail-list-1");
  const serviceList2 = document.getElementById("service__detail-list-2");
  const serviceWrapper = document.getElementById("service__service-wrapper");
  const headerNav = document.getElementById("header__nav");
  const whoValue = document.getElementById("who__value");
  const whoValueTextBox = gsap.utils.toArray(".who__value-text--box");
  const progressBar = document.getElementById("progress-bar");
  const progressBarProperty = "--bar-scale";
  const newsCardList = document.getElementById("news__card-list");
  const information = document.getElementById("information");
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
    if (window.innerWidth >= breakPoint) {
      gnavMenuClose();
    }
  });

  //スクロール時処理
  window.addEventListener("scroll", function () {
    //ウィンドウ幅
    const windowWidth = window.innerWidth;

    if (windowWidth >= breakPoint) {
      //PC表示時
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
      gnavMenuClose();
    } else {
      //開く処理
      gnavMenuOpen();
    }
  });

  //ページトップボタンクリック時処理
  pageTopButton.addEventListener("click", function () {
    window.scroll({
      top: 0,
      behavior: "smooth",
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

  //アンカーリンクのクリック処理設定
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
          },
          onComplete: gnavMenuClose(),
        });
      } else {
        mm.add("(max-width: 1023px)", () => {
          gsap.to(window, {
            duration: 0.8,
            ease: "power2.out",
            scrollTo: {
              y: anchorName,
            },
            onComplete: gnavMenuClose(),
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

  //横スクロールGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
    horizontalScrollTween = gsap.to(contentsWrapper, {
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
        onUpdate: self => {
          progressBar.style.setProperty(progressBarProperty, self.progress + " 1");
        },
      }
    });
    gsap.to(".sub-menu-area", {
      x: () => (contentsWrapper.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        containerAnimation: horizontalScrollTween,
        trigger: contentsWrapper,
        start: "left left",
        end: () => "+=" + (contentsWrapper.scrollWidth - window.innerWidth),
        scrub: true,
        invalidateOnRefresh: true,
      }
    });
  });

  //WhoセクションのGSAP設定:PC
  mm.add("(min-width: 1024px)", () => {
    gsap.to(whoValue, {
      x: 700,
      ease: "none",
      scrollTrigger: {
        pinnedContainer: contentsWrapper,
        containerAnimation: horizontalScrollTween,
        trigger: whoValue,
        start: "left left",
        end: "+=700",
        scrub: true,
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
        containerAnimation: horizontalScrollTween,
        trigger: newsContents,
        start: "left left",
        end: () => "+=" + (newsContents.offsetWidth * 0.6),
        scrub: true,
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

  //イベント処理禁止用
  function noScroll(e) {
    e.preventDefault();
  }

  function gnavMenuOpen() {
    if (!hamburgerButton.classList.contains("js-opened")) {
      hamburgerButton.classList.add("js-opened");
      gnavMenu.classList.add("js-opened");
      main.classList.add("js-blur");
      header.classList.add("js-blur");

      //メニューが開かれているときはスクロール禁止
      document.addEventListener('touchmove', noScroll, { passive: false });
      document.addEventListener('wheel', noScroll, { passive: false });
    }
  }

  function gnavMenuClose() {
    if (hamburgerButton.classList.contains("js-opened")) {
      hamburgerButton.classList.remove("js-opened");
      gnavMenu.classList.remove("js-opened");
      main.classList.remove("js-blur");
      header.classList.remove("js-blur");

      //スクロール禁止を解除
      document.removeEventListener('touchmove', noScroll);
      document.removeEventListener('wheel', noScroll);
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

  function getNewsData(category, canScroll = true) {
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
        }

        //DOM削除と追加による調整の為
        ScrollTrigger.refresh();

        //PC表示時、スクロール位置をリストの先頭へ
        if (canScroll && window.innerWidth >= breakPoint) {
          const targetPosition = newsContents.getBoundingClientRect().left + window.scrollY;
          gsap.to(window, {
            duration: 0.8,
            ease: "power2.out",
            scrollTo: {
              y: targetPosition,
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
    //Newsデータを取得
    getNewsData("all", false);
  }

  init();

}, false);