import PhotoGrid from "../components/PhotoGrid";
import nodes from "../data/Nodes";
import BackToHomeIcon from "../components/HomeIcon";

function PhotoGallery() {
  const HomeStyle = {
    position: "fixed",
    bottom: "10px",
    left: "10px",
  };

  return (
    <>
      <BackToHomeIcon style={HomeStyle} />
      <PhotoGrid nodes={nodes} />
    </>
  );
}

export default PhotoGallery;
