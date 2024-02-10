import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import { HotelSearchResponse, HotelType, PaymentIntentResponse, UserType } from "../../backend/src/shared/types"
import { BookingFormData } from "./Forms/BookingForm/BookingForm";

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

    if (!response.ok) {
        throw new Error(body.message);
    }
}

//Getting the user details
export const getUserDetails = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Error In Fetching User");
    }

    return response.json();
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

    if (!response.ok) {
        throw new Error("Logout Error")
    }
}

export const createHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/`, {
        method: "POST",
        credentials: "include", //sending the http cookie once the user is logged in
        body: hotelFormData,
    });

    if (!response.ok) {
        throw new Error("Failed to create hotel");
    }

    return response.json(); //contains the hotel we just added to the body of the response

};

export const getHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/`, {
        credentials: "include", //send the http cookie along with the fetch request
    })

    if (!response.ok) {
        throw new Error("Failed To Fetch Hotel");
    }

    //we get an arrray of hotels if its success
    return response.json();
}

//single myhotel by id
export const getSingleHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Failed To Fetch")
    }

    return response.json() //contains the data returned

}

//updating a hotel
export const updateHotel = async (hotelFormData: FormData) => {
    const response = await
        fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
            method: 'PUT',
            body: hotelFormData,
            credentials: "include",
        })

    if (!response.ok) {
        throw new Error("Failed To Update")
    }

    return response.json()

}

//fetch search hotels api
export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
}

export const getSearchHotel = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("sortOption", searchParams.sortOption || "")
    queryParams.append("maxPrice", searchParams.maxPrice || "")

    //cos they are arrays so we append them
    searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility))

    searchParams.types?.forEach((type) => queryParams.append("types", type))

    searchParams.stars?.forEach((star) => queryParams.append("stars", star))

    const response = await fetch(`${API_BASE_URL}/api/hotel/search?${queryParams}`)

    if (!response.ok) {
        throw new Error("Failed To Get Searched Hotels")
    }

    return response.json()
}

//get a single hotel by id
export const getSingleHotel = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotel/${hotelId}`);
    if (!response.ok) {
        throw new Error("Failed To Get Hotel");
    }

    return response.json()
}

//stripe payment intent
export const createPaymentIntent = async (hotelId: string, nightsToSpend: string): Promise<PaymentIntentResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/hotel/${hotelId}/bookings/payment-intent`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ nightsToSpend }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw new Error("Failed to create payment intent")
    }

    return response.json()
}

//create a booking
export const createBooking = async (formData: BookingFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotel/${formData.hotelId}/bookings`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw new Error("Error in creating booking")
    }
}

export const getBookings = async () : Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Error fetching bookings")
    }

    return response.json()
}