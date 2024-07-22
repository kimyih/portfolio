// 글자 변경을 위한 함수
function changeText(selector, originalText) {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const interval = setInterval(() => {
    document.querySelector(selector).textContent =
      characters[Math.floor(Math.random() * characters.length)];
  }, 100);

  return interval;
}

setTimeout(() => {
  // 원래 글자 저장
  const t1Text = document.querySelector(".textClip.t1").textContent;
  const t2Text = document.querySelector(".textClip.t2").textContent;
  const t3Text = document.querySelector(".textClip.t3").textContent;

  // 글자 변경 시작 (t4와 t5는 제외)
  const t1Interval = changeText(".textClip.t1", t1Text);
  const t2Interval = changeText(".textClip.t2", t2Text);
  const t3Interval = changeText(".textClip.t3", t3Text);

  // 글자 위치 설정
  gsap.set(".textClip.t1", { left: "12.5vw", autoAlpha: 0 });
  gsap.set(".textClip.t2", { left: "87.5vw", autoAlpha: 0 });
  gsap.set(".textClip.t3", { left: "50%", autoAlpha: 0 });
  gsap.set(".textClip.t4", { left: "21vw", autoAlpha: 0 });
  gsap.set(".textClip.t5", { left: "79vw", autoAlpha: 0 });

  // 애니메이션
  let tl = gsap.timeline();
  tl.to(".textClip.t3", {
    duration: 2,
    autoAlpha: 1,
    ease: "power1.out",
  });
  tl.to(
    ".textClip.t1",
    { duration: 2, autoAlpha: 1, ease: "power1.out" },
    "+=0.5"
  );
  tl.to(
    ".textClip.t2",
    { duration: 2, autoAlpha: 1, ease: "power1.out" },
    "-=1.5"
  );

  // 애니메이션 끝나면 글자 변경 중지 및 'I' 복사 애니메이션 시작
  tl.call(() => {
    clearInterval(t1Interval);
    clearInterval(t2Interval);
    clearInterval(t3Interval);
    document.querySelector(".textClip.t1").textContent = "I";
    document.querySelector(".textClip.t2").textContent = "I";
    document.querySelector(".textClip.t3").textContent = "n";

    // t1에서 t4로 'I' 복사 및 이동 애니메이션
    gsap.fromTo(
      ".textClip.t4",
      { left: "12.5vw", autoAlpha: 0 },
      {
        delay: 0.3,
        duration: 1,
        left: "19vw",
        autoAlpha: 1,
        ease: "power1.out",
        onStart: () =>
          (document.querySelector(".textClip.t4").textContent = "I"),
      }
    );

    // t2에서 t5로 'I' 복사 및 이동 애니메이션
    gsap.fromTo(
      ".textClip.t5",
      { left: "87vw", autoAlpha: 0 },
      {
        delay: 0.3,
        duration: 1,
        left: "81vw",
        autoAlpha: 1,
        ease: "power1.out",
        onStart: () =>
          (document.querySelector(".textClip.t5").textContent = "I"),
      }
    );
  });
}, 4000);

const ani1 = gsap.timeline();
ani1.to(
  ".textClip.t3",
  {
    scale: 10,
    duration: 5,
    onUpdate: function () {
      const progress = this.progress();
      const scale = 1 + 9 * progress; // 1에서 10까지 스케일
      gsap.set(".textClip.t3", {
        backgroundSize: `${100 / scale}vw auto`,
        backgroundPosition: "center center",
      });
    },
  },
  "b"
);

ani1.to(".bg", { duration: 3.5, opacity: 1 }, "b");
ani1.to(
  ".textClip.t1",
  { duration: 1.5, backgroundColor: "white", ease: "power1.out" },
  "b"
);
ani1.to(
  ".textClip.t2",
  { duration: 1.5, backgroundColor: "white", ease: "power1.out" },
  "b"
);
ani1.to(
  ".textClip.t4",
  { duration: 1.5, backgroundColor: "white", ease: "power1.out" },
  "b"
);
ani1.to(
  ".textClip.t5",
  { duration: 1.5, backgroundColor: "white", ease: "power1.out" },
  "b"
);

ani1.to(".textClip.t1", { duration: 1, scale: 0.59, ease: "power1.out" }, "t1");
ani1.to(".textClip.t2", { duration: 1, scale: 0.59, ease: "power1.out" }, "t1");
ani1.to(
  ".textClip.t1",
  { duration: 1, rotationZ: -45, ease: "power1.out" },
  "t2"
);
ani1.to(
  ".textClip.t2",
  { duration: 1, rotationZ: 45, ease: "power1.out" },
  "t2"
);

ani1.to(".textClip.t4", { duration: 1, scale: 0.59, ease: "power1.out" }, "t1");
ani1.to(".textClip.t5", { duration: 1, scale: 0.59, ease: "power1.out" }, "t1");
ani1.to(
  ".textClip.t4",
  { duration: 1, rotationZ: 45, ease: "power1.out" },
  "t2"
);
ani1.to(
  ".textClip.t5",
  { duration: 1, rotationZ: -45, ease: "power1.out" },
  "t2"
);

ScrollTrigger.create({
  animation: ani1,
  trigger: "#section1",
  start: "top top",
  end: "+=4000",
  scrub: true,
  pin: true,
  anticipatePin: 1,
  markers: true,
});

// section1 ,2 사이 그라데이션

gsap.registerPlugin(ScrollTrigger);

// 그라데이션 애니메이션
gsap.to(".background-gradient", {
  scaleY: 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".gradient-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

// GSAP 및 ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger 설정
ScrollTrigger.create({
  trigger: ".nav",
  start: "top top",
  end: "bottom top",
  onEnter: () => showHeader(),
  onLeaveBack: () => hideHeader(),
  scrub: true, // 스크롤과 함께 애니메이션이 자연스럽게 되도록 설정
  markers: true,
});

// 헤더 나타나는 애니메이션
function showHeader() {
  gsap.to("#header", {
    top: 0, // 헤더를 화면 상단에 위치시킴
    opacity: 1,
    display: "flex",
    ease: "power1.out",
    duration: 0.5,
  });
}

// 헤더 사라지는 애니메이션
function hideHeader() {
  gsap.to("#header", {
    top: -100, // 헤더를 화면 위쪽으로 이동
    opacity: 0,
    display: "none",
    ease: "power1.out",
    duration: 0.5,
  });
}

// 초기 헤더 위치 설정
gsap.set("#header", { top: -100 });

gsap.registerPlugin(ScrollTrigger);

const introLines = gsap.utils.toArray(".intro-line");

introLines.forEach((line, index) => {
  gsap.fromTo(
    line.children,
    {
      y: "100%",
    },
    {
      y: "0%",
      ease: "none",
      scrollTrigger: {
        trigger: line,
        start: "top bottom-=50",
        end: "top center",
        scrub: 0.5,
        markers: true,
        opacity: 1, // 개발 중 시각적 마커 표시 (나중에 제거)
      },
    }
  );
});

// line__wrap은 애니메이션에서 제외
gsap.set(".line__wrap", { opacity: 1, y: 0 });
// line__wrap은 애니메이션에서 제외
gsap.set(".line__wrap", { opacity: 1, y: 0 });

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
  duration: 10,
  ease: "power1.inOut",
})
  .to(
    ".projectimg_2 img",
    {
      x: "103.1%",
      duration: 10,
      ease: "power1.inOut",
    },
    "<"
  )
  .fromTo(
    ".projecn1_left_wrap",
    { display: "none", opacity: 0 },
    {
      display: "block",
      opacity: 1,
      duration: 10,
      ease: "power1.inOut",
      onStart: () => gsap.set(".projecn1_left_wrap", { display: "block" }),
    },
    "<"
  )
  .fromTo(
    ".project1_right_wrap",
    { display: "none", opacity: 0 },
    {
      display: "block",
      opacity: 1,
      duration: 15,
      ease: "power1.inOut",
      onStart: () => gsap.set(".project1_right_wrap", { display: "block" }),
    },
    "<"
  );

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: "#port_1 .bom",
  start: "top top",
  endTrigger: "html", // 문서의 끝까지 스크롤할 때까지 고정
  end: "bottom bottom",
  pin: "#port_1 .bom .title",
  pinSpacing: false,
  pinType: "fixed", // 고정 타입을 'fixed'로 설정
});
