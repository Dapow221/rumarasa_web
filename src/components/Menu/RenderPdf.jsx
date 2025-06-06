import { CanvasLayer, Page, Pages, Root, TextLayer } from "@anaralabs/lector";
import { GlobalWorkerOptions } from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import { useState, useEffect } from "react";

// Set up the worker
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

const MenuPdf = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsMobile(width < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  return (
    <div className="w-full max-w-4xl mx-auto">
      <Root
        source="/menu_pdf.pdf"
        className='h-[700px] w-full border overflow-hidden rounded-lg'
        loader={
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">Loading PDF...</p>
            </div>
          </div>
        }
      >
        <Pages>
          <Page>
            <CanvasLayer />
            <TextLayer />
          </Page>
        </Pages>
      </Root>
      
      {/* Mobile-specific controls */}
      {isMobile && (
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            Pinch to zoom • Swipe to navigate
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuPdf;