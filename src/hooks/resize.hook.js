import { useEffect, useState } from "react";

export const useResize = () => {
    const [width, setWidth] = useState(null);

    useEffect(() => {
      const getWidth = () => setWidth(window.innerWidth);

      window.addEventListener("resize", getWidth);

      return () => window.removeEventListener("resize", getWidth);
    }, []);

    return width;
};
