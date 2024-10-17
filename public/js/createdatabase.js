const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
    host: 'localhost',       // or your host
    user: 'root',   // replace with your MySQL username
    password: 'your_password' // replace with your MySQL password
});

// Connect to the MySQL server
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL!');

    // Query to get the current user
    connection.query('SELECT CURRENT_USER() AS currentUser', (err, results) => {
        if (err) {
            console.error('Error fetching user:', err.message);
        } else {
            console.log('Current MySQL User:', results[0].currentUser);
        }

        // Close the connection
        connection.end();
    });
});
