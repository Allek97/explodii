import axios from "axios";

export const handleLogOut = async (e, location = "/") => {
    e.preventDefault();
    try {
        await axios.get(`${process.env.REACT_APP_URL}/api/v1/users/logout`, {
            withCredentials: true,
        });
        window.location.assign(location);
    } catch (err) {
        console.log(err.response.data.message);
    }
};
