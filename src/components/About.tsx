import React, { useRef, useEffect } from 'react';
import { Download } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const education = [
    {
      degree: "Master's in Computer Applications",
      institution: "KL University",
      period: "2023–2025",
      grade: "CGPA: 9.62"
    },
    {
      degree: "B.Sc. in Computer Science",
      institution: "Krishna University",
      period: "2020–2023",
      grade: "CGPA: 7.9"
    },
    {
      degree: "Intermediate",
      institution: "Sri Chaitanya Junior College",
      period: "2017–2019",
      grade: "CGPA: 9.6"
    },
    {
      degree: "10th",
      institution: "Ravindra Bharathi Public School",
      period: "2016–2017",
      grade: "CGPA: 9.0"
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-20 bg-gray-50 dark:bg-gray-900 opacity-0 transition-opacity duration-1000"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transform transition-transform hover:scale-[1.02]">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Personal Bio</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              I'm Gotham Kamala Priya, a passionate and driven software developer with a Master's degree in Computer Applications. I thrive on solving complex problems through code and designing intuitive digital experiences. As a recent graduate, I'm eager to apply my skills in Java, Python, and UI/UX design to real-world projects and grow as a versatile tech professional. My goal is to contribute meaningfully to innovative teams while continuously expanding my expertise.
            </p>
            <a 
              href="https://drive.google.com/file/d/1j6FWLY_D3KnwiarABI9tx2Fqpi0Plh2P/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-md hover:shadow-lg font-medium"
            >
              <Download size={18} className="mr-2" />
              Download Resume
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transform transition-transform hover:scale-[1.02]">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Education</h3>
            <div className="space-y-6 relative before:absolute before:left-[0.5625rem] before:top-2 before:w-[0.125rem] before:h-[calc(100%-2rem)] before:bg-blue-200 dark:before:bg-blue-900">
              {education.map((item, index) => (
                <div key={index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-blue-600 before:rounded-full before:shadow-md before:z-10">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.degree}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{item.institution}</p>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mt-1">
                    <span>{item.period}</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{item.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;