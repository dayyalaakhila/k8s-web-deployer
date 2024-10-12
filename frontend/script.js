// Define the base URL for the backend API
const BASE_URL = 'http://35.225.254.145'; // Change this to the backend's external IP when needed

// Event listener for user registration form submission
document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            document.getElementById('username').value = ''; // Clear the username field
            document.getElementById('password').value = ''; // Clear the password field
            fetchUsers(); // Refresh the user list
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Error registering user. Please try again.');
    }
});

// Event listener for file upload form submission
document.getElementById('upload-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    const fileInput = document.getElementById('file');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch(`${BASE_URL}/upload`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            fileInput.value = ''; // Clear the input field
            fetchFiles(); // Refresh the files list
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
    }
});

// Function to fetch and display users
async function fetchUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        const users = await response.json();
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = ''; // Clear the current list
        // Reverse the order of users
        users.reverse();
        users.forEach(user => {
            const listItem = document.createElement('div');
            listItem.className = 'list-group-item';
            listItem.textContent = user.username; // Change this based on your user object structure
            usersList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Function to fetch and display uploaded files
async function fetchFiles() {
    try {
        const response = await fetch(`${BASE_URL}/files`);
        const files = await response.json();
        const filesList = document.getElementById('files-list');
        filesList.innerHTML = ''; // Clear the current list
        // Reverse the order of files
        files.reverse();
        files.forEach(file => {
            const listItem = document.createElement('div');
            listItem.className = 'list-group-item';
            listItem.textContent = file; // Change this based on your file object structure
            filesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}

// Fetch users and files on initial load
fetchUsers();
fetchFiles();
