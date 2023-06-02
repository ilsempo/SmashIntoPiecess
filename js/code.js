const discos = document.querySelectorAll(".disco");
const audios = document.querySelectorAll("audio");
const hero = document.querySelector('.hero');
const nav = document.querySelector('.navbar');

discos.forEach((disco, index) => {
  const audio = audios[index];

  disco.addEventListener("click", () => {
    const isPlaying = !audio.paused && !audio.ended;

    if (isPlaying) {
      audio.pause();
      disco.src = `img/disco${index + 1}.png`;
    } else {
      stopAllAudios();
      fadeVolumeIn(audio);
      audio.play();
      disco.src = `img/disco${index + 1}rep.png`;
    }
  });

  audio.addEventListener("ended", () => {
    disco.src = `img/disco${index + 1}.png`;
  });
});

function stopAllAudios() {
  audios.forEach((audio, index) => {
    const disco = discos[index];
    audio.pause();
    disco.src = `img/disco${index + 1}.png`;
  });
}

function fadeVolumeIn(audio) {
  const maxVolume = 1; // Volumen máximo
  const fadeDuration = 3000; // Duración de la transición de volumen en milisegundos

  audio.volume = 0; // Establecer el volumen inicial en 0

  const interval = fadeDuration / 100; // Intervalo de tiempo para ajustar el volumen gradualmente
  let currentVolume = 0;
  const volumeStep = maxVolume / (fadeDuration / interval);

  const fadeInterval = setInterval(() => {
    currentVolume += volumeStep;
    audio.volume = currentVolume;

    if (currentVolume >= maxVolume) {
      audio.volume = maxVolume;
      clearInterval(fadeInterval);
    }
  }, interval);
}


function checkMediaQuery() {
  if (window.matchMedia('(max-width: 992px)').matches) {
    hero.classList.add('mobile');
    nav.classList.remove('navbar');
  } else {
    hero.classList.remove('mobile');
    nav.classList.add('navbar');
  }
}

checkMediaQuery();

window.addEventListener('resize', checkMediaQuery);


const carouselItems = document.querySelectorAll('.carousel .carousel-item');

carouselItems.forEach(function(item) {
  const minPerSlide = 4;
  let next = item.nextElementSibling;

  if (!next) {
    next = item.parentNode.firstElementChild;
  }

  item.appendChild(next.firstElementChild.cloneNode(true));

  for (let i = 0; i < minPerSlide; i++) {
    next = next.nextElementSibling;

    if (!next) {
      next = item.parentNode.firstElementChild;
    }

    item.appendChild(next.firstElementChild.cloneNode(true));
  }
});
