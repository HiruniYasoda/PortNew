import React, { useState, useEffect } from 'react'
import Navigation from './Sections/Navigation'
import Intro from './Sections/Intro'
import Education from './Sections/Education'
import Projects from './Sections/Projects'
import TechnicalSkills from './Sections/TechSkills'
import SoftSkills from './Sections/SoftSkills'
import Achievements from './Sections/Achievements'
import Volunteering from './Sections/Volunteering'
import Contact from './Sections/Contact'
import Footer from './Sections/Footer'
import Entry from './Sections/Entry'

export default function App() {
  // 2. Create state to control visibility (starts as true)
  const [showEntry, setShowEntry] = useState(true);

  useEffect(() => {
    // 3. Set a timer to switch off the entry screen after 3 seconds (3000ms)
    const timer = setTimeout(() => {
      setShowEntry(false);
    }, 3000); // Change 3000 to whatever duration you want

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // 4. If showEntry is true, ONLY render the Entry component
  if (showEntry) {
    return <Entry />;
  }

  // 5. Otherwise, render your main App structure
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <div id="home">
          <Intro />
        </div>
        <Education />
        <Projects />
        <TechnicalSkills />
        <SoftSkills />
        <Achievements />
        <Volunteering />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}