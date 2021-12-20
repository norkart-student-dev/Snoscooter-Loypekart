import { useCallback } from "react";
import useTracks from "../../Hooks/useTracks";
import TrackDialog from "../TrackDialog";
import TrackMarker from "../TrackMarker";

function Tracks({ setModal, selectedTracks }) {
    const { tracks, deleteTrack } = useTracks();

    const onDeleteTrack = useCallback((id) => {
        deleteTrack.mutate(id);
    }, [])

    const onUpdateTrack = useCallback((data) => {
        setModal(<TrackDialog onDone={() => setModal(null)} selectedTracks={data} />)
    }, [])


    console.log("render Tracks")
    console.log(selectedTracks)

    return (
        <>
            {tracks.isLoading ? null :
                tracks.data.map((item) => (
                    <TrackMarker
                        key={item.id}
                        item={item}
                        deleteTrack={onDeleteTrack}
                        updateTrack={onUpdateTrack}
                        selectedTracks={selectedTracks}
                    />
                ))
            }
        </>
    )
}

export default Tracks;