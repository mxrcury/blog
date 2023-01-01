import { useState } from 'react';


const useInput = (...inputNames) => {
    const [value, setValue] = useState(()=>{
        const inputs = inputNames.reduce((allInputs,input)=>{
            return {...allInputs,[input]:{value:'',isError:false,errorMessage:`Please enter a ${input}`}}
        },{}) 
        return inputs
    });
    const onChange = (e) => {
      const inputContent = {
        ...value[e.target.name],
        value:e.target.value
      }
      setValue({
        ...value,
        [e.target.name]: {...inputContent},
      });
    };
    const clearInputs = () => {
      let inputs = {};
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          inputs = {
            ...inputs,
            [key]: {
              value: "",
              isError: false,
              errorMessage: value[key].errorMessage,
            },
          };
        }
      }
      setValue({...inputs});
    };
    const handleInputError = (inputName, isError = true) => {
        const errorInput = {...value,[inputName]:{...value[inputName], isError}}
      setValue({...errorInput});
    }
    const errorCheck = (inputName) => {
        return value[inputName].isError && !value[inputName].value.length
    }
    const handlerErrorMessage = (inputName) => {
        
        return value[inputName].isError && !value[inputName].value.length ? value[inputName].errorMessage : null
    }

    return {
        value,
        onChange,
        clearInputs,
        handleInputError,
        errorCheck,
        handlerErrorMessage
    }
}

export default useInput