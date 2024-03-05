import React from "react";

export type ErrorElement = {
  condition: boolean;
  message: string;
};

export type DisplayComponentProps = {
  errorMessage: string;
};

export type FormErrorProps = {
  errorList: ErrorElement[];
  displayComponent: React.FC<DisplayComponentProps>;
};
