import { LiensContext } from "../../utils/context";
import { AfficherTableau } from "./afficherTableau";
import { useContext, useEffect, useState } from "react";



function Factures() {
  const { setLiens } = useContext(LiensContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLiens("Factures");
  }, [setLiens]);
  return (
    <div>
      <AfficherTableau page={page} setPage={setPage} />

    </div>
  );
}
export default Factures;
