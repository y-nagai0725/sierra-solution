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
  const whoValueTextBox = gsap.utils.toArray(".who__value-text--box");
  const gnavProgressBar = document.getElementById("gnav__progress-bar");
  const gnavProgressBarProperty = "--bar-scale";
  const newsCardList = document.getElementById("news__card-list");
  const gnavInformationList = document.getElementById("gnav__information-list");
  const sectionList = [...document.getElementsByTagName("section")];
  const footer = document.getElementById("footer");
  const categorySelectBox = document.getElementById("news__select");
  const categoryList = {
    "all": "All",
    "event": "イベント",
    "notice": "お知らせ",
    "release": "プレリリース",
  }

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

  pageTopButton.addEventListener("click", function () {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });

  categorySelectBox.addEventListener("change", function () {
    const selectedCategory = this.value;
    if (categoryList[selectedCategory]) {
      getNewsData(selectedCategory);
    } else {
      console.error("不正な値が選択されています。");
    }
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
        onUpdate: self => {
          gnavProgressBar.style.setProperty(gnavProgressBarProperty, self.progress + " 1");
        },
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
          if (self.progress >= 0.5) {
            showValueTextBox();
          }
        },
      },
    });
  });

  const newsContents = document.getElementById("news__contents");
  const newsScrollTarget = gsap.utils.toArray(".js-news-scroll");

  mm.add("(min-width: 1024px)", () => {
    gsap.to(newsScrollTarget, {
      x: () => (newsContents.getBoundingClientRect().right + window.scrollY) - (newsContents.getBoundingClientRect().left + window.scrollY) -500,
      ease: "none",
      scrollTrigger: {
        pinnedContainer: contentsWrapper,
        trigger: newsContents,
        start: () => newsContents.getBoundingClientRect().left + window.scrollY,
        end: () => newsContents.getBoundingClientRect().right + window.scrollY - 500,
        scrub: true,
        invalidateOnRefresh: true,
        markers: true,
      },
    });
  });


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
        if (!gnavInformationList.classList.contains(addClassName)) {
          //既存の追加されたクラス名を削除
          removeClass(gnavInformationList, baseClassName + ".+", "g");

          //クラス名追加
          gnavInformationList.classList.add(addClassName);
        }
        break;
      } else if ((i === 0 && currentScroll < sectionStartPoint) || (i === targetPointList.length - 2 && sectionEndPoint <= currentScroll)) {
        removeClass(gnavInformationList, baseClassName + ".+", "g");
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

  function getNewsData(category) {
    //----------------------------------
    //実際はapi呼び出しでjsonデータ取得想定
    //----------------------------------

    //今回はカテゴリー別にjsonファイル読み込みで仮実装
    fetch("js/" + category + ".json")
      .then(response => response.json())
      .then(data => {
        //リストの要素削除
        while (newsCardList.firstChild) {
          newsCardList.removeChild(newsCardList.firstChild);
        }

        //リスト作成
        for (let i = 0; i < 5; i++) {
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

      })
      .catch(error => {
        //
      });
  }

  //初期実行処理
  function init() {
    getNewsData("all");
  }

  init();

}, false);