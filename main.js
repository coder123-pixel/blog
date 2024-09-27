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
