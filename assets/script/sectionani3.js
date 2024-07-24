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
        end: "bottom bottom",
        scrub: 1,
        markers: true,
        opacity: 1, // 개발 중 시각적 마커 표시 (나중에 제거)
      },
    }
  );
});
