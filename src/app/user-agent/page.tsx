import { cookies } from "next/headers";
import MobileComponent from "../_components/Mobile";
import DesktopComponent from "../_components/Dekstop";

const HomePage = async () => {
  const cookieStore = cookies();
  const viewport:any = cookieStore.get("viewport"); // Default to 'desktop' if not found
  console.log("viewport", viewport); // Log the viewport value

  return (
    <div>
      {viewport === "mobile" ? <MobileComponent /> : <DesktopComponent />}
    </div>
  );
};

export default HomePage;
