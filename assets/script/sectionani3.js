// gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger.create({
//   trigger: "#index .bom",
//   start: "top top",
//   endTrigger: "html", // 문서의 끝까지 스크롤할 때까지 고정
//   end: "bottom bottom",
//   pin: "#index .bom .title",
//   pinSpacing: false,
//   pinType: "fixed", // 고정 타입을 'fixed'로 설정
// });

// 텍스트 아래에서 위로 올라오는 애니메이션
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
        scrub: 1,
        markers: true,
        opacity: 1, // 개발 중 시각적 마커 표시 (나중에 제거)
      },
    }
  );
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
