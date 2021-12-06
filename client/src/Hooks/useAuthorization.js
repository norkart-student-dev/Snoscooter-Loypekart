import { useQuery } from "react-query";
import { isLoggedIn } from "../ServerConnection";

function useAuthorization() {
    return {
        isLoggedIn: useQuery("isLoggedIn", isLoggedIn)
    }
}

export default useAuthorization;