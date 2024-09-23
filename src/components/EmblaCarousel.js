import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ReactPlayer from "react-player";
import { Volume, VolumeX } from "lucide-react";

const EmblaCarousel = (props) => {
  const {
    slides,
    options,
    setCurrStory,
    setCurrProduct,
    product,
    currProduct,
  } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setCurrStory(emblaApi.selectedScrollSnap());
        setCurrProduct(0);
      };
      emblaApi.on("select", onSelect);

      return () => emblaApi.off("select", onSelect);
    }
  }, [emblaApi]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide relative" key={slide?.id}>
              <div className="embla__slide__number">
                {product?.story[currProduct]?.type === "image" && (
                  <img
                    src={product?.story[currProduct]?.src}
                    alt="storyImage"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                )}
                {product?.story[currProduct]?.type === "video" && (
                  <div className="w-full h-full relative flex">
                    <ReactPlayer
                      url={"https://www.youtube.com/shorts/8O3JsQkz-oc"}
                      muted={isMuted}
                      playing={true}
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
              </div>
              <div className="absolute top-0 flex left-0 w-full h-full">
                <div
                  onClick={() => {
                    props.handleNavigation("left");
                  }}
                  className="w-1/2 h-full"
                />
                <div
                  onClick={() => props.handleNavigation("right")}
                  className="w-1/2 h-full"
                />
              </div>
              {product?.story[currProduct]?.type === "video" && (
                <div
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute top-28 flex items-center justify-center right-5 w-12 h-12 rounded-full bg-white/60"
                >
                  {!isMuted ? (
                    <Volume className="w-7 h-7" />
                  ) : (
                    <VolumeX className="w-7 h-7" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
