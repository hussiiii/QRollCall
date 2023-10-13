import { useRouter } from 'next/router';
import { useState } from 'react';
import CryptoJS from 'crypto-js';

function AttendanceForm() {
    const router = useRouter();
    const { classId, sessionId, timestamp, hash } = router.query;
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [section, setSection] = useState('');

    const isValidURL = () => {
        const secretKey = "YOUR_SECRET_KEY";
        const date = new Date().toISOString().slice(0,10); // Format: YYYY-MM-DD
    
        const computedHash = CryptoJS.HmacSHA256(`${classId}${date}`, secretKey).toString().slice(0, 6); // Taking the first 6 characters for brevity
    
        return computedHash === hash;
    }
    

    if (!isValidURL()) {
        return (
            <div>Error: Invalid or expired URL.</div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Reference to the specific class's 'students' subcollection
            const studentRef = firebase.firestore().collection('classes').doc(classId).collection('students');
            
            // Add the new student data to Firestore
            await studentRef.add({
                firstName: firstName,
                lastName: lastName,
                section: section,
                submittedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
    
            // Optionally: Reset the form fields after successful submission
            setFirstName('');
            setLastName('');
            setSection('');
    
            setIsFormSubmitted(true);
    
        } catch (error) {
            console.error("Error recording attendance: ", error);
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-5 mt-5 bg-white rounded shadow-lg">
            <h2 className="text-2xl mb-5 font-bold text-center">Attendance Form</h2>
            
            {isFormSubmitted ? (
                <div className="text-center">
                    <p>Thank you! Attendance recorded for {new Date().toLocaleDateString()}.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">First Name</label>
                        <input 
                            type="text" 
                            required 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">Last Name</label>
                        <input 
                            type="text" 
                            required 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">Section (Optional)</label>
                        <input 
                            type="text" 
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="flex justify-center mt-5">
                        <button type="submit" className="px-5 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    </div>
    );
}

export default AttendanceForm;
