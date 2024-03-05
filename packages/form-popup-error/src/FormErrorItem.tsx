import { FormErrorItemProps } from "./types";
import React, { CSSProperties } from "react";

const containerStyle = (hidden: boolean) => {
  return {
    position: "absolute",
    transform: hidden ? "translateY(-105%)" : "translateY(0)",
    transition: "transform 100ms ease",
  } satisfies CSSProperties;
};

export const FormErrorItem: React.FC<FormErrorItemProps> = ({
  showCondition,
  errorMessage,
  displayComponent: DisplayComponent,
}) => {
  return (
    <div style={containerStyle(!showCondition)}>
      <DisplayComponent errorMessage={errorMessage} />
    </div>
  );
};

export default FormErrorItem;
