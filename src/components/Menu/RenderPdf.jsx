import { useState } from "react";

const MenuPdf = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative h-[700px] w-full border overflow-hidden rounded-lg bg-gray-50">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="text-center p-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">Loading Menu...</p>
            </div>
          </div>
        )}
        
        <iframe
          src="https://online.fliphtml5.com/qqzjx/onwz/"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          title="Menu PDF"
          onLoad={handleIframeLoad}
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
      
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-400">
          If the menu doesn't load, you can{" "}
          <a 
            href="https://online.fliphtml5.com/qqzjx/onwz/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            view it directly here
          </a>
        </p>
      </div>
    </div>
  );
};

export default MenuPdf; 