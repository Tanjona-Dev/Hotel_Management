import { useEffect } from "react";

export function useClickOutside(reference, callback) {
  useEffect(() => {
    const outSideFunction = (e) => {
      if (reference.current && !reference.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", outSideFunction);
    ()=> document.removeEventListener("mousedown", outSideFunction)
  }, [reference, callback]);
}
