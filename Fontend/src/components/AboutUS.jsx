import React from "react";

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 pacifico-font">
            About <span className="text-[#FFA100]">LuxeStay</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Welcome to LuxeStay – your destination for luxury, comfort, and unforgettable hospitality experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="/img/crouserImg1.jpg"
              alt="Hotel"
              className="rounded-2xl shadow-lg"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h3>
            <p className="text-gray-600 mb-4">
              LuxeStay was founded with a vision to create a boutique hospitality experience that blends world-class service
              with modern amenities and a touch of local charm.
            </p>
            <p className="text-gray-600 mb-4">
              Whether you're traveling for business or leisure, we promise a relaxing stay in beautifully designed rooms,
              delicious cuisine, and personalized service.
            </p>
            <p className="text-gray-600">
              Our team works around the clock to ensure your comfort, safety, and satisfaction. We believe that a great stay
              begins with attention to detail and ends with lasting memories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
