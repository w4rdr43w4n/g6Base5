import { FC, useState, useEffect } from "react";
import "../styles/srch_components.css";
import { Import } from "@/app/api/search_utils/literature_utils";

interface props {
  onExit: (e: boolean) => void;
  onSend: (e: string) => void;
  type: string;
}

const ImportPopup: FC<props> = ({ onExit, onSend, type }) => {
  const [collectedItems, setCollectedItems] = useState([]);
  function handleExitBtn(e: any) {
    onExit(false);
  }
  useEffect(() => {
    const Fetch = async () => {
      const resp = await Import("ward", "wardrawan535@gmail.com", type);
      console.log(resp.data.imports);
      setCollectedItems(resp.data.imports);
    };
    Fetch();
  }, []);
  function handleSelect(title:string) {
    const selected:any = collectedItems.filter((item:any)=> item.title === title)
    onSend(selected[0].content)
    onExit(false)
  }
  return (
    <section className="custom-lr">
      <section className="imp">
        <h1>Saved works</h1>
        <div>
          {collectedItems.map((e: any, i) => (
            <button onClick={()=>handleSelect(e.title)} key={i}>
              <p>Title:{e.title}</p>{" "}
              <p className="content">Content:{e.content}</p>{" "}
            </button>
          ))}
        </div>
        <button onClick={handleExitBtn} className="exit-lr-btn">
          EXIT
        </button>
      </section>
    </section>
  );
};

export default ImportPopup;
