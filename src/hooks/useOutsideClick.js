import { useEffect, useRef } from "react";

function useOutsideClick(action, listenInCapturingPhase = true) {
  const modalRef = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          action();
        }
      }
      //  adding 'true' as the 3rd argument to addEvListener - // ! this will make it listen in CAPTURING PHASE instead of bubbling phase
      document.addEventListener("click", handleClick, listenInCapturingPhase);

      return () =>
        document.removeEventListener(
          "click",
          handleClick,
          listenInCapturingPhase
        );
    },
    [action, listenInCapturingPhase]
  );

  return modalRef;
}

export default useOutsideClick;
