// Api Key, paginations, searchTerm variables
const apiKey = "OGT309TnhynhK7i9Mm2mbcClSl4SmpQ7jwLNh2HPjdHJpcrs2boJtHFt";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;


const imageWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");

const generateHTML = (images) => {
    // Making li of all fetched images and adding them to the existing image wrapper
    imageWrapper.innerHTML += images.map(img =>
        `<li class="card">
            <img src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button><i class="uil uil-import"></i></button>
            </div>
        </li>`
    ).join("");
}

const getImages = (apiURL) => {
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled");

    // Fetching images by Api call with authotization header
    fetch(apiURL, { 
            headers: { Authorization: apiKey }                    
    })
    .then(resp => resp.json())
    .then(data => {       
        generateHTML(data.photos)
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Failed to load images!"));
}

const loadMoreImages = () => {
    currentPage++; // Increment currentPage by 1
    // If searchTerm has some value then call API with search term else call default API
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiURL;
    getImages(apiURL);

}

const loadSearchImages = (e) => {
    // If the search input is empty, set dthe search term to null and return fron here
    if (e.target.value === "") return searchTerm = null;
    // If pressed key is Enter, update the current page, search term and call the getImages
    if(e.key === "Enter"){
        currentPage = 1;
        searchTerm = e.target.value;
        imageWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);


