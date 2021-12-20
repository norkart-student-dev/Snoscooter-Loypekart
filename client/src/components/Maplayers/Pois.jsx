import { useCallback } from "react";
import usePois from "../../Hooks/usePois";
import NewPoiDialog from "../NewPoiDialog";
import PoiMarker from "../PoiMarker";
import MarkerClusterGroup from 'react-leaflet-markercluster';


function Pois({ setModal }) {
    const { pois } = usePois();

    const onUpdatePoi = useCallback((poi) => {
        setModal(<NewPoiDialog selectedPoi={poi} onDone={() => setModal(null)} />)
    }, [setModal])
    console.log(pois.data)
    return (
        <>
            <MarkerClusterGroup>
                {pois.isLoading ? null :
                    pois.data.map((item) => (
                        <PoiMarker
                            key={item.id}
                            poi={item}
                            onUpdatePoi={onUpdatePoi}
                        />
                    ))
                }
            </MarkerClusterGroup>

        </>
    )
}

export default Pois;