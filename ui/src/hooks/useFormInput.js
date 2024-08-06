import { useState } from "react";

export function useFormInput(initValue) {
    const [value, setValue] = useState(initValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return {
        props: {
            value,
            onChange: handleChange,
        },
        setValue
    }
}