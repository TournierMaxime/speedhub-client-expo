import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react"

// Définir l'interface du contexte
interface ModalContextType {
  isVisible: boolean
  openModal: () => void
  closeModal: () => void
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

// Créer le contexte global avec un type par défaut
const ModalContext = createContext<ModalContextType | undefined>(undefined)

// Provider du contexte
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const openModal = () => setIsVisible(true)
  const closeModal = () => setIsVisible(false)

  return (
    <ModalContext.Provider
      value={{ isVisible, setIsVisible, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
export const useModalAction = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModalAction must be used within a ModalProvider")
  }
  return context
}
