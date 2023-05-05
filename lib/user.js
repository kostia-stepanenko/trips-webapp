const users = ["Maksym", "Kostia", "Olesia"];

exports.getRandomUser = () => {
    return users[Math.floor(Math.random() * users.length)];
};
