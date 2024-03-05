import { CSSProperties, useEffect, useRef } from "react";
import React from "react";
import { FormErrorProps } from "./types";

const style: CSSProperties = {
  position: "relative",
  overflow: "clip",
  transition: "height 100ms ease",
};

const displayContainerStyle = (hidden: boolean) => {
  return {
    position: "absolute",
    transform: hidden ? "translateY(-105%)" : "translateY(0)",

    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
  } satisfies CSSProperties;
};

export const FormError: React.FC<FormErrorProps> = ({
  errorList,
  displayComponent: DisplayComponent,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (errorList.every(({ condition }) => !condition)) {
      if (containerRef.current) containerRef.current.style.height = "0px";
    } else {
      errorList.forEach(({ condition }, index) => {
        const element = containerRef.current?.children[index];
        if (condition && element && containerRef.current) {
          containerRef.current.style.height = `${element.clientHeight}px`;
          return;
        }
      });
    }
  }, [errorList]);

  return (
    <div ref={containerRef} style={style}>
      {errorList.map(({ condition, message }, index) => (
        <div key={index} style={displayContainerStyle(!condition)}>
          <DisplayComponent errorMessage={message} />
        </div>
      ))}
    </div>
  );
};
