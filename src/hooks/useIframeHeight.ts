import { useLayoutEffect } from "react";

export function useIframeHeight() {
  useLayoutEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    const isEmbedded = window.self !== window.top;
    const iframeStyles = document.createElement("style");
    iframeStyles.dataset.iframeHeightReset = "true";
    iframeStyles.textContent = `
      html, body, #root { min-height: 0 !important; height: auto !important; }
      #root .min-h-screen { min-height: 0 !important; }
      #root .h-screen { height: auto !important; }
    `;

    if (isEmbedded) document.head.appendChild(iframeStyles);

    let frameId: number | null = null;
    let lastHeight = -1;

    const sendMeasuredHeight = () => {
      frameId = null;
      const height = Math.ceil(root.getBoundingClientRect().height);
      if (height === lastHeight) return;
      lastHeight = height;
      window.parent.postMessage(
        { type: "iframeHeight", height },
        "*"
      );
    };

    const scheduleHeight = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(sendMeasuredHeight);
    };

    const mutationObserver = new MutationObserver(scheduleHeight);
    mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true });

    const resizeObserver = new ResizeObserver(scheduleHeight);
    resizeObserver.observe(root);

    window.addEventListener("resize", scheduleHeight);
    scheduleHeight();
    void document.fonts?.ready.then(scheduleHeight);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleHeight);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      iframeStyles.remove();
    };
  }, []);
}
