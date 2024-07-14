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
  gsap.set(".textClip.t1", { left: "10vw", autoAlpha: 0 });
  gsap.set(".textClip.t2", { left: "90vw", autoAlpha: 0 });
  gsap.set(".textClip.t3", { left: "50%", autoAlpha: 0 });
  gsap.set(".textClip.t4", { left: "19vw", autoAlpha: 0 });
  gsap.set(".textClip.t5", { left: "81vw", autoAlpha: 0 });

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
      { left: "10vw", autoAlpha: 0 },
      {
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
      { left: "90vw", autoAlpha: 0 },
      {
        duration: 1,
        left: "81vw",
        autoAlpha: 1,
        ease: "power1.out",
        onStart: () =>
          (document.querySelector(".textClip.t5").textContent = "I"),
      }
    );
  });
}, 2000);

const ani1 = gsap.timeline();
ani1.to(
  ".textClip.t3",
  {
    scale: 10,
    duration: 5,
    backgroundSize: "fixed", // 배경 크기를 10배로 확대
    backgroundPosition: "center center", // 배경 위치 유지
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
  { duration: 1, rotationZ: -45, ease: "power1.out" },
  "t2"
);
ani1.to(
  ".textClip.t5",
  { duration: 1, rotationZ: 45, ease: "power1.out" },
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

// 헤더가 네비에 닿으면 내려오는
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".nav",
  start: "bottom top",
  end: "bottom top",
  onEnter: () => showHeader(),
  onLeaveBack: () => hideHeader(),
  scrub: true, // 스크롤과 함께 애니메이션이 자연스럽게 되도록 설정
  markers: true,
});

function showHeader() {
  gsap.to("#header", {
    top: 0,
    opacity: 1,
    display: "flex",
    ease: "power1.out",
    duration: 0.5,
  });
}

function hideHeader() {
  gsap.to("#header", {
    top: 0,
    opacity: 0,
    display: "none",
    ease: "power1.out",
    duration: 0.5,
  });
}
