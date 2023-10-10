import { useRouter } from 'next/router';
import { useState } from 'react';

function AttendanceForm() {
    const router = useRouter();
    const { classId } = router.query;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [section, setSection] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle form submission logic
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-5 mt-5 bg-white rounded shadow-lg">
                <h2 className="text-2xl mb-5 font-bold text-center">Attendance Form</h2>
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
            </div>
        </div>
    );
}

export default AttendanceForm;
