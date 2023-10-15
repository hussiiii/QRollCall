// ClassCard.jsx
function ClassCard({ classItem, onClassClick }) {
    return (
        <div 
            onClick={() => onClassClick(classItem)}
            style={{ width: '240px', height: '340px' }}  // Adjusting to a fixed size
            className="my-4 mr-4 bg-red-300 rounded-lg shadow-lg hover:bg-orange-300 transition ease-in-out duration-200 cursor-pointer flex flex-col items-center justify-center p-4 hover:shadow-xl transform hover:-translate-y-1"
        >
            <h3 className="text-2xl font-semibold text-white">{classItem.name}</h3>
            <p className="text-white mt-2">{classItem.description}</p>
        </div>
    );
}
export default ClassCard; 