import jwt_decode from "jwt-decode";

interface jwtPayload {
    uid: number;
    iat: number;
    exp: number;
}

export const getUID = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded: jwtPayload = jwt_decode(token);
    return decoded.uid;
}

