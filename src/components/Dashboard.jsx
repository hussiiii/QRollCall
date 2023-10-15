import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Link from 'next/link';
import firebase from '../../firebase';
import ClassCard from '../components/ClassCard';
import AddClassModal from '../components/AddClassModal';
import ClassDetailsModal from '../components/ClassDetailsModal';

function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
    const [classes, setClasses] = useState([]);
    const [activeClass, setActiveClass] = useState(null);
    const [activeTab, setActiveTab] = useState('attendance');

    const handleAddClass = async (e) => {
        e.preventDefault();
    
        const className = e.target.className.value;
        const description = e.target.description.value;
    
        try {
            const classRef = await firebase.firestore().collection("classes").add({
                name: className,
                description: description,
                createdBy: currentUser.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
    
            const newClass = {
                id: classRef.id,
                name: className,
                description: description
            };
    
            setClasses(prevClasses => [...prevClasses, newClass]);
    
            // Reset the form fields
            e.target.reset();
    
            // Close the modal
            setIsAddClassModalOpen(false);
    
        } catch (error) {
            console.error("Error adding class: ", error);
        }
    };

    const openClassModal = (classItem) => {
        setActiveTab('attendance');
        setActiveClass(classItem);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const userClasses = await db.collection("classes")
                .where("createdBy", "==", currentUser.uid)
                .get();

            const classesArray = userClasses.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setClasses(classesArray);
        };

        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'attendance':
                return <div>Take Attendance Content</div>;
            case 'data':
                return <div>View Data Content</div>;
            default:
                return null;
        }
    };


    if (currentUser) {
        return (
            <div className="bg-orange-200 p-4 rounded-md shadow-lg m-8">
                <h2 className="text-4xl text-center font-bold text-red-700 mb-4">Dashboard</h2>
                
                <div className="flex flex-wrap">
                    {classes.map((classItem) => (
                        <ClassCard key={classItem.id} classItem={classItem} onClassClick={openClassModal} />
                    ))}
                    <div 
                        style={{ width: '240px', height: '340px' }}  // Adjusting to a fixed size
                        className="my-4 mr-4 bg-red-300 rounded-lg shadow-lg hover:bg-orange-300 transition ease-in-out duration-200 cursor-pointer flex flex-col items-center justify-center p-4 hover:shadow-xl transform hover:-translate-y-1"
                        onClick={() => setIsAddClassModalOpen(true)}
                    >
                        <div className="text-6xl mb-4 text-white">+</div>
                        <p className="text-xl font-semibold text-white">Add Class</p>
                    </div>
                </div>
                
                <AddClassModal 
                    isOpen={isAddClassModalOpen} 
                    onAddClass={handleAddClass} 
                    onClose={() => setIsAddClassModalOpen(false)} 
                />
                
                <ClassDetailsModal isOpen={isModalOpen} activeClass={activeClass} activeTab={activeTab} onTabChange={setActiveTab} onClose={() => setIsModalOpen(false) } renderTabContent={renderTabContent}/>
            </div>
        );
    } else {
        return (
            <div className="text-center mt-4">
                <Link href="/SignIn">
                    <button className="px-8 py-5 border-2 border-red-700 text-red-700 font-bold hover:bg-orange-200 rounded transition duration-300 ease-in-out m-8">
                        Sign In to View Dashboard
                    </button>
                </Link>
            </div>
        );
    }
}

export default Dashboard;
