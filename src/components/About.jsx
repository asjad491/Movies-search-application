import React from 'react';

const About = () => {
  return (
    <div className="sm:flex mt-20 items-center max-w-screen-xl">
    <div className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png"/>
        </div>
    </div>
    <div className="sm:w-1/2 p-5">
        <div className="text">
            <h2 className="my-4 font-bold text-3xl text-white sm:text-4xl ">About <span className="text-indigo-500">This Project:</span>
            </h2>
            <p className="text-gray-300 text-lg">
            Movie Maze is a dynamic movie search application built using React.js and Tailwind CSS. It allows users to search for movies and TV shows, browse through detailed information. The app features a responsive design, ensuring a seamless experience across devices, and integrates with The Movie Database (TMDb) API for real-time data. For those interested in exploring the code or contributing to the project, the source code is available on GitHub.
            </p>
        </div>
    </div>
</div>
  );
};

export default About;
