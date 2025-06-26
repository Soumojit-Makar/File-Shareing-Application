export const doLoginLocalStorage= (token) => {
    localStorage.setItem("userData", JSON.stringify(token));
};
export const doLogoutLocalStorage = () => {
    localStorage.removeItem("userData");
};
export const isUserLoggedIn = () => {
    return localStorage.getItem("userData") !== null;
};
export const getUserData = () => {
    return JSON.parse(localStorage.getItem("userData"));
};
export const getUserInfo = () => {
    return getUserData().user;
};
export const getToken = () => {
    return getUserData().jwtToken;
};
export const getUserId = () => {
    return getUserData().user.userId;
};
export const getName = () => {
    return getUserData().user.name;
};
export const getEmail = () => {
    return getUserData().user.email;
};
export const getPhone = () => {
    return getUserData().user.phone;
};
export const getGender = () => {
    return getUserData().user.gender;
}
export const getAddress = () => {
    return getUserData().user.address;
}
export const getAbout = () => {
    return getUserData().user.about;
}
