import Header from "../component/header/Header";
import ZoomMessenge from "../component/zoom/ZoomMessenge";
import { useParams } from "react-router-dom";

export default function Messenger() {
  const id = useParams();
  return (
    <>
      <Header />
      <ZoomMessenge id={id?.id} />
    </>
  );
}
