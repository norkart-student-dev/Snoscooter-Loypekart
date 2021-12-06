import { useQuery, useMutation, useQueryClient } from "react-query";
import { isVariableStatement } from "typescript";
import { getTracks, updateTrack, deleteTrack, splitTrack } from "../ServerConnection";

function useTracks() {
    const queryClient = useQueryClient()
    // notifyOnChangeProps avoids unnecessary rerenders of the component using the query
    return {
        tracks: useQuery("tracks", getTracks, { notifyOnChangeProps: ["data"] }),
        updateTrack: useMutation(updateTrack, { notifyOnChangeProps: "tracked", onSuccess: (data) => { queryClient.setQueryData(["tracks", { id: data.id }], data) } }),
        deleteTrack: useMutation(deleteTrack, { notifyOnChangeProps: "tracked", onSuccess: () => { queryClient.invalidateQueries("tracks") } })
    }
}

export default useTracks;