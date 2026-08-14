document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const progress = document.getElementById("scrollProgress");
  const backTop = document.getElementById("backToTop");
  const year = document.getElementById("year");
  const toast = document.getElementById("toastMessage");

  year.textContent = new Date().getFullYear();

  function onScroll() {
    const scrollTop = window.scrollY;
    nav.classList.toggle("scrolled", scrollTop > 30);
    backTop.classList.toggle("show", scrollTop > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");
    let current = "home";

    sections.forEach(section => {
      if (scrollTop >= section.offsetTop - 140) current = section.id;
    });

    links.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  document.querySelectorAll('.navbar .nav-link').forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navbarNav");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Prevent placeholder project links from looking broken.
  document.querySelectorAll(".disabled-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showToast(`${link.dataset.project} live-demo URL can be added here.`);
    });
  });

  // GitHub Pages cannot run PHP. The form opens the user's default mail client.
  document.getElementById("contactForm").addEventListener("submit", () => {
    showToast("Opening your email application...");
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }
});