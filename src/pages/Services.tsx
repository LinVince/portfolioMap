import ServiceTable from "../components/ServicesTable";
import ServiceTableMobile from "../components/ServicesTableMobile";
import { useMediaQuery } from "@mui/system";
import BackToHomeIcon from "../components/HomeIcon";

function Services() {
  const isDevice = useMediaQuery("(max-width:800px)");
  const HomeStyle = {
    position: "fixed !important",
    bottom: "10px",
    left: "10px",
  };

  return (
    <>
      <BackToHomeIcon style={HomeStyle} />
      {isDevice && <ServiceTableMobile />}
      {!isDevice && <ServiceTable />}
    </>
  );
}

export default Services;
