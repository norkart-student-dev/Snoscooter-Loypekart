import { useQuery } from "react-query";
import { getTracks } from "../ServerConnection";

function useTracks() {
    return useQuery("fetchPois", getTracks)
}

export default useTracks;