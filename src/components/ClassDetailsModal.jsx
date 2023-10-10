// ClassDetailsModal.jsx
import QRCode from 'qrcode.react';
import {useState} from 'react'; 
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
  

function ClassDetailsModal({ isOpen, activeClass, activeTab, onTabChange, onClose }) {
    const [showQR, setShowQR] = useState(false);
    const [qrURL, setQRURL] = useState('');

    const generateDynamicURL = (classId) => {
        const secretKey = "YOUR_SECRET_KEY"; // Store this securely and do not expose
        const sessionId = uuidv4(); // Generate a unique UUID
        const timestamp = Date.now();

        const hash = CryptoJS.HmacSHA256(`${classId}${sessionId}${timestamp}`, secretKey).toString();

        return `https://q-roll-call.vercel.app/AttendanceForm?classId=${classId}&sessionId=${sessionId}&timestamp=${timestamp}&hash=${hash}`;
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'attendance':
                return (
                    <div className="flex flex-grow items-center justify-center">
                        {showQR ? (
                            <QRCode value={qrURL} size={240} />
                        ) : (
                            <button onClick={() => {
                                const dynamicURL = generateDynamicURL(activeClass.id);
                                setQRURL(dynamicURL);
                                setShowQR(true);
                            }} className="w-48 h-48 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center text-2xl">
                                Create QR Code
                            </button>
                        )}
                    </div>
                );
            case 'data':
                return <div>View Data Content</div>;
            default:
                return null;
        }
    };

    if (!isOpen || !activeClass) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col bg-white p-8 rounded-lg w-3/4 h-3/4 max-w-xl max-h-xl overflow-hidden">
                <h2 className="text-2xl mb-4 font-bold text-center">{activeClass.name}</h2>
                <div className="flex justify-between mb-4">
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
