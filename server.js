const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
});

// Serve the editor.html file
app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
});

// Handle file uploads
app.post('/upload', (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    let file = req.files.image;
    let date = new Date();

    // Generate a unique image name
    let imagename = `${date.getDate()}_${date.getTime()}_${file.name}`; // Added underscore for clarity
    let uploadPath = path.join(__dirname, 'public/uploads', imagename);

    // Move the file to the specified upload path
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message }); // Send structured error response
        } else {
            // Return the relative path of the uploaded image
            res.json({ bannerPath: `uploads/${imagename}` }); // Return as JSON
        }
    });
});

app.get("/:blog", (req, res) =>{
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.use((req,res) =>{
    res.json("404");
})


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});
