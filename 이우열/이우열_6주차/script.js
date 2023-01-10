const banners = document.querySelectorAll('.banner');
const bannerTaps = document.querySelectorAll('.banner-tap');
const albums = document.querySelectorAll('.carousel-item');
const albumBox = document.querySelector('.carousel-box');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let bannerCounter = 0;
let albumCounter = 0;

// 첫 번째 캐러셀

// 배너의 left 포지션 변경
const positionBanner = function(banner, index) {
  banner.style.left = `${index * 100}%`;
};

// 배너 별 각각의 포지션 지정
banners.forEach((banner, index) => {
  positionBanner(banner, index);
});

// 배너 움직임 함수
function moveBanner() {
  // 배너의 총 길이 안에서 돌 수 있도록 나머지로 처리
  bannerCounter %= banners.length;
  
  // 카운터에 의해 배너가 X축으로 이동
  banners.forEach((banner) => {
    banner.style.transform = `translateX(-${bannerCounter * 100}%)`;
  });
  
  // 시간을 3초 간격으로 배너가 움직이도록 설정
  setTimeout(moveBanner, 3000);
  
  // 배너를 한 칸 뒤로
  bannerCounter += 1;
}

// 두 번째 캐러셀 (첫 번째와 동일)
const positionAlbum = function(album, index) {
  album.style.left = `${index * 100}%`;
};

albums.forEach((album, index) => {
  positionAlbum(album, index);
});

// 다음 이동 함수
function nextAlbumMove() {
  // 카운터를 증가시킴
  albumCounter += 1;
  albumCounter %= albums.length;
  
  // 즉시 함수를 실행하여 캐러셀 이동
  setTimeout(() => {
    albums.forEach((album) => {
      album.style.transform = `translateX(-${albumCounter * 100}%)`;
    });
  }, 0);
};

// 이전 이동 함수
function prevAlbumMove() {
  // 카운터를 감소시킴
  albumCounter -= 1;
  albumCounter %= albums.length;
  
  // 즉시 함수를 실행하여 캐러셀 이동
  setTimeout(() => {
    albums.forEach((album) => {
      album.style.transform = `translateX(-${albumCounter * 100}%)`;
    });
  }, 0);
};

// 다음 버튼을 눌렀을 시
nextBtn.addEventListener('click', () => {
  // 다음 이동 함수 실행
  nextAlbumMove();
});

// 이전 버튼을 눌렀을 시
prevBtn.addEventListener('click', () => {
  // 이전 이동 함수 실행
  prevAlbumMove();
});

// 자동으로 캐러셀 이동
let autoAlbumMove = setInterval(() => {
  nextAlbumMove();
}, 3000);

// 캐러셀에 마우스가 올려져 있을 경우 함수 실행 중지
albumBox.addEventListener('mouseover', () => {
  clearInterval(autoAlbumMove);
});

// 캐러셀에 마우스가 올려져 있지 않은 경우 함수 다시 실행
albumBox.addEventListener('mouseout', () => {
  autoAlbumMove = setInterval(() => {
    nextAlbumMove();
  }, 3000);
});

moveBanner();