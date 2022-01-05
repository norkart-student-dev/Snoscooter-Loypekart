import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import { createPoi, deletePoi, getPois, updatePoi } from "../ServerConnection";

function usePois() {
    const queryClient = useQueryClient()
    return {
        pois: useInfiniteQuery("pois", getPois, {
            getNextPageParam: (lastPage, pages) => lastPage.nextIndex,
            notifyOnChangeProps: "tracked",
            staleTime: 100000,
            refetchOnWindowFocus: false
        }),
        createPoi: useMutation(createPoi, { onSuccess: () => { queryClient.invalidateQueries("pois") } }),
        updatePoi: useMutation(updatePoi, { onSuccess: () => { queryClient.invalidateQueries("pois") } }),
        deletePoi: useMutation(deletePoi, { onSuccess: () => { queryClient.invalidateQueries("pois") } })
    }
}

export default usePois;