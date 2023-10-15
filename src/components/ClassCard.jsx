// ClassCard.jsx
function ClassCard({ classItem, onClassClick }) {
    return (
        <div 
            onClick={() => onClassClick(classItem)}
            className="my-4 mr-4 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition ease-in-out duration-200 cursor-pointer flex flex-col items-center justify-center p-4 hover:shadow-xl transform hover:-translate-y-1 w-48 h-64"
        >
            <h3 className="text-2xl font-semibold text-gray-700">{classItem.name}</h3>
            <p className="text-gray-600 mt-2">{classItem.description}</p>
        </div>
    );
}

export default ClassCard; 