import "./ReadPoiFromCSV.css"
import xlsxParser from "xls-parser";
import usePois from "../../Hooks/usePois";
import proj4 from "proj4";
import kommuner from "../../assets/Kommuner.json"

function ReadPoiFromCSV() {
    const { createPoi } = usePois()

    function readCSV(files) {
        xlsxParser.onFileSelection(files[0])
            .then(data => {
                console.log(data)
                let poityper = {};
                data.poityper.forEach(poitype => {
                    if (poitype.kode) {
                        poityper[poitype.kode] = poitype.tekst;
                    }
                });
                delete data.poityper;
                console.log(poityper)

                for (var category in data) {
                    let type = poityper[category];
                    category = data[category];

                    category.forEach(poi => {
                        let description = { ...poi }
                        delete description.Navn
                        delete description.y
                        delete description.x
                        let descriptionString = '';

                        for (let property in description) {
                            descriptionString += property + ":\t" + description[property] + "\n"
                        }

                        let coords = [parseFloat(poi.y), parseFloat(poi.x)]

                        if (!isNaN(coords[0]) && !isNaN(coords[1])) {
                            console.log(coords)
                            coords = proj4(
                                '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs ',
                                '+proj=longlat +datum=WGS84 +no_defs ',
                                coords);
                            coords = [coords[1], coords[0]]

                            if (!isNaN(coords[0]) && !isNaN(coords[1])) {
                                createPoi.mutateAsync({

                                    "name": poi.Navn,
                                    "type": type,
                                    "info": descriptionString,
                                    "location": {
                                        "type": "Point",
                                        "coordinates": coords
                                    }
                                })
                            }
                            else {
                                console.log("ERROR with Poi creation:")
                                console.log(poi)
                            }

                        }
                        else {
                            console.log("ERROR with projection:")
                            console.log(poi)
                        }
                    })
                }
            })
    }

    function getMunicipalitynumberFromName(name) {
        let kommune = kommuner.filter((kommune) => name === kommune.kommunenavn || name === kommune.kommunenavnNorsk)
        console.log(kommune)
        if (kommune.length < 1) {
            return null
        }
        else {
            return parseInt(kommune[0].kommunenummer)
        }
    }

    return (
        <label className="csv-upload">
            <input type="file" onChange={(event) => readCSV(event.target.files)} />
            Last inn Poi fra CSV
        </label>
    )
}

export default ReadPoiFromCSV;