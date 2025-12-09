document.addEventListener("DOMContentLoaded", () => {
  const floats = document.querySelectorAll(".float-img");

  // Funkce nastaví pevné pozice obrázků
  function setupFloats() {
    // Vzdálenost X/Y od centra (0, 0)

    // Objekty pro snadné odkazování na obrázky v HTML
    const img1 = floats[0]; // Horní levý
    const img2 = floats[1]; // Horní pravý
    const img3 = floats[2]; // Střed levý
    const img4 = floats[3]; // Střed pravý
    const img5 = floats[4]; // Spodní střed

    // --- NASTAVENÍ PEVNÝCH POZIC ---

    // 1. Dva nahoře: (např. Y = -180px)
    img1.dataset.baseX = -120; // X: -120 (levá strana)
    img1.dataset.baseY = -180; // Y: -180 (nahoře)

    img2.dataset.baseX = 120; // X: +120 (pravá strana)
    img2.dataset.baseY = -180; // Y: -180 (nahoře)

    // 2. Dva po stranách (na úrovni jména/tlačítka: Y = 0)
    img3.dataset.baseX = -250; // X: -250 (dále doleva)
    img3.dataset.baseY = 20; // Y: +20 (na úrovni textu)

    img4.dataset.baseX = 250; // X: +250 (dále doprava)
    img4.dataset.baseY = 20; // Y: +20 (na úrovni textu)

    // 3. Jeden dole (víceméně ve středu): (např. Y = +150px)
    img5.dataset.baseX = 0; // X: 0 (přesný střed)
    img5.dataset.baseY = 150; // Y: +150 (dole)

    // Inicializace offsetů
    floats.forEach((img) => {
      img.dataset.offsetX = 0;
      img.dataset.offsetY = 0;
    });

    // Spuštění animace
    animate();
  }

  // Reakce na pohyb myši (Repulze) - TATO ČÁST ZŮSTÁVÁ STEJNÁ
  document.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    floats.forEach((img) => {
      const baseX = parseFloat(img.dataset.baseX);
      const baseY = parseFloat(img.dataset.baseY);

      const dx = centerX + baseX - e.clientX;
      const dy = centerY + baseY - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const force = Math.min(250 / dist, 25);

      const offsetX = dx * force * 0.05;
      const offsetY = dy * force * 0.05;

      img.dataset.offsetX = offsetX;
      img.dataset.offsetY = offsetY;
    });
  });

  // Animace (float a aplikace posunu) - TATO ČÁST ZŮSTÁVÁ STEJNÁ
  function animate() {
    floats.forEach((img) => {
      const baseX = parseFloat(img.dataset.baseX);
      const baseY = parseFloat(img.dataset.baseY);
      const targetOffsetX = parseFloat(img.dataset.offsetX) || 0;
      const targetOffsetY = parseFloat(img.dataset.offsetY) || 0;

      const rotate = Math.sin(Date.now() / 1000 + baseX / 50) * 5;

      img.style.setProperty("--x", baseX + targetOffsetX + "px");
      img.style.setProperty("--y", baseY + targetOffsetY + "px");
      img.style.setProperty("--r", rotate + "deg");
    });
    requestAnimationFrame(animate);
  }

  // Spustit setup a zajistit responzivitu
  setupFloats();
  window.addEventListener("resize", setupFloats);
});
