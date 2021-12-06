import useTracks from "../../Hooks/useTracks";
import TrackDialog from "../TrackDialog";
import TrackMarker from "../TrackMarker";


function Tracks({ setModal }) {
    const { tracks, deleteTrack } = useTracks();

    function onDeleteTrack(id) {
        deleteTrack.mutate(id);
    }
    function onUpdateTrack(data) {
        setModal(<TrackDialog onDone={() => setModal(null)} selectedTracks={data} />)
    }
    console.log("render Tracks")
    return (
        <>
            {tracks.isLoading ? null :
                tracks.data.map((item) => (
                    <TrackMarker
                        key={item.id}
                        item={item}
                        deleteTrack={onDeleteTrack}
                        updateTrack={onUpdateTrack}
                    />
                ))
            }
        </>
    )
}

export default Tracks;