import { useEffect } from "react";

const useGoogleAnalytics = (trackingId) => {
  useEffect(() => {
    // Add the Google Analytics script to the document
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize the Google Analytics with the provided tracking ID
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", trackingId);
  }, [trackingId]);
};

export default useGoogleAnalytics;
