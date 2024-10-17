// Import the necessary Firestore functions from the Firebase modular SDK
import { getFirestore, doc, getDoc } from "/js/firebase.js";  // Use these functions from Firebase v9+

// Get Firestore instance
const db = getFirestore();  // This assumes Firebase has been initialized elsewhere in your app

let blogId = decodeURI(location.pathname.split("/").pop());

// Reference to the specific document
let docRef = doc(db, "blogs", blogId);  // Use `doc()` to reference a document

// Fetch the document
getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
        console.log(docSnap.data());
        setupBlog(docSnap.data());  // Correct way to retrieve data
    } else {
        location.replace("/");  // Redirect if the document doesn't exist
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

const setupBlog = (data) => {
    const Banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');

    Banner.style.backgroundImage = `url(${data.bannerImage})`;
    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    // Split the article into lines and filter out empty lines
    data = data.split("\n").filter(item => item.trim().length > 0);
    
    data.forEach(item => {
        if (item.startsWith("#")) {
            // Handle Headers (e.g., # Header, ## Subheader, etc.)
            let hCount = 0;
            let i = 0;
            while (item[i] === '#') {
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount).trim()}</${tag}>`;
        } 
        else if (item.startsWith("![")) {
            // Handle Images (e.g., ![alt](src))
            const regex = /!\[([^\]]+)\]\(([^)]+)\)/;
            const match = item.match(regex);
            if (match) {
                const alt = match[1];  // Extract alt text
                const src = match[2];  // Extract image URL
                ele.innerHTML += `<img src="${src}" alt="${alt}" class="article-image">`;
            }
        } 
        else {
            // Handle Paragraphs
            ele.innerHTML += `<p>${item}</p>`;
        }
    });
}
