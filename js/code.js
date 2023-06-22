const discos = document.querySelectorAll(".disco");
const audios = document.querySelectorAll("audio");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".navbar");
const btn = document.querySelector(".btn-theme");
const sub = document.querySelector(".sub");
const formControl = document.querySelector(".form-control");

discos.forEach((disco, index) => {
  const audio = audios[index];

  disco.addEventListener("click", () => {
    const isPlaying = !audio.paused && !audio.ended;

    if (isPlaying) {
      audio.pause();
      disco.src = `../img/disco${index + 1}.png`;
    } else {
      stopAllAudios();
      fadeVolumeIn(audio);
      audio.play();
      disco.src = `../img/disco${index + 1}rep.png`;
    }
  });

  audio.addEventListener("ended", () => {
    disco.src = `../img/disco${index + 1}.png`;
  });
});

function stopAllAudios() {
  audios.forEach((audio, index) => {
    const disco = discos[index];
    audio.pause();
    disco.src = `../img/disco${index + 1}.png`;
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
  if (window.matchMedia("(max-width: 992px)").matches) {
    hero.classList.add("mobile");
    nav.classList.remove("navbar");
  } else {
    hero.classList.remove("mobile");
    nav.classList.add("navbar");
  }
}

checkMediaQuery();

window.addEventListener("resize", checkMediaQuery);

btn.addEventListener("click", () => {
  if (formControl.value.length > 0) {
    sub.classList.remove("cript");
    formControl.value = "";
  }
});
