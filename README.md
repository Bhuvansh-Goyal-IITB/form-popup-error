
# Form Popup Error

![form-popup-error](https://github.com/Bhuvansh-Goyal-IITB/form-popup-error/assets/128956146/11374f2c-91dc-456d-afe8-f5e7a36556d8)


## Usage

```bash
npm install form-popup-error
```



The index file exports two components the FormError component and the FormErrorItem component.
```tsx
<FormError
    errorList={[
        {
            condition: <error condition> // boolean
            message: <error message> // string
        },
        ...
    ]}
    
    displayComponent={MyComponent} 

    /* 
    The displayComponent must be a react functional component 
    which accepts the props of type DisplayComponentProps.

    It basically is the compnent that shows the error message,
    it receives the error message in the props 
    */
/>
```

## Example

This example uses  `tailwindcss`, `@heroicons/react` and `react-hook-form`

```tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { FormError, FormErrorDisplayProps } from "form-popup-error";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

type FormType = {
  email: string;
  password: string;
};

const DisplayComponent: React.FC<FormErrorDisplayProps> = ({
  errorMessage,
}) => {
  return (
    <div className="rounded-md p-2 bg-red-800 text-red-100">
      <div className="flex gap-1 items-center">
        <ExclamationCircleIcon className="w-5 h-5" />
        {errorMessage}
      </div>
    </div>
  );
};

const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="w-full text-white"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-sm text-black bg-neutral-100"
            type="email"
            id="email"
            {...register("email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })}
          />
          <FormError
            errorList={[
              {
                condition: errors.email?.type == "required",
                message: "Email is required.",
              },
              {
                condition: errors.email?.type == "pattern",
                message: "Please enter a valid email.",
              },
            ]}
            displayComponent={DisplayComponent}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            className="rounded-sm text-black bg-neutral-100"
            type="password"
            id="password"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/,
            })}
          />
          <FormError
            errorList={[
              {
                condition: errors.password?.type == "required",
                message: "Password is required.",
              },
              {
                condition: errors.password?.type == "minLength",
                message: "Password must be at least 8 characters long.",
              },
              {
                condition: errors.password?.type == "pattern",
                message: `Please choose a stronger password. Try a 
                  mix of letter, numbers, and symbols.`,
              },
            ]}
            displayComponent={DisplayComponent}
          />
        </div>

        <button className="bg-neutral-900 p-1 px-2 rounded-md" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default MyForm;
```
## How it works

The `FormError` component provides a visually appealing and efficient way to display error messages associated with form fields in your React application. Here's an in-depth breakdown of its functionality:

**Error Handling:**

- **Error List:** You define an array of `errorList` objects. Each object specifies the following properties:
   - `condition`: A boolean expression that determines when the error message should be displayed. This typically involves checking the state of the corresponding form field (e.g., using the `errors` object from `react-hook-form`).
   - `message`: The error message that will be shown to the user when the `condition` is true.

- **Conditional Rendering:** The `FormError` component iterates through the provided `errorList` and dynamically renders a separate instance of the `displayComponent` for each error object.

**Error Visibility:**

- **Initial Height:** To ensure a smooth transition when errors appear or disappear, the `FormError` component initially sets its height to match the height of the currently active `displayComponent`. This prevents any abrupt layout changes upon error rendering.

- **Error Display:** Only the `displayComponent` corresponding to the first valid error condition in the `errorList` has a `translateY(0)` style applied, making it visible to the user. Other `displayComponent` instances are positioned off-screen using `translateY(-105%)`.

- **Height Transitions:** A CSS transition is applied to the `height` property of the `FormError` component. This creates a smooth animation when the height needs to adjust (e.g., when errors appear or disappear) to accommodate the active `displayComponent`.

- **No Errors Case:** If no errors are present in the `errorList` (meaning all `condition` expressions evaluate to `false`), the height of the `FormError` component is explicitly set to 0, ensuring that it occupies minimal space and doesn't interfere with the layout.

**Customization:**

- The `displayComponent` is responsible for visually presenting the error message to the user. You have complete control over how this component is styled and structured to match your application's design and branding.
- You can define multiple `errorList` items to handle different error scenarios associated with the same form field.

By combining efficient error handling, conditional rendering, and smooth transitions, the `FormError` component provides a user-friendly and visually appealing way to manage error messages in your React forms.
