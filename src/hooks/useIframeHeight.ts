import { useEffect } from "react";

export function useIframeHeight() {
  useEffect(() => {
    const sendHeight = () => {
      window.parent.postMessage(
        { type: "iframeHeight", height: document.body.scrollHeight },
        "*"
      );
    };

    // Send on load
    sendHeight();

    // Observe content changes
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    // Also on resize
    window.addEventListener("resize", sendHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sendHeight);
    };
  }, []);
}
