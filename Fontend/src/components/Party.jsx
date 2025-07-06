import React from "react";

const partyEvents = [
  {
    title: "Wedding Receptions",
    description: "Celebrate your special day with our beautifully decorated banquet halls and professional staff.",
    image: "/img/crouserImg1.jpg",
  },
  {
    title: "Birthday Parties",
    description: "Host unforgettable birthday parties with custom decoration, music, and food service.",
    image: "/img/crouserImg2.jpg",
  },
  {
    title: "Corporate Events",
    description: "We provide the perfect space and services for your business meetings, seminars, and launches.",
    image: "/img/crouserImg3.jpg",
  },
];

const Party = () => {
  return (
    <div className="py-12 px-4 md:px-10 lg:px-20 bg-gray-100">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 pacifico-font">Celebrate with Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {partyEvents.map((event, index) => (
          <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Party;
