const accesskey = "pXEQ4Q9yqOkvBnBdXw9MaJ_L5MTYqeIpVdwfBG17UqU";

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const container = document.querySelector(".container");
const showmore = document.getElementById("show-more");

let inputData = '';
let page = 1;

async function searchImages() {
    inputData = inputE1.value.trim();
    if (!inputData) return; // Prevent search on empty input

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        container.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("subcontainers");

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        container.appendChild(imageWrapper);
    });

    page++;

    if (data.total_pages > page) {
        showmore.style.display = "block";
    } else {
        showmore.style.display = "none";
    }
}

formE1.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showmore.addEventListener("click", () => {
    searchImages();
});
