import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Layout, Palette, Info } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  description: string;
  projects: string[];
}

interface Category {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Programming');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
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

  const categories: Category[] = [
    {
      name: 'Programming',
      icon: <Code2 className="w-5 h-5" />,
      skills: [
        {
          name: 'Java',
          level: 85,
          icon: <span className="text-red-500">☕</span>,
          description: 'Object-oriented programming and application development',
          projects: ['Task Management System', 'Student Database Application']
        },
        {
          name: 'Python',
          level: 80,
          icon: <span className="text-blue-500">🐍</span>,
          description: 'Data analysis and automation scripting',
          projects: ['Data Visualization Tool', 'Web Scraping Application']
        }
      ]
    },
    {
      name: 'Frontend',
      icon: <Layout className="w-5 h-5" />,
      skills: [
        {
          name: 'HTML',
          level: 90,
          icon: <span className="text-orange-500">🌐</span>,
          description: 'Semantic markup and accessibility',
          projects: ['Portfolio Website', 'E-commerce UI']
        },
        {
          name: 'CSS',
          level: 85,
          icon: <span className="text-blue-500">🎨</span>,
          description: 'Responsive design and animations',
          projects: ['Interactive Dashboard', 'Mobile-First Layouts']
        },
        {
          name: 'Bootstrap',
          level: 80,
          icon: <span className="text-purple-500">🅱️</span>,
          description: 'Rapid prototyping and responsive frameworks',
          projects: ['Admin Dashboard', 'Landing Pages']
        },
        {
          name: 'Java Script',
          level: 80,
          icon: <span className="text-purple-500">🅱️</span>,
          description: 'Rapid prototyping and responsive frameworks',
          projects: ['Admin Dashboard', 'Landing Pages']
        },
        
      ]
    },
    {
      name: 'UI/UX & Tools',
      icon: <Palette className="w-5 h-5" />,
      skills: [
        {
          name: 'Figma',
          level: 75,
          icon: <span>🎯</span>,
          description: 'UI design and prototyping',
          projects: ['Mobile App Design', 'Website Wireframes']
        },
        {
          name: 'Adobe Illustrator',
          level: 70,
          icon: <span>🎨</span>,
          description: 'Vector graphics and logo design',
          projects: ['Brand Identity', 'Icon Sets']
        },
        {
        name: 'Adobe Photoshop',
          level: 60,
          icon: <span>🎨</span>,
          description: 'Vector graphics and logo design',
          projects: ['Brand Identity', 'Icon Sets']
        },
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 bg-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-0 transition-opacity duration-1000"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-100">My Skills</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center px-6 py-3 rounded-full transition-all transform hover:scale-105 ${
                activeCategory === category.name
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {categories
              .find(cat => cat.name === activeCategory)
              ?.skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="relative"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{skill.icon}</span>
                        <h3 className="text-xl font-semibold text-gray-100">{skill.name}</h3>
                      </div>
                      <span className="text-blue-400 font-medium">{skill.level}%</span>
                    </div>
                    
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      />
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 right-0 -bottom-2 transform translate-y-full mt-2 p-4 bg-gray-900 rounded-lg shadow-xl z-10"
                        >
                          <p className="text-gray-300 mb-2">{skill.description}</p>
                          <div className="flex items-start">
                            <Info size={16} className="text-blue-400 mt-1 mr-2" />
                            <div>
                              <p className="text-sm text-gray-400">Related Projects:</p>
                              <ul className="list-disc list-inside text-sm text-gray-300">
                                {skill.projects.map((project, idx) => (
                                  <li key={idx}>{project}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;