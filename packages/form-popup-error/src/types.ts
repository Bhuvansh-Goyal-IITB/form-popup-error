import React from "react";

export type ErrorElement = {
  condition: boolean;
  message: string;
};

export type DisplayComponentProps = {
  errorMessage: string;
};

export type FormErrorItemProps = {
  showCondition: boolean;
  errorMessage: string;
  displayComponent: React.FC<DisplayComponentProps>;
};

export type FormErrorProps = {
  errorList: ErrorElement[];
  displayComponent: React.FC<DisplayComponentProps>;
};
