import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Courses from './components/Courses';
import Register from './components/Register';
import Contribution from './components/Contribution';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Founders from './components/Founders';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleOpenModal = (courseName) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen font-sans selection:bg-brand-pink/30 selection:text-brand-pink transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Courses onEnquireClick={handleOpenModal} />
        <Contribution />
        <Gallery />
        <Testimonials />
        <Founders />
        <Contact />
      </main>
      <Footer />

      {/* Course Registration Modal Popup */}
      {isModalOpen && (
        <Register 
          isModal={true} 
          selectedCourse={selectedCourse} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

