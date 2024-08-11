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
        start: "top bottom-=100",
        end: "top center",
        scrub: 1,
        markers: true,
        opacity: 1, // 개발 중 시각적 마커 표시 (나중에 제거)
      },
    }
  );
});
