import { useMutation, useQuery, useQueryClient } from "react-query";
import { isLoggedIn, login, logout } from "../ServerConnection";

function useAuthorization() {
    const queryClient = useQueryClient()

    return {
        isLoggedIn: useQuery("isLoggedIn", isLoggedIn),
        login: useMutation(login, { onSuccess: () => { queryClient.setQueryData("isLoggedIn", true) } }),
        logout: useMutation(logout, { onSuccess: () => { queryClient.invalidateQueries("isLoggedIn") } })
    }
}

export default useAuthorization;