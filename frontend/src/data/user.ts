interface User {
    id?: number;
    email: string;
    nickname: string;
    profilePictureUrl: string;
    password: string;
    theme: string;
}

const user1: User = {
email: "janedoe@example.com",
nickname: "janedoe",
profilePictureUrl: "https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg",
password: "myPassword456",
theme: "dark"
};

const user2: User = {
email: "jimmyjohn@example.com",
nickname: "jimmyjohn",
profilePictureUrl: "https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg",
password: "myPassword789",
theme: "light"
};

const user3: User = {
email: "sallysmith@example.com",
nickname: "sallysmith",
profilePictureUrl: "https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg",
password: "myPassword101112",
theme: "dark"
};

const user4: User = {
email: "billybob@example.com",
nickname: "billybob",
profilePictureUrl: "https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg",
password: "myPassword131415",
theme: "light"
};  
const user5: User = {
email: "johndoe@example.com",
nickname: "johndoe",
profilePictureUrl: "https://chapabc.s3.us-west-1.amazonaws.com/defaultProfile.jpeg",
password: "myPassword123",
theme: "light"
};