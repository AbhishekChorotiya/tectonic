import { useEffect, useRef, useState } from "react";
import "./App.css";
import EmblaCarousel from "./components/EmblaCarousel";
import "./css/embla.css";
import { Bookmark, Heart, ShoppingBag, Upload, X } from "lucide-react";
import { Slides } from "./utils/constants/constants";

const OPTIONS = { axis: "y" };
const convertToMs = (seconds) => {
  return seconds ? seconds.replace("s", "") * 1000 : null;
};

function App() {
  const [currProduct, setCurrProduct] = useState(0);
  const [currStory, setCurrStory] = useState(0);
  const intervalRef = useRef(null);
  const product = Slides[currStory];

  const handleNavigation = (type) => {
    if (type === "left") {
      if (currProduct === 0) return;
      setCurrProduct(
        (currProduct - 1 + product.story.length) % product.story.length
      );
    }

    if (type === "right") {
      setCurrProduct((currProduct + 1) % product.story.length);
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrProduct((currProduct + 1) % product.story.length);
    }, convertToMs(product.story[currProduct].length) || 5000);
    return () => clearInterval(intervalRef.current);
  }, [currProduct]);

  return (
    <div className="w-screen  h-screen flex items-center justify-center">
      <div className="lg:w-96 w-full h-full flex relative lg:h-[600px] overflow-hidden bg-red-300">
        <div className="absolute top-0 left-0 w-full h-full bg-black">
          <EmblaCarousel
            handleNavigation={handleNavigation}
            slides={Slides}
            options={OPTIONS}
            setCurrProduct={setCurrProduct}
            setCurrStory={setCurrStory}
            product={product}
            currProduct={currProduct}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full flex h-16 p-3 pt-2">
          <div className="absolute px-4 bottom-full gap-2 left-0 flex w-full h-fit">
            {product?.story?.map((product, index) => {
              return (
                <ProgressBar
                  key={index}
                  currProduct={currProduct}
                  id={product.id}
                  currStory={currStory}
                />
              );
            })}
          </div>
          <button
            onClick={() => {
              window.open(Slides[currStory].story[currProduct].src, "_blank");
            }}
            className="flex font-semibold text-white relative items-center justify-center bg-black/30 w-full border-2 rounded-md border-white h-full"
          >
            VIEW PRODUCTS
          </button>
        </div>
        <div className="w-20 absolute flex flex-col gap-5 bottom-24 right-0">
          <SideIcon title="15.7K" icon={<Heart className="w-8 h-8" />} />
          <SideIcon title="" icon={<Bookmark className="w-8 h-8" />} />
          <SideIcon title="" icon={<Upload className="w-8 h-8" />} />
        </div>
        <div
          onClick={() => {
            window.open(Slides[currStory].story[currProduct].src, "_blank");
          }}
          className="absolute top-10 right-5 flex items-center justify-center p-3 w-12 h-12 bg-white/60 rounded-full"
        >
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="absolute top-10 left-5 flex items-center justify-center p-3 w-12 h-12 bg-white/60 rounded-full">
          <X className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

export default App;

const ProgressBar = ({ currProduct, id, currStory }) => {
  return (
    <div className="w-full relative rounded-full h-1.5 overflow-hidden bg-black/30">
      <div
        style={{
          width: `${currProduct >= id - 1 ? 100 : 0}%`,
          animationDuration:
            Slides[currStory].story[currProduct].type == "image"
              ? "5s"
              : Slides[currStory].story[currProduct].length,
        }}
        className={`bg-white absolute top-0 left-0 rounded-full h-full ${
          currProduct == id - 1 ? "animate-progress" : ""
        }`}
      ></div>
    </div>
  );
};

const SideIcon = ({ title, icon }) => {
  return (
    <div className="flex flex-col text-white font-semibold items-center justify-center gap-1">
      {icon}
      <span className="text-sm">{title}</span>
    </div>
  );
};
