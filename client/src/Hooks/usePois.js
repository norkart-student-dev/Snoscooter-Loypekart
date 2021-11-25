import { useQuery } from "react-query";
import { getPois } from "../ServerConnection";

function usePois() {
    return useQuery("fetchPois", getPois)
}

export default usePois;