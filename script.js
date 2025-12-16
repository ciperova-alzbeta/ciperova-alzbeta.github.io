// --- KONTROLA IHNED NA ZAČÁTKU SOUBORU ---
// Zjistíme, jestli tělo obsahuje třídu 'easter-body'.
if (document.body && document.body.classList.contains("easter-body")) {
  // Pokud je to Easter Egg stránka, skript se zde ukončí.
  throw new Error("Skript se na Easter Egg stránce nespustí.");
}
// ------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // === 1. PARALLAX KÓD PRO DETAIL PROJEKTU (ODSTRANĚN) ===
  // =========================================================
  /* Původní kód pro Parallax zde byl odstraněn. */

  // =======================================
  // === 2. LIGHTBOX / MODAL FUNKCIONALITA ===
  // =======================================

  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeBtn = document.querySelector(".modal-close");

  // Vybírá nyní pouze .gallery-img, protože .parallax-img již není potřeba
  const galleryImages = document.querySelectorAll(".gallery-img");

  // 2a. Otevírání Modalu
  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      if (modal && modalImage) {
        modal.style.display = "block";
        modalImage.src = this.src;
        document.body.style.overflow = "hidden";
      }
    });
  });

  // 2b. Zavírání Modalu pomocí tlačítka křížku
  if (closeBtn) {
    closeBtn.onclick = function () {
      modal.style.display = "none";
      document.body.style.overflow = "";
    };
  }

  // 2c. Zavírání Modalu kliknutím mimo obrázek
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  };

  // ===============================================
  // === 3. KÓD PRO LANDING PAGE (float animace) ===
  // ===============================================

  if (document.body.classList.contains("landing")) {
    const floats = document.querySelectorAll(".float-img");

    if (floats.length === 0) {
      return;
    }

    if (floats.length < 5) {
      console.warn(
        "Chyba: Na Landing Page bylo nalezeno méně než 5 .float-img."
      );
    }

    function setupFloats() {
      const img1 = floats[0];
      const img2 = floats[1];
      const img3 = floats[2];
      const img4 = floats[3];
      const img5 = floats[4];

      // --- NASTAVENÍ PEVNÝCH POZIC (bezpečné) ---
      if (img1) {
        img1.dataset.baseX = -120;
        img1.dataset.baseY = -180;
      }
      if (img2) {
        img2.dataset.baseX = 120;
        img2.dataset.baseY = -180;
      }
      if (img3) {
        img3.dataset.baseX = -250;
        img3.dataset.baseY = 20;
      }
      if (img4) {
        img4.dataset.baseX = 250;
        img4.dataset.baseY = 20;
      }
      if (img5) {
        img5.dataset.baseX = 0;
        img5.dataset.baseY = 150;
      }

      // Inicializace offsetů
      floats.forEach((img) => {
        img.dataset.offsetX = 0;
        img.dataset.offsetY = 0;
      });
      animate();
    }

    // Reakce na pohyb myši (Repulze)
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

    // Animace (float a aplikace posunu)
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

    setupFloats();
    window.addEventListener("resize", setupFloats);
  }
});
