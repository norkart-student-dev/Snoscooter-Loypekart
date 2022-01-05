import { useCallback, memo } from "react";
import useTracks from "../../Hooks/useTracks";
import TrackDialog from "../TrackDialog";
import TrackMarker from "../TrackMarker";

function Tracks({ setModal, selectedTracks }) {
    const { tracks, deleteTrack, splitTrack } = useTracks();

    const onDeleteTrack = useCallback((id) => {
        deleteTrack.mutate(id);
    }, [])

    const onUpdateTrack = useCallback((data) => {
        setModal(<TrackDialog onDone={() => setModal(null)} selectedTracks={data} />)
    }, [])

    const onSplitTrack = useCallback((item, coords) => {
        console.log(coords)
        splitTrack.mutate({ item, coords })
    }, [])

    console.log("rendering tracks")

    return (
        <>
            {tracks.isLoading ? null :
                tracks.data.map((item) => (
                    <TrackMarker
                        key={item.id}
                        item={item}
                        deleteTrack={onDeleteTrack}
                        updateTrack={onUpdateTrack}
                        splitTrack={onSplitTrack}
                        selectedTracks={selectedTracks}
                    />
                ))
            }
        </>
    )
}

export default memo(Tracks);