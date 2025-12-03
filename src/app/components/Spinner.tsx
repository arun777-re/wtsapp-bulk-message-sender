import { ImSpinner } from "react-icons/im"

const Spinner = () => {
  return (
    <div role="status"
    className="flex items-center justify-center animate-spin text-white">
        <ImSpinner size={20}/>
    </div>
  )
}

export default Spinner