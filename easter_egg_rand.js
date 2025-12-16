document.addEventListener("DOMContentLoaded", () => {
  const eggImage = document.querySelector(".centered-egg-image");

  if (!eggImage) return;

  // Funkce pro generování náhodného čísla v rozsahu [min, max]
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Nastavení bezpečného rozsahu posunu (-25% až +25% od středu)
  const randomX = getRandomArbitrary(-25, 25);
  const randomY = getRandomArbitrary(-25, 25);
  const randomRotation = getRandomArbitrary(-30, 30);

  // Aplikace transformace, včetně ZÁKLADNÍHO CENTROVÁNÍ (-50%, -50%)
  // Zbytek posunu je náhodný (randomX, randomY)
  eggImage.style.transform = `translate(calc(-50% + ${randomX}vw), calc(-50% + ${randomY}vh)) rotate(${randomRotation}deg)`;

  // Nastavení plynulosti pro HOVER efekt (scaling a glow)
  eggImage.style.transition = "all 0.3s ease-in-out";
});
