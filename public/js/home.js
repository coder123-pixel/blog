import { getFirestore, collection, getDocs } from "/js/firebase.js";

const db = getFirestore(); // Firebase initialized elsewhere in the app

const blogsPerPage = 5;
let blogs = [];
let currentPage = 1;

// Function to fetch blogs
const fetchBlogs = async () => {
    try {
        console.log("Fetching blogs...");
        const blogSnapshot = await getDocs(collection(db, "blogs"));
        blogSnapshot.forEach(blog => {
            blogs.push(blog);
        });
        console.log(`Fetched ${blogs.length} blogs`);
        renderBlogs();
        renderPagination();
    } catch (error) {
        console.error("Error fetching blogs:", error.message);
    }
};

// Function to render blogs based on current page
const renderBlogs = () => {
    const blogSection = document.querySelector('.blogs-section');
    const start = (currentPage - 1) * blogsPerPage;
    const end = start + blogsPerPage;
    const blogsToDisplay = blogs.slice(start, end);

    if (blogsToDisplay.length > 0) {
        blogSection.innerHTML = blogsToDisplay.map(createBlog).join('');
    } else {
        blogSection.innerHTML = '<p>No blogs available.</p>';
    }
};

// Function to create a blog card in the UI
const createBlog = (blog) => {
    const data = blog.data();
    const title = data.title ? data.title : "Untitled";
    const article = data.article ? data.article : "No content available.";
    const bannerImage = data.bannerImage ? data.bannerImage : "default-image.jpg";

    return `
<div class="blog-card">
    <img src="${bannerImage}" class="blog-image" alt="${title} Banner">
    <h1 class="blog-title">${title.substring(0, 100) + '...'}</h1>
    <p class="blog-overview">${article.substring(0, 200) + '...'}</p>
    <a href="/${blog.id}" class="btn dark">Read</a>
</div>
    `;
};

// Function to render pagination buttons
const renderPagination = () => {
    const paginationSection = document.querySelector('.pagination');
    paginationSection.innerHTML = ''; // Clear existing buttons
    const pageCount = Math.ceil(blogs.length / blogsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.classList.add('page-button');
        button.dataset.page = i;
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            renderBlogs();
        });
        paginationSection.appendChild(button);
    }
};

// Call fetchBlogs to load blogs when the page loads
document.addEventListener('DOMContentLoaded', fetchBlogs);
