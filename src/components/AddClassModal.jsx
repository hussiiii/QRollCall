// AddClassModal.jsx
function AddClassModal({ isOpen, onAddClass, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl mb-4 font-bold text-center">Add Class</h2>
            <form onSubmit={onAddClass} className="space-y-4">
                <div>
                    <label htmlFor="className" className="block text-lg font-medium">Title</label>
                    <input 
                        type="text" 
                        id="className" 
                        name="className" 
                        required 
                        className="mt-2 p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-lg font-medium">Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        className="mt-2 p-2 w-full border rounded-md h-24"
                    ></textarea>
                </div>
                <div className="flex justify-between mt-4">
                    <button 
                        type="submit" 
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out"
                    >
                        Add Class
                    </button>
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition duration-300 ease-in-out"
                    >
                        Exit
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
}

export default AddClassModal; 