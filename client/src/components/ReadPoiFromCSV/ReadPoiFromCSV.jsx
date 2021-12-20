import "./ReadPoiFromCSV.css"
import xlsxParser from "xls-parser";
import usePois from "../../Hooks/usePois";
import proj4 from "proj4";

function ReadPoiFromCSV() {
    const { createPoi } = usePois()

    function readCSV(files) {
        xlsxParser.onFileSelection(files[0])
            .then(data => {
                console.log(data)
                delete data.poityper
                Object.values(data).forEach(category => {
                    category.forEach(item => {
                        let coords = [parseFloat(item.y), parseFloat(item.x)]
                        if (!isNaN(coords[0]) && !isNaN(coords[1])) {
                            console.log(coords)
                            coords = proj4(
                                '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs ',
                                '+proj=longlat +datum=WGS84 +no_defs ',
                                coords);
                            coords = [coords[1], coords[0]]

                            if (!isNaN(coords[0]) && !isNaN(coords[1])) {
                                createPoi.mutateAsync({

                                    "name": item.Navn,
                                    "type": item.type ? item.type : "",
                                    "comment": item.beskrivelse,
                                    "location": {
                                        "type": "Point",
                                        "coordinates": coords
                                    }
                                })
                            }
                            else {
                                console.log("ERROR with Poi creation:")
                                console.log(item)
                            }

                        }
                        else {
                            console.log("ERROR with projection:")
                            console.log(item)
                        }
                    })
                });
            })
    }

    return (
        <label className="csv-upload">
            <input type="file" onChange={(event) => readCSV(event.target.files)} />
            Last inn Poi fra CSV
        </label>
    )
}

export default ReadPoiFromCSV;