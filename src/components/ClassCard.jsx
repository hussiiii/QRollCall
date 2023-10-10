// ClassCard.jsx
function ClassCard({ classItem, onClassClick }) {
    return (
        <div 
            key={classItem.id} 
            style={{ width: '192px', height: '300px' }} 
            className="my-4 mr-4 bg-red-300 rounded-lg shadow-lg hover:bg-orange-300 transition ease-in-out duration-200 cursor-pointer flex flex-col items-center justify-center p-4"
            onClick={() => onClassClick(classItem)}
        >
            <h3 className="text-xl font-bold">{classItem.name}</h3>
            <p className="overflow-y-auto">{classItem.description}</p>
        </div>
    );
}

export default ClassCard; 