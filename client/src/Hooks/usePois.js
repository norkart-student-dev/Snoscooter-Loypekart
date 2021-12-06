import { useMutation, useQuery, useQueryClient } from "react-query";
import { createPoi, deletePoi, getPois, updatePoi } from "../ServerConnection";

function usePois() {
    const queryClient = useQueryClient()
    return {
        pois: useQuery("pois", getPois, { notifyOnChangeProps: "tracked" }),
        createPoi: useMutation(createPoi, { onSuccess: () => { queryClient.invalidateQueries("pois") } }),
        updatePoi: useMutation(updatePoi, { onSuccess: () => { queryClient.invalidateQueries("pois") } }),
        deletePoi: useMutation(deletePoi, { onSuccess: () => { queryClient.invalidateQueries("pois") } })
    }
}

export default usePois;