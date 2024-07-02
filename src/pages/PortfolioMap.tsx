import { DeckGL } from "@deck.gl/react";
import { useState } from "react";
import { MapView } from "@deck.gl/core";
import { createTextLayer } from "../components/TextLayer";
import {
  INITIAL_VIEW_STATE,
  MAP_STYLE_DARK,
  MAP_STYLE_LIGHT,
} from "../constants/view";
import { Map } from "react-map-gl/maplibre";
import ZoomControls from "../components/ZoomControl";
import ButtonGroup from "../components/ButtonGroup";
import trendingProject from "../data/ProjectButton";
import MessageBox from "../components/MessageBox";
import NodeDetailModal from "../components/NodeDetailModal";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

function PortfolioMap() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [nodeBrief, setNodeBrief] = useState<any>(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  const darkMode = useSelector((state: any) => state.darkMode);

  const isMobile = useMediaQuery("(max-width: 600px)");

  // Click event of the map text label
  const handleClickEvent = (obj: any) => {
    const { longitude, latitude } = obj;
    setViewState({
      ...viewState,
      longitude,
      latitude,
      zoom: 12.6,
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
  const textLayer = createTextLayer(handleClickEvent, viewState);

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

  //Change View as City Button Clicked
  const onCityButtonClick = (obj: any) => {
    const { longitude, latitude } = obj;
    setViewState({
      ...viewState,
      longitude,
      latitude,
      zoom: 12.6,
      transitionDuration: 1000,
    });
  };

  // Close the messageBox
  const MessageBoxClose = () => {
    setNodeBrief(undefined);
  };

  // Set the buttongroup layout
  const layout = isMobile ? "column" : "row";
  return (
    <>
      <DeckGL
        views={new MapView({ repeat: false })}
        layers={[textLayer]}
        initialViewState={viewState}
        onViewStateChange={handleViewStateChange}
        controller={{ touchRotate: false, dragRotate: false }}
        getCursor={({ isHovering }) => (isHovering ? "pointer" : "default")}
      >
        <Map
          mapStyle={darkMode ? MAP_STYLE_DARK : MAP_STYLE_LIGHT}
          attributionControl={false}
        />

        <ButtonGroup
          darkMode={darkMode}
          layout={layout}
          objects={trendingProject}
          onButtonClick={onCityButtonClick}
        />

        <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </DeckGL>
      <MessageBox
        node={nodeBrief}
        nodeClickEvent={nodeClickEvent}
        onClose={MessageBoxClose}
      />
      <NodeDetailModal
        open={modalOpen}
        handleModalClose={handleModalClose}
        node={nodeBrief}
      />
    </>
  );
}

export default PortfolioMap;
