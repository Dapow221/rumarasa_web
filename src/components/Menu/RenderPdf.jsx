import { CanvasLayer, Page, Pages, Root, TextLayer } from "@anaralabs/lector";
import { GlobalWorkerOptions } from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
 
// Set up the worker
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

const MenuPdf = () => {
  return (
    <Root
      source="/menu_pdf.pdf"
      className="w-full h-[400px] border overflow-hidden rounded-lg"
      loader={<div className="p-4">Loading...</div>}
    >
      <Pages className="p-4">
        <Page>
          <CanvasLayer />
          <TextLayer />
        </Page>
      </Pages>
    </Root>
  );
}

export default MenuPdf