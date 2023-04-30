interface User {
    id?: number;
    username: string;
    email?: string;
    password?: string;
    profilePictureUrl: string;
    createdAt?: string;
    updatedAt?: string;
    isFriend?: boolean;
}

export default User;