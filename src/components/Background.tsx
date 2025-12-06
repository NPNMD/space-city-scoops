import React from 'react';
import Image from 'next/image';

const Background = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Star layers with parallax speed */}
      <div className="absolute inset-0 stars-sm opacity-50"></div>
      <div className="absolute inset-0 stars-md opacity-70"></div>
      <div className="absolute inset-0 stars-lg opacity-90"></div>
      
      {/* Floating Nebula */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 animate-float-nebula opacity-30">
         <Image 
            src="/assets/nebula.png" 
            alt="Nebula" 
            width={256} 
            height={256} 
            className="pixel-art"
        />
      </div>
       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 animate-float-nebula opacity-20" style={{ animationDelay: '5s' }}>
         <Image 
            src="/assets/nebula.png" 
            alt="Nebula" 
            width={256} 
            height={256} 
            className="pixel-art rotate-180"
        />
      </div>
    </div>
  );
};

export default Background;

