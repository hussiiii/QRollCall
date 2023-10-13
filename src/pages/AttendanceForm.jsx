import { useRouter } from 'next/router';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import firebase from '../../firebase'

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
    
        // Trim the leading and trailing spaces from first name and last name
        const cleanedFirstName = firstName.trim();
        const cleanedLastName = lastName.trim();
        
        try {
            const db = firebase.firestore();
            const studentsRef = db.collection('classes').doc(classId).collection('students');
    
            // Check if student already exists using the trimmed names
            const studentSnapshot = await studentsRef.where("firstName", "==", cleanedFirstName)
                                                     .where("lastName", "==", cleanedLastName)
                                                     .limit(1).get();
    
            const currentDate = new Date().toLocaleDateString(); // Only the date
    
            if (!studentSnapshot.empty) {
                // Student exists, update their record
                const studentDocRef = studentSnapshot.docs[0].ref;
                await studentDocRef.update({
                    records: firebase.firestore.FieldValue.arrayUnion(currentDate)
                });
            } else {
                // Student does not exist, add a new entry using the trimmed names
                await studentsRef.add({
                    firstName: cleanedFirstName,
                    lastName: cleanedLastName,
                    section: section,
                    records: [currentDate],
                    submittedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
    
            console.log("Attendance recorded successfully!");
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
