import { CSSProperties, useEffect, useRef } from "react";
import React from "react";
import { FormErrorProps } from "./types";
import FormErrorItem from "./FormErrorItem";

const style: CSSProperties = {
  position: "relative",
  overflow: "clip",
  transition: "height 100ms ease",
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
        <FormErrorItem
          key={index}
          showCondition={condition}
          errorMessage={message}
          displayComponent={DisplayComponent}
        />
      ))}
    </div>
  );
};
