import { DeckGL } from "@deck.gl/react";
import { useState } from "react";
import { MapView } from "@deck.gl/core";
import { createTextLayer } from "./components/textLayer";
import {
  INITIAL_VIEW_STATE,
  MAP_STYLE_DARK,
  MAP_STYLE_LIGHT,
} from "./constants/view";
import { Map } from "react-map-gl/maplibre";
import ZoomControls from "./components/zoomControl";
import ButtonGroup from "./components/ButtonGroup";
import trendingProject from "./data/ProjectButton";
import MessageBox from "./components/messageBox";
import NodeDetailModal from "./components/NodeDetailModal";

function App({ darkMode }: { darkMode: boolean }) {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [nodeBrief, setNodeBrief] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  // Click event of the map text label
  const handleClickEvent = (obj: any) => {
    const { longitude, latitude } = obj;
    setViewState({
      ...viewState,
      longitude,
      latitude,
      zoom: 12,
      transitionDuration: 1000,
    });
    setNodeBrief(obj);
  };

  // Limit the boundary of map navigation
  const handleViewStateChange = ({ viewState }: any): void => {
    const MIN_LATITUDE = -80;
    const MAX_LATITUDE = 80;
    const MIN_LONGITUDE = -180;
    const MAX_LONGITUDE = 180;

    setViewState({
      ...viewState,
      latitude: Math.min(
        Math.max(viewState.latitude, MIN_LATITUDE),
        MAX_LATITUDE
      ),
      longitude: Math.min(
        Math.max(viewState.longitude, MIN_LONGITUDE),
        MAX_LONGITUDE
      ),
    });
  };

  // Import the textLayer and apply text label events
  const textLayer = createTextLayer(handleClickEvent, viewState, darkMode);

  // Set the zoom handler
  const MIN_ZOOM = INITIAL_VIEW_STATE.minZoom;
  const MAX_ZOOM = INITIAL_VIEW_STATE.maxZoom;

  const handleZoomIn = () => {
    if (viewState.zoom >= MIN_ZOOM) {
      setViewState({
        ...viewState,
        zoom: viewState.zoom + 0.5,
        longitude: viewState.longitude + 0.005,
        transitionDuration: 1000,
      });
    }
  };
  const handleZoomOut = () => {
    if (viewState.zoom <= MAX_ZOOM) {
      setViewState({
        ...viewState,
        zoom: viewState.zoom - 0.5,
        longitude: viewState.longitude - 0.005,
        transitionDuration: 1000,
      });
    }
  };

  //Event Triggered by Clicking Nodes
  const nodeClickEvent = () => {
    setModalOpen(true);
    console.log(nodeBrief);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <DeckGL
        views={new MapView({ repeat: false })}
        layers={[textLayer]}
        initialViewState={viewState}
        onViewStateChange={handleViewStateChange}
        controller={{ touchRotate: true, dragRotate: true }}
        getCursor={({ isHovering }) => (isHovering ? "pointer" : "default")}
      >
        <Map
          mapStyle={darkMode ? MAP_STYLE_DARK : MAP_STYLE_LIGHT}
          attributionControl={false}
        />
        <ButtonGroup darkMode={darkMode} objects={trendingProject} />
        <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </DeckGL>
      <MessageBox node={nodeBrief} nodeClickEvent={nodeClickEvent} />
      <NodeDetailModal
        open={modalOpen}
        handleModalClose={handleModalClose}
        node={nodeBrief}
      />
    </>
  );
}

export default App;
