// Define the constants separately
const MAX_ZOOM = 16;
const MIN_ZOOM = 1.4;

export const INITIAL_VIEW_STATE = {
    latitude: 25.02434493613632,
    longitude: 121.53592051950127,
    zoom: 12,
    maxZoom: MAX_ZOOM,
    minZoom: MIN_ZOOM,
    pitch: 0,
    bearing: 0,
    transitionDuration: 1000,
};

export const MAP_STYLE_DARK = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json' 
export const MAP_STYLE_LIGHT = 'https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json'
