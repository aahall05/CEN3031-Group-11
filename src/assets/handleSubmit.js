const handleSubmit = (event, username, password, masterList, setErrorMessage) => {
    event.preventDefault();

    // Trim whitespace from inputs
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Edge Case 1: Empty input fields
    if (!trimmedUsername || !trimmedPassword) {
        setErrorMessage('Username and password cannot be empty.');
        return;
    }

    // Edge Case 2: Whitespace-only fields
    if (trimmedUsername.length === 0 || trimmedPassword.length === 0) {
        setErrorMessage('Username and password cannot contain only whitespace.');
        return;
    }

    // Edge Case 3: Truncate very long usernames or passwords
    if (trimmedUsername.length > 30 || trimmedPassword.length > 30) {
        setErrorMessage('Username and password cannot exceed 30 characters.');
        return;
    }

    // Edge Case 4: Protect against SQL injection (e.g., "DROP TABLE")
    const forbiddenPatterns = /drop\s+table|delete\s+from|insert\s+into|update\s+set/i;
    if (forbiddenPatterns.test(trimmedUsername) || forbiddenPatterns.test(trimmedPassword)) {
        setErrorMessage('Invalid input detected.');
        return;
    }

    // Check if the username and password exist in the master list
    const user = masterList.find(
        (user) => user.username === trimmedUsername && user.password === trimmedPassword
    );

    if (user) {
        alert('Login successful!');
        setErrorMessage(''); // Clear any previous error messages
        // Redirect or perform further actions here
    } else {
        setErrorMessage('Invalid username or password.');
    }
};

export default handleSubmit;