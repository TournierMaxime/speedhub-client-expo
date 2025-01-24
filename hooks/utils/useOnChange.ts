import { DataState } from "../auth/interface"

interface Props {
  data: DataState
  setData: React.Dispatch<React.SetStateAction<DataState>>
}

interface Options {
  option: {
    name: string
    value: string
  }
}

const useOnChange = ({ data, setData }: Props) => {
  const onChange = ({ name, value }: { name: keyof DataState; value: any }) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (option: Options["option"]) => {
    setData((prevData) => ({
      ...prevData,
      option: {
        ...prevData.option,
        name: option.name,
        value: option.value,
      },
    }))
  }

  return {
    onChange,
    handleCheckboxChange,
  }
}

export default useOnChange
