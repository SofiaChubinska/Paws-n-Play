const PRODUCTS = [
  {
    id: 1,
    title: "Cat Crunchies",
    cat: "cat",
    price: 20,
    img: "image1.png",
  },

  {
    id: 13,
    title: "dog platess",
    cat: "dogs",
    price: 20,
    img: "image4.png",
  },

  {
    id: 2,
    title: "Scratching Post Mini",
    cat: "cat",
    price: 34,
    img: "image2.png",
  },
  {
    id: 3,
    title: "Plush Mouse Toy",
    cat: "cat",
    price: 149,
    img: "image11.png",
  },
  {
    id: 4,
    title: "Puppy Kibble",
    cat: "dogs",
    price: 299,
    img: "image3.png",
  },
  {
    id: 5,
    title: "Tennis Ball Set",
    cat: "dogs",
    price: 129,
    img: "image12.png",
  },
  {
    id: 6,
    title: "Cozy Dog Bed",
    cat: "dogs",
    price: 1299,
    img: "image13.png",
  },
  {
    id: 7,
    title: "Premium Fish Flakes",
    cat: "fish",
    price: 99,
    img: "image14.png",
  },
  {
    id: 8,
    title: "Aquarium Decor",
    cat: "fish",
    price: 249,
    img: "image15.png",
  },
  {
    id: 9,
    title: "Water Filter",
    cat: "fish",
    price: 699,
    img: "image16.png",
  },
  {
    id: 10,
    title: "Bird Seed Mix",
    cat: "birds",
    price: 139,
    img: "image17.png",
  },
  {
    id: 11,
    title: "Perch & Mirror",
    cat: "birds",
    price: 189,
    img: "image18.png",
  },
  {
    id: 12,
    title: "Colorful Swing",
    cat: "birds",
    price: 159,
    img: "image19.png",
  },
];

const PAGE_SIZE = 6;
const state = { active: "random", q: "", show: PAGE_SIZE };

const grid = document.getElementById("grid");
const tabs = document.querySelectorAll(".tab");
const searchEl = document.getElementById("search");
const moreBtn = document.querySelector(".view-more");

const fallbackNode = (title) => {
  const ph = document.createElement("div");
  ph.className = "ph";
  ph.innerHTML = `<span>${(title || "Item").split(" ")[0]}</span>`;
  return ph;
};

function attachImageFallbacks(scope) {
  scope.querySelectorAll("img.js-img").forEach((img) => {
    img.addEventListener("error", () => {
      const ph = fallbackNode(img.getAttribute("alt"));
      img.replaceWith(ph);
    });
  });
}

function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function render(list) {
  if (!grid) return;
  grid.innerHTML = list
    .map(
      (p) => `
      <article class="card">
        <div class="card__media">
          <img class="js-img" src="${p.img}" alt="${p.title}">
        </div>
        <div class="card__body">
          <h3 class="card__title">${p.title}</h3>
          <div class="card__meta">
            <span class="price">₴${p.price}</span>
            <span class="badge">${p.cat}</span>
          </div>
        </div>
      </article>`
    )
    .join("");

  attachImageFallbacks(grid);
}

function filterCurrent() {
  let list = PRODUCTS.slice();

  if (state.active !== "random") {
    list = list.filter((x) => x.cat === state.active);
  } else if (!state.q) {
    list = shuffle(list);
  }

  if (state.q) {
    const q = state.q.toLowerCase();
    list = list.filter((x) => x.title.toLowerCase().includes(q));
  }

  const total = list.length;
  render(list.slice(0, state.show));
  toggleMore(total);
}

function toggleMore(total) {
  if (!moreBtn) return;
  moreBtn.style.display = total > state.show ? "inline-block" : "none";
}

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");

    state.active = btn.dataset.cat || "random";
    state.show = PAGE_SIZE;
    filterCurrent();
  });
});

searchEl?.addEventListener("input", (e) => {
  state.q = e.target.value.trim();
  state.show = PAGE_SIZE;
  filterCurrent();
});

moreBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  state.show += PAGE_SIZE;
  filterCurrent();
});

document.addEventListener("DOMContentLoaded", filterCurrent);
