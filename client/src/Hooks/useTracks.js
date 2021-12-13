import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTracks, updateTrack, deleteTrack, splitTrack } from "../ServerConnection";

function useTracks() {
    const queryClient = useQueryClient()
    // notifyOnChangeProps avoids unnecessary rerenders of the component using the query
    return {
        tracks: useQuery("tracks", getTracks, { notifyOnChangeProps: "tracked" }),
        updateTrack: useMutation(updateTrack, { notifyOnChangeProps: "tracked", onSuccess: () => { queryClient.invalidateQueries("tracks") } }),
        deleteTrack: useMutation(deleteTrack, { notifyOnChangeProps: "tracked", onSuccess: () => { queryClient.invalidateQueries("tracks") } })
    }
}

export default useTracks;