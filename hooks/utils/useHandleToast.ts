import { AxiosError } from "axios"
import { Toast } from "toastify-react-native"

const useHandleToast = () => {
  const showSuccess = (error: string) => {
    Toast.success(error)
  }

  const showError = (error: string) => {
    Toast.error(error)
  }

  const handleSuccess = (message: string) => {
    showSuccess(message)
  }

  const handleError = (error: any) => {
    let message = ""

    if (error instanceof AxiosError) {
      if (error.response?.data?.error?.message) {
        message = error.response?.data?.error?.message
        showError(message)
      }
    } else {
      showError(message)
    }
  }
  return {
    handleError,
    handleSuccess,
  }
}

export default useHandleToast
