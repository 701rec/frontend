import React, { useEffect, useRef } from "react";

interface PanoViewerProps {
  image: string;
  width?: string;
  height?: string;
}

const PanoViewer: React.FC<PanoViewerProps> = ({
  image,
  width = "100%",
  height = "100%",
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadPannellum() {
      if (viewerRef.current) {
        const pannellum: any = await import("pannellum");

        pannellum.viewer(viewerRef.current, {
          type: "equirectangular",
          panorama: image,
          autoLoad: true,
          hfov: 100,
        });
      }
    }

    if (typeof window !== "undefined") {
      loadPannellum();
    }

    return () => {};
  }, [image]);

  return (
    <div
      ref={viewerRef}
      style={{ width: width, height: height, background: "#000" }}
      className="pannellum-viewer"
    />
  );
};

export default PanoViewer;
