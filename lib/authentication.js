const EXPECTED_USERNAME = 'kostia';
const EXPECTED_PASSWORD = 'kostia';

exports.isValidUser = (username, password) => {
    return username === EXPECTED_USERNAME && password === EXPECTED_PASSWORD;
};