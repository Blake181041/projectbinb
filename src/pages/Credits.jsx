import React from 'react';
import Nav from '../layouts/Nav';
import { Heart, Github, Globe } from 'lucide-react';
import { motion } from 'motion/react';

const Credits = () => {
  const contributors = [
    { name: 'Blake181041', role: 'Lead Developer', link: '#' },
    { name: 'REDMONSTER', role: 'Background-Designer', link: '#' },
    { name: 'James', role: 'Ideas', link: '#' },
  ];

  return (
    <div className="min-h-screen bg-[#111827] text-gray-200">
      <Nav />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex p-3 bg-pink-500/10 rounded-full mb-4">
            <Heart className="text-pink-500" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">ProjectBinB Credits</h1>
          <p className="text-gray-400 text-lg">The amazing people and tech making this possible.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contributors.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1f2937] p-6 rounded-2xl border border-gray-700 hover:border-pink-500/50 transition-colors group"
            >
              <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-pink-400 transition-colors">{c.name}</h3>
              <p className="text-gray-400 mb-4">{c.role}</p>
              <a 
                href={c.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-pink-500 hover:text-pink-400 transition-colors"
              >
                {c.link.includes('github') ? <Github size={16} /> : <Globe size={16} />}
                Visit Project
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center p-8 bg-[#1f2937]/50 rounded-3xl border border-dashed border-gray-700"
        >
          <p className="text-gray-500 text-sm">
            Special thanks to all the open-source contributors in the web proxy community.<br/>
            ProjectBinB is built with love and focus on privacy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Credits;
