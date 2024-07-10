document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // header 요소를 선택
  const header = document.querySelector("#header");
  header.style.display = "none"; // 초기에는 숨김

  // ScrollTrigger 설정
  ScrollTrigger.create({
    trigger: ".nav",
    start: "bottom top", // .nav가 화면 상단에 닿았을 때 시작
    end: "bottom+=9999 top", // 트리거가 계속 활성화되도록 끝 지점 설정
    onEnter: () => {
      gsap.to(header, {
        display: "flex",
        opacity: 1,
        y: 0,
        duration: 0.2,
      });
    },
    onLeaveBack: () => {
      gsap.to(header, {
        opacity: 0,
        y: -100,
        duration: 1,
        scrub: 1,
        onComplete: () => (header.style.display = "none"),
      });
    },
  });

  // 이미지 애니메이션 설정
  const images = document.querySelectorAll(".second_container img");

  images.forEach((img, i) => {
    gsap.fromTo(
      img,
      { y: 0 + i * 600, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 8,
        scrollTrigger: {
          trigger: ".second_section",
          start: "top center+=100",
          end: "top top",
          scrub: 1,
        },
        delay: i * 2,
      }
    );
  });

  // .introduction 안의 <span> 요소 애니메이션 설정
  const spans = document.querySelectorAll(".intro_text");

  spans.forEach((span, i) => {
    gsap.fromTo(
      span,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: span,
          start: "top bottom",
          end: "top center",
          scrub: true,
          toggleActions: "play none none reverse",
        },
        delay: i * 0.2,
      }
    );
  });

  // 메인 타임라인 설정
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".second_section",
      start: "top top",
      end: "bottom+=800% top",
      scrub: 1,
      pin: true,
      pinSpacing: true,
      markers: true,
    },
  });

  // 이미지들을 오른쪽으로 이동하는 애니메이션
  tl.to(".projectimg_1 img", {
    x: "206.2%",
    duration: 20,
    ease: "power1.inOut",
  })
    .to(".projectimg_2 img", {
      x: "103.1%",
      duration: 20,
      ease: "power1.inOut"
    }, "<")
    .fromTo(".projecn1_left_wrap",
      { display: "none", opacity: 0 },
      {
        display: "block",
        opacity: 1,
        duration: 20,
        ease: "power1.inOut",
        onStart: () => gsap.set(".projecn1_left_wrap", { display: "block" }),
      },
      "<"
    )
    .fromTo(".project1_right_wrap",
      { display: "none", opacity: 0 },
      {
        display: "block",
        opacity: 1,
        duration: 20,
        ease: "power1.inOut",
        onStart: () => gsap.set(".project1_right_wrap", { display: "block" }),
      },
      "<"
    );


  // 두 번째 단계: 슬라이드 업 애니메이션과 텍스트 변경
  const slides = [".img-slider-item.next._2", ".img-slider-item.next._3", ".img-slider-item.next._4", ".img-slider-item.next._5", ".img-slider-item.next._6"];
  const titles = ["Booking", "Qbit", "REACT.js", "REACT.js", "VUE.js"];
  const projects = ["PROJECT", "PROJECT", "API-MOVIE", "API-MUSIC", "MOVIE"];
  const skills = [
    ["React.js", "Python", "MongoDB"],
    ["Next.js", "Javascript", "MongoDB"],
    ["React.js", "Python", "Youtube-Api"],
    ["React.js", "Python", "Youtube-Api"],
    ["Vue.js", "Vue Router", "Tmdb-Api"]
  ];
  const descriptions = [
    ["Booking은 온라인 예약 시스템으로", "사용자 친화적인 인터페이스를 제공하며,", "다양한 서비스 예약이 가능합니다."],
    ["Qbit은 테이블 위 QR코드로", "손님들에게 손쉬운 주문 경험을 제공하는,", "메뉴 관리 및 오더 시스템입니다."],
    ["Youtube데이터를 활용한", "영화 정보 제공 사이트입니다.", "채널 정보와 영상을 쉽게 검색할 수 있습니다."],
    ["나만의 플레이리스트 사이트는", "YoutubeApi와 Python을 활용한,", "맞춤형 플레이리스트를 제공합니다."],
    ["Tmdb-Api를 활용한", "영화 정보 제공 사이트입니다.", "영화 정보 및 출연진 정보 등 다양하게 제공합니다."]
  ];

  slides.forEach((slide, index) => {
    tl.to(slide, {
      yPercent: -100,
      duration: 40,
      ease: "power1.inOut",
      onUpdate: function () {
        const progress = this.progress();
        if (progress >= 0.33) {  // 이 부분을 추가
          updateContent(index, (progress - 0.33) / 0.67);  // 이 부분을 수정
        }
      }
    });
  });

  function updateContent(index, progress) {
    if (index >= titles.length) return;

    updateElement(".pr1_codepin", titles[index], progress);
    updateElement(".pr1_project", projects[index], progress);

    skills[index].forEach((skill, i) => {
      updateElement(`.pj1_skill_desc${i + 1}`, skill, progress);
    });

    descriptions[index].forEach((desc, i) => {
      updateElement(`.pj1_desc${i + 1}`, desc, progress);
    });
  }

  function updateElement(selector, newText, progress) {
    const element = document.querySelector(selector);
    if (!element) return;

    gsap.to(element, {
      y: -20 * (1 - progress),
      opacity: progress,
      duration: 0.1,
      onUpdate: () => {
        element.textContent = newText;
      }
    });
  }


  // 스크롤 잠금 및 해제 함수
  function lockScroll() {
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.body.style.overflow = "";
  }

  // ScrollTrigger 이벤트 리스너 추가
  ScrollTrigger.create({
    trigger: ".second_section",
    start: "top top",
    end: "bottom bottom",
    onEnter: lockScroll,
    onLeaveBack: unlockScroll,
    onLeave: unlockScroll,
  });

  // 커서 애니메이션
  const cursor = document.querySelector(".cursor");
  const bottomWrap = document.querySelector(".bottom_wrap");

  function updateCursorPosition(e) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    cursor.style.left = `${e.clientX + scrollLeft}px`;
    cursor.style.top = `${e.clientY + scrollTop}px`;
  }

  function handleMouseEnter() {
    cursor.classList.add("visible");
  }

  function handleMouseLeave() {
    cursor.classList.remove("visible");
  }

  document.addEventListener("mousemove", updateCursorPosition);

  bottomWrap.addEventListener("mouseenter", handleMouseEnter);
  bottomWrap.addEventListener("mouseleave", handleMouseLeave);
});