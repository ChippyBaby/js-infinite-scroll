const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'fRFywzmuSumK1W4pfVs89KJxC9pj2nnmazjituqFceI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;  
        loader.hidden = true;
    }
}

// Helper function to set Attributes on DOM elements
function setAttributes(element,attributes) {
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM
async function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Creat <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        });
        // Crate image for photo
        const img = document.createElement('img');
        setAttributes(img,{
                src: photo.urls.regular,
                alt: photo.alt_description,
                title: photo.alt_description
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside the imageContainer element 
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photod from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error here
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= (document.body.offsetHeight - 1000) && ready){
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos();