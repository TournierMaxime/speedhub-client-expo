import { DataState } from "../auth/useHandleAuth"

interface Props {
  data: DataState
  setData: React.Dispatch<React.SetStateAction<DataState>>
}

const useOnChange = ({ data, setData }: Props) => {
  const onChange = ({ name, value }: { name: keyof DataState; value: any }) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return {
    onChange,
  }
}

export default useOnChange
