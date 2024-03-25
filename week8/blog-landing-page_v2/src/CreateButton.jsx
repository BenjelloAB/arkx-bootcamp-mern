import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// eslint-disable-next-line react/prop-types
export const CreateButton = ({onClick}) => {
    return (
        <button onClick={onClick} type="button" className="ml-4 flex gap-2 items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <p>
                Create A Post
            </p>
            <FontAwesomeIcon icon={faPlus} />
        </button>

    )
}
