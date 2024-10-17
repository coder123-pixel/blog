
document.addEventListener('DOMContentLoaded', function() {
    const myElement = document.getElementById('header');
    const collapse = document.querySelectorAll("#header .collapse"); // Use a space to select child elements

    if (myElement) {
        myElement.addEventListener('click', function() {
            collapse.forEach(col => col.classList.toggle("collapse-toggle"));
        });
    } else {
        console.error('Header element not found!');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const search = document.getElementById('searchbx');
    const searchbox = document.querySelectorAll(".searchbox"); // Use a space to select child elements

    if (search) {
        search.addEventListener('click', function() {
            searchbox.forEach(col => col.classList.toggle("collapsesearch"));
        });
    } else {
        console.error('Header element not found!');
    }
});

