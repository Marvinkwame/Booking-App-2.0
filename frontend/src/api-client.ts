import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include", //include any http cookies along the request and set any cookies we get back from the server
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });

    const resBody = await response.json();

    if (!response.ok) {
        throw new Error(resBody.message);
    }
}


export const login = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include", //send the http cookie stored in the cookies
        headers: {
            "Content-Type": "application/json" //telling out backend what to expect
        },
        body: JSON.stringify(formData), //converts it to a string
    })

    const body = await response.json();

    if(!response.ok) {
        throw new Error(body.message);
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include" //send any cookies along the request 
    })

    if (!response.ok) {
        throw new Error("Token Invalid")
    }

    return response.json();
}

export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error("Logout Error")
    }
}

export const createHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/`, {
        method: "POST",
        credentials: "include", //sending the http cookie once the user is logged in
        body: hotelFormData,
    });

    if(!response.ok) {
        throw new Error("Failed to create hotel");
    }

    return response.json(); //contains the hotel we just added to the body of the response

};