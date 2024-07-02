import { TextLayer } from "@deck.gl/layers";
import { CollisionFilterExtension } from "@deck.gl/extensions";
import nodes from "../data/Nodes";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";



export function createTextLayer(changeViewState: any, viewState: any) {
    const isMobile = useMediaQuery("(max-width: 600px)");
    const fontSize = isMobile? 12:16;
    const noOverlap = true;
   
    const scale = 2 ** viewState.zoom;
    const sizeMaxPixels = (scale / 3) * fontSize;
    const sizeMinPixels = Math.min(scale / 1000, 0.5) * fontSize;

    const darkMode = useSelector((state:any) => state.darkMode)

    return new TextLayer({
        id: "Vocabulary",
        data: nodes, 
        characterSet: "auto",
        fontSettings: {
            buffer: 8,
        },
        fontFamily: "Roboto, Arial, Gill Sans Extrabold, sans-serif",
        fontWeight: "500",
        getPosition: (d) => [d.longitude, d.latitude],
        getText: (d) => d.text,
        getColor: darkMode? [255, 255, 255] : [117, 117, 117],
        getSize: fontSize,
        sizeMaxPixels,
        sizeMinPixels,
        maxWidth: 64 * 12,
        collisionEnabled: noOverlap, 
        getCollisionPriority: 1,
        collisionTestProps: {
            sizeScale: 1,
            sizeMaxPixels: sizeMaxPixels * 5,
            sizeMinPixels: sizeMinPixels * 5,
        },
        extensions: [new CollisionFilterExtension()],
        interactive: true,
        pickable: true,
        onClick: (info) => {
            changeViewState(info.object);
        },
        
       
        
    });
}
