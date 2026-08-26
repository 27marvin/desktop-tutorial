const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".site-nav a");
const cursor = document.querySelector(".cursor-glow");
const background = document.querySelector(".scroll-background");
let animationFrame;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.16 },
);

revealItems.forEach((item) => observer.observe(item));

const sections = document.querySelectorAll("main section");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) =>
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`,
        ),
      );
    });
  },
  { rootMargin: "-45% 0px -45% 0px" },
);

sections.forEach((section) => sectionObserver.observe(section));

const updateBackground = () => {
  const progress =
    window.scrollY /
    Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const rotation = (progress - 0.5) * 8;
  const scale = 1.08 + progress * 0.08;
  const position = 50 + progress * 10;
  background.style.transform = `rotate(${rotation}deg) scale(${scale})`;
  background.style.backgroundPosition = `${position}% ${50 + progress * 5}%`;
};

window.addEventListener(
  "scroll",
  () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(updateBackground);
  },
  { passive: true },
);

updateBackground();

window.addEventListener("mousemove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.style.width = "34px";
    cursor.style.height = "34px";
  });
  link.addEventListener("mouseleave", () => {
    cursor.style.width = "16px";
    cursor.style.height = "16px";
  });
});

document.querySelectorAll(".project").forEach((project) => {
  project.addEventListener("click", (event) => {
    if (!window.matchMedia("(max-width: 720px)").matches) return;
    const image = project.querySelector(".project-image");
    if (project.classList.contains("touch-active")) return;

    event.preventDefault();
    document
      .querySelectorAll(".project.touch-active")
      .forEach((activeProject) => {
        activeProject.classList.remove("touch-active");
        activeProject.querySelector(".project-image").style.opacity = "";
        activeProject.querySelector(".project-image").style.transform = "";
      });
    project.classList.add("touch-active");
    image.style.opacity = "0.95";
    image.style.transform = "translateY(0) scale(1) rotate(4deg)";
  });
});
