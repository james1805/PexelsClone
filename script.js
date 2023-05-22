const apiKey = "OGT309TnhynhK7i9Mm2mbcClSl4SmpQ7jwLNh2HPjdHJpcrs2boJtHFt";
const perPage = 15;
let currentPage = 1;


const imageWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");

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

    // Fetching images by Api call eith authotization header
    fetch(apiURL, 
        { 
            headers: {
                    Authorization: apiKey
                }                    
        }
    )
    .then(resp => resp.json())
    .then(data => {       
        generateHTML(data.photos)
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    })
}

const loadMoreImages = () => {
    currentPage++; // Increment currentPage by 1
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}?per_page=${perPage}`;
    getImages(apiURL);

}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}?per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);


