document.addEventListener("DOMContentLoaded", function () {

  function loadHTML(id, file, callback) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
        if (callback) callback();
      })
      .catch(err => console.log(err));
  }

  loadHTML("navbar", "navbar.html", function () {

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
      });
    }

    document.getElementById("pageName").innerText = document.title;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

      anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        const nav = document.querySelector("nav");
        const navbarHeight = nav ? nav.offsetHeight : 0;

        window.scrollTo({
          top: target.offsetTop - navbarHeight,
          behavior: "smooth"
        });

        history.pushState(null, null, targetId);

        if (navLinks) navLinks.classList.remove("active");

      });

    });

  });

  loadHTML("footer", "footer.html");

  const cursor = document.querySelector(".cursor-hand");

  document.addEventListener("mousemove", e => {
    if (cursor) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    }
  });

  const clickables = document.querySelectorAll(
    "a, button, input, textarea, select, label, [role='button'], .clickable"
  );

  clickables.forEach(el => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("hide-custom-cursor");
    });
    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("hide-custom-cursor");
    });
  });

  document.addEventListener("mouseover", e => {
    if (!e.target.closest("a, button, input, textarea, select")) {
      document.body.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", () => {
    document.body.classList.remove("cursor-hover");
  });

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    document.querySelectorAll(".floating").forEach((el) => {
      const speed = el.getAttribute("data-speed");
      el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  const words = document.querySelectorAll(".word");
  let index = 0;

  setInterval(() => {
    if (words.length > 0) {
      words[index].classList.remove("active");
      index = (index + 1) % words.length;
      words[index].classList.add("active");
    }
  }, 2000);

  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });
  }

  const reveals = document.querySelectorAll(".reveal");

  window.addEventListener("scroll", () => {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  });

  const counters = document.querySelectorAll(".result-box h3");
  let started = false;

  function startCounters() {
    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.count);
      let count = 0;
      const speed = target / 80;

      const update = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  }

  window.addEventListener("scroll", () => {
    const results = document.getElementById("results");
    if (!started && results && results.getBoundingClientRect().top < window.innerHeight) {
      startCounters();
      started = true;
    }
  });

  const stat_counters = document.querySelectorAll(".counter");

  stat_counters.forEach(stat_counters => {
    const target = +stat_counters.getAttribute("data-target");
    const speed = 200;

    const updateCount = () => {
      const count = +stat_counters.innerText;
      const increment = target / speed;

      if (count < target) {
        stat_counters.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 15);
      } else {
        stat_counters.innerText = target + "+";
      }
    };

    updateCount();
  });

  const statElements = document.querySelectorAll(".card h3");

  statElements.forEach(statValue => {
    const updateStat = () => {
      const target = +statValue.innerText.replace(/\D/g, '');
      let current = 0;
      const speed = 50;

      const increment = target / speed;

      const animate = () => {
        current += increment;

        if (current < target) {
          statValue.innerText = Math.ceil(current) + "+";
          requestAnimationFrame(animate);
        } else {
          statValue.innerText = target + "+";
        }
      };

      animate();
    };

    updateStat();
  });

  const track = document.querySelector(".scroll-track");
  const section = document.querySelector(".case-study-scroll");

  window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();

    const scrollProgress = -rect.top / (section.offsetHeight - window.innerHeight);

    const maxMove = track.scrollWidth - window.innerWidth;

    const moveX = maxMove * scrollProgress;

    track.style.transform = `translateX(-${moveX}px)`;
  });

});

function updateViewer() {
  const caseData = cases[currentCaseIndex];

  document.getElementById("caseImage").src =
    caseData.images[currentImageIndex];

  document.getElementById("caseTitle").innerText =
    caseData.title;

  document.getElementById("imageCount").innerText =
    (currentImageIndex + 1) + " / " + caseData.images.length;
}

const cases = [
  {
    title: "Meal Berg",
    images: [
      "images/caseStudy/BTD_page-0012.jpg",
      "images/caseStudy/BTD_page-0013.jpg",
      "images/caseStudy/BTD_page-0014.jpg",
      "images/caseStudy/BTD_page-0015.jpg",
      "images/caseStudy/BTD_page-0016.jpg"
    ]
  },
  {
    title: "Vedansh Craft",
    images: [
      "images/caseStudy/BTD_page-0017.jpg",
      "images/caseStudy/BTD_page-0018.jpg",
      "images/caseStudy/BTD_page-0019.jpg",
      "images/caseStudy/BTD_page-0020.jpg"
    ]
  },
  {
    title: "Think Tank Interiors",
    images: [
      "images/caseStudy/BTD_page-0021.jpg",
      "images/caseStudy/BTD_page-0022.jpg",
      "images/caseStudy/BTD_page-0023.jpg",
      "images/caseStudy/BTD_page-0024.jpg"
    ]
  },
  {
    title: "Country Sports",
    images: [
      "images/caseStudy/BTD_page-0025.jpg",
      "images/caseStudy/BTD_page-0026.jpg",
      "images/caseStudy/BTD_page-0027.jpg"
    ]
  }
];

let currentCaseIndex = 0;
let currentImageIndex = 0;

function openCase(index) {
  currentCaseIndex = index;
  currentImageIndex = 0;

  document.getElementById("caseViewer").classList.add("active");
  updateViewer();
}

function closeCase() {
  document.getElementById("caseViewer").classList.remove("active");
}

function nextCase() {
  const caseData = cases[currentCaseIndex];

  if (currentImageIndex < caseData.images.length - 1) {
    currentImageIndex++;
  } else {
    currentImageIndex = 0; 
  }

  updateViewer();
}

function prevCase() {
  const caseData = cases[currentCaseIndex];

  if (currentImageIndex > 0) {
    currentImageIndex--;
  } else {
    currentImageIndex = caseData.images.length - 1;
  }

  updateViewer();
}