"use strict";
/* ===== EDIT YOUR INFO HERE ===== */
const PROJECTS = [
  { name: "BloxCrow", role: "Head Staff", image: "" },
  { name: "BetPet", role: "Head Staff", image: "" },
  { name: "Pantry", role: "Co-Owner", image: "" },
  { name: "5Stars Stocks and Deals", role: "Staff", image: "" },
  { name: "Trouble's Stocks and Deals", role: "Staff", image: "" },
  { name: "1AM Stocks and Deals", role: "Staff", image: "" },
  { name: "Kraken.gg", role: "Site Developer & Server Manager", image: "" },
  { name: "Waves Stocks", role: "Founder", image: "" }
  // Add a picture: put the file in /images and set image: "images/bloxcrow.png"
];
const CONTACTS = [
  { label: "Discord: YOUR_USERNAME", href: "https://discord.com/users/YOUR_DISCORD_ID" },
  { label: "Email me", href: "mailto:you@example.com" }
];
/* ================================= */

const grid = document.getElementById("grid");
PROJECTS.forEach(p => {
  const card = document.createElement("article");
  card.className = "card";
  const pic = document.createElement("div");
  pic.className = "pic";
  const showEmpty = () => { pic.textContent = "No pictures found"; };
  if (p.image) {
    const img = new Image();
    img.alt = p.name + " picture";
    img.loading = "lazy";
    img.onerror = showEmpty;
    img.src = p.image;
    pic.appendChild(img);
  } else showEmpty();
  const body = document.createElement("div");
  body.className = "body";
  const h = document.createElement("h3"); h.textContent = p.name;
  const r = document.createElement("span"); r.className = "role"; r.textContent = p.role;
  body.append(h, r);
  card.append(pic, body);
  grid.appendChild(card);
});

const contacts = document.getElementById("contacts");
CONTACTS.forEach(c => {
  const a = document.createElement("a");
  a.className = "btn"; a.textContent = c.label; a.href = c.href;
  a.target = "_blank"; a.rel = "noopener noreferrer";
  contacts.appendChild(a);
});

/* Tabs */
const btns = document.querySelectorAll(".nav-btn"), tabs = document.querySelectorAll(".tab");
btns.forEach(b => b.addEventListener("click", () => {
  btns.forEach(x => x.classList.toggle("active", x === b));
  tabs.forEach(t => t.classList.toggle("active", t.id === b.dataset.tab));
}));

/* Yellow cursor glow */
if (!matchMedia("(hover: none)").matches) {
  const ring = document.createElement("div"); ring.className = "cursor-ring";
  const dot = document.createElement("div"); dot.className = "cursor-dot";
  document.body.append(ring, dot);
  let mx = 0, my = 0, rx = 0, ry = 0, rs = 1, target = 1, started = false;
  addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    if (!started) { rx = mx; ry = my; started = true; loop(); }
    ring.classList.add("on"); dot.classList.add("on");
    dot.style.left = mx + "px"; dot.style.top = my + "px";
    const hov = !!e.target.closest("button,a,.card");
    ring.classList.toggle("hover", hov); target = hov ? 1.8 : 1;
  });
  document.addEventListener("mouseleave", () => { ring.classList.remove("on"); dot.classList.remove("on"); });
  function loop() {
    rx += (mx - rx) * .2; ry += (my - ry) * .2; rs += (target - rs) * .2;
    ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0) scale(" + rs + ")";
    requestAnimationFrame(loop);
  }
}

/* Loader: gates open, then reveal (shorter on repeat visits) */
const loader = document.getElementById("loader");
let seen = false;
try { seen = sessionStorage.getItem("seen") === "1"; sessionStorage.setItem("seen", "1"); } catch (e) {}
if (seen) loader.remove();
else setTimeout(() => { loader.classList.add("done"); setTimeout(() => loader.remove(), 700); }, 6800);
