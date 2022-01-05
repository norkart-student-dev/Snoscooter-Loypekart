import { useCallback, memo } from "react";
import NewPoiDialog from "../NewPoiDialog";
import PoiMarker from "../PoiMarker";


function PoiLayer({ setModal, pois }) {
    console.log("rendering poilayer")

    const onUpdatePoi = useCallback((poi) => {
        setModal(<NewPoiDialog selectedPoi={poi} onDone={() => setModal(null)} />)
    }, [setModal])

    console.log()
    return (
        <>
            {pois.map((item) => (
                <PoiMarker
                    key={item.id}
                    poi={item}
                    onUpdatePoi={onUpdatePoi}
                />
            ))}
        </>
    )
}

export default memo(PoiLayer);