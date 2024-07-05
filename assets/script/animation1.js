// 헤더 나타나는 애니메이션

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

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
        duration: 0.5,
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
      { y: 100 + i * 400, opacity: 0 }, // 각 이미지에 시작 위치 차별화
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out", // 애니메이션의 가속과 감속 설정
        scrollTrigger: {
          trigger: ".second_section", // 전체 섹션을 트리거로 설정
          start: "top center+=100", // 스크롤이 조금 덜 된 시점에 시작
          end: "top top", // 트리거가 끝나는 시점
          scrub: 1, // 스크롤과 애니메이션을 동기화
        },
        delay: i * 1, // 각 이미지에 시간차 적용
      }
    );
  });
});
