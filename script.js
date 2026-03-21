const cursor = document.querySelector(".cursor-hand");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
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
  words[index].classList.remove("active");

  index = (index + 1) % words.length;

  words[index].classList.add("active");
}, 2000);

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});

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
  if (!started && document.getElementById("results").getBoundingClientRect().top < window.innerHeight) {
    startCounters();
    started = true;
  }
});

const stat_counters = document.querySelectorAll(".counter");

stat_counters.forEach(stat_counters => {
  const target = +stat_counters.getAttribute("data-target");
  const speed = 200; // lower = faster

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