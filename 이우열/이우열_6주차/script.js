const banners = document.querySelectorAll('.banner');
const bannerTaps = document.querySelectorAll('.banner-tap');
const albums = document.querySelectorAll('.carousel-item');
const albumBox = document.querySelector('.carousel-box');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let bannerCounter = 0;
let albumCounter = 0;

// 첫 번째 캐러셀
const positionBanner = function(banner, index) {
  banner.style.left = `${index * 100}%`;
};

banners.forEach((banner, index) => {
  positionBanner(banner, index);
});

function moveBanner() {
  bannerCounter %= banners.length;
  
  banners.forEach((banner) => {
    banner.style.transform = `translateX(-${bannerCounter * 100}%)`;
  });
  
  setTimeout(moveBanner, 3000);
  
  bannerCounter += 1;
}

// 두 번째 캐러셀
const positionAlbum = function(album, index) {
  album.style.left = `${index * 100}%`;
};

albums.forEach((album, index) => {
  positionAlbum(album, index);
});

function nextAlbumMove() {
  albumCounter += 1;
  albumCounter %= albums.length;
  
  albums.forEach((album) => {
    album.style.transform = `translateX(-${albumCounter * 100}%)`;
  });
  
  setTimeout(() => {
    albums.forEach((album) => {
      album.style.transform = `translateX(-${albumCounter * 100}%)`;
    });
  }, 0);
};

function prevAlbumMove() {
  albumCounter -= 1;
  albumCounter %= albums.length;
  
  
  setTimeout(() => {
    albums.forEach((album) => {
      album.style.transform = `translateX(-${albumCounter * 100}%)`;
    });
  }, 0);
};

nextBtn.addEventListener('click', () => {
  nextAlbumMove();
});

prevBtn.addEventListener('click', () => {
  prevAlbumMove();
});

let autoAlbumMove = setInterval(() => {
  nextAlbumMove();
}, 3000);

albumBox.addEventListener('mouseover', () => {
  clearInterval(autoAlbumMove);
});

albumBox.addEventListener('mouseout', () => {
  autoAlbumMove = setInterval(() => {
    nextAlbumMove();
  }, 3000);
});

moveBanner();