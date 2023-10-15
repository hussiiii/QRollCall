// ClassDetailsModal.jsx
import QRCode from 'qrcode.react';
import CryptoJS from 'crypto-js';
import firebase from '../../firebase';
import { useState, useEffect } from 'react';

  

function ClassDetailsModal({ isOpen, activeClass, activeTab, onTabChange, onClose }) {
    const [showQR, setShowQR] = useState(false);
    const [qrURL, setQRURL] = useState('');
    const [studentsData, setStudentsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);

    const filteredStudents = studentsData.filter(student => 
        (`${student.lastName}, ${student.firstName}`).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClass = () => {
        // Logic for deleting the class goes here
        // For now, I'll just console.log it
        console.log('Class deleted!');
    }

    const generateDailyURL = (classId) => {
        const secretKey = "YOUR_SECRET_KEY"; // Store this securely and do not expose
        const date = new Date(new Date().getTime() - (8 * 60 * 60 * 1000)).toISOString().slice(0,10); // Format: YYYY-MM-DD
    
        const hash = CryptoJS.HmacSHA256(`${classId}${date}`, secretKey).toString().slice(0, 6); // Taking the first 6 characters for brevity
    
        return `https://q-roll-call.vercel.app/AttendanceForm?classId=${classId}&hash=${hash}`;
    }
    
    useEffect(() => {
        // Reset the QR state when the activeClass changes
        setShowQR(false);
        setQRURL('');
        setSearchTerm('');
        setActiveDropdown(null); 
    
        const fetchStudentsData = async () => {
            if (activeClass && activeTab === 'data') {
                const db = firebase.firestore();
                const studentsRef = db.collection('classes').doc(activeClass.id).collection('students');
                const snapshot = await studentsRef.get();
    
                const studentsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setStudentsData(studentsArray);
            }
        };
    
        fetchStudentsData();
    }, [activeClass, activeTab]);
    
    const renderTabContent = () => {
        switch (activeTab) {
            case 'attendance':
                return (
                    <div className="flex flex-grow items-center justify-center">
                        {showQR ? (
                            <QRCode value={qrURL} size={240} />
                        ) : (
                            <button onClick={() => {
                                setQRURL(generateDailyURL(activeClass.id));
                                setShowQR(true);
                            }} className="w-48 h-48 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center text-2xl">
                                Create QR Code
                            </button>
                        )}
                    </div>
                );
            case 'data':
                return (
                    <div>
                        {/* Search bar */}
                        <div className="mb-4">
                            <input 
                                type="text" 
                                placeholder="Search for a student..." 
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        {/* Table */}
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-300">Name</th>
                                    <th className="px-6 py-3 border-b border-gray-300">Section</th>
                                    <th className="px-6 py-3 border-b border-gray-300">Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student.id}>
                                        <td className="px-6 py-4 border-b border-gray-300">{student.lastName}, {student.firstName}</td>
                                        <td className="px-6 py-4 border-b border-gray-300">{student.section}</td>
                                        <td className="px-6 py-4 border-b border-gray-300">
                                            <button 
                                                onClick={() => setActiveDropdown(activeDropdown === student.id ? null : student.id)}
                                                className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out"
                                            >
                                                View {activeDropdown === student.id ? '▲' : '▼'}
                                            </button>
                                            {activeDropdown === student.id && (
                                                <div className="mt-2">
                                                    {student.records.map(recordDate => (
                                                        <div key={recordDate}>{recordDate}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!isOpen || !activeClass) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative flex flex-col bg-white p-8 rounded-lg w-4/5 h-4/5 max-w-2xl max-h-2xl overflow-hidden">
                <button onClick={handleDeleteClass} className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out">Delete Class</button>
                <h2 className="text-2xl mb-4 font-bold text-center">{activeClass.name}</h2>
                <div className="justify-center flex mb-4 space-x-2">
                    <button 
                        className={`px-4 py-2 ${activeTab === 'attendance' ? 'bg-gray-500' : 'bg-gray-300'} text-white rounded hover:bg-gray-600 transition duration-300 ease-in-out`} 
                        onClick={() => onTabChange('attendance')}
                    >
                        Take Attendance
                    </button>
                    <button 
                        className={`px-4 py-2 ${activeTab === 'data' ? 'bg-gray-500' : 'bg-gray-300'} text-white rounded hover:bg-gray-600 transition duration-300 ease-in-out`} 
                        onClick={() => onTabChange('data')}
                    >
                        View Data
                    </button>
                </div>
                <div className="flex-grow mt-4 overflow-y-auto">
                    {renderTabContent()}
                </div>
                <button onClick={onClose} className="px-4 py-2 mt-4 bg-gray-300 text-black rounded hover:bg-gray-400 transition duration-300 ease-in-out block mx-auto self-end">Close</button>
            </div>
        </div>
    );
}

export default ClassDetailsModal;
