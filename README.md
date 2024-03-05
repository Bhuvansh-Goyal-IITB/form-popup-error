# Form Popup Error

Easy to use clean looking form error popup component for React.
![form-popup-error](https://github.com/Bhuvansh-Goyal-IITB/form-popup-error/assets/128956146/066d9238-5188-4744-95ef-5b60ecab40a0)

## Usage

```bash
npm install form-popup-error
```

The index file exports two components the FormError component and the FormErrorItem component.

```tsx
<FormError
    elementList={[
        {
            condition: <error condition>
            message: <error message>
        },
        ...
    ]}

    errorElement={MyComponent}
    // if not specified defaults to FormErrorItem component

    theme="dark" | "light"
    // If not specified then defaults to the system theme

    /*
    the errorElement must be a react functional component
    which accepts the props of type FormErrorItemProps
    */
/>
```
