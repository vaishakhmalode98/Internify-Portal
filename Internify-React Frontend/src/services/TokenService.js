export function storeToken(tokenValue){
    localStorage.setItem("token",tokenValue);
}

export function getToken(){
    return localStorage.getItem("token");
}

export function removeToken(){
    localStorage.removeItem("token");
}

export function getAuthHeader(){
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}