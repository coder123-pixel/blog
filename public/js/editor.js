const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
});

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
});

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const formData = new FormData();
        formData.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formData
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data); // Log the response structure
                if (uploadType === "image") {
                    addImage(data.bannerPath, file.name);
                } else {
                    bannerPath = `${location.origin}/${data.bannerPath}`; 
                    console.log("Banner path set to:", bannerPath); // Log the banner path
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }
            })
            .catch(err => {
                console.error('Upload failed:', err);
                alert("Failed to upload image. Please try again.");
            });
    } else {
        alert("Upload image only.");
    }
}

const addImage = (imagePath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagePath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

import { db } from '/js/firebase.js'; 
import { collection, doc, setDoc } from '/js/firebase.js';

publishBtn.addEventListener('click', () => {
    if (articleField.value.length && blogTitleField.value.length) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        const docName = `${blogTitle}-${id}`;
        const date = new Date();

        console.log('Firestore DB:', db); // Check if db is initialized correctly

        const blogRef = doc(collection(db, "blogs"), docName);
        setDoc(blogRef, {
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
            .then(() => {
                console.log('Blog published successfully!');
                location.href = `/${docName}`;
            })
            .catch((err) => {
                console.error('Error writing document:', err);
                alert("Failed to publish the blog. Please try again.");
            });
    } else {
        alert("Please fill in both the title and the article.");
    }
});
