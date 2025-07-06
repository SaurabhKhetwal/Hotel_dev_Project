import React from "react";

const Restorent = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-white" style={{ backgroundImage: "url('/img/restaurant-banner.jpg')" }}>
        <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold pacifico-font">Welcome to Our Restaurant</h1>
          <p className="mt-4 text-lg md:text-xl">Experience fine dining with a cozy ambiance</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold pacifico-font">Why Choose Us</h2>
          <p className="text-gray-600 mt-2">Top-notch service and delicious meals crafted by expert chefs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img src="/img/girl102.jpg" alt="Fresh Ingredients" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-center">Fresh Ingredients</h3>
            <p className="text-gray-600 text-center mt-2">Only the best seasonal and locally-sourced ingredients.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img src="/img/girl103.jpg" alt="Expert Chefs" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-center">Expert Chefs</h3>
            <p className="text-gray-600 text-center mt-2">Our chefs bring years of experience and creativity to every dish.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img src="/img/man101.jpg" alt="Ambiance" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-center">Cozy Ambiance</h3>
            <p className="text-gray-600 text-center mt-2">Relax in a modern and comfortable dining space.</p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12 px-6 md:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold pacifico-font">Our Signature Dishes</h2>
          <p className="text-gray-600 mt-2">Taste the best dishes our chefs have to offer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img src="/img/dish1.png" alt="Dish 1" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Grilled</h3>
              <p className="text-gray-600 mt-2">Served with fresh vegetables and lemon butter sauce.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img src="/img/dish2.jpg" alt="Dish 2" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Pasta Alfredo</h3>
              <p className="text-gray-600 mt-2">Creamy alfredo sauce over perfectly cooked fettuccine.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img src="/img/dish3.png" alt="Dish 3" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Gourmet Burger</h3>
              <p className="text-gray-600 mt-2">Juicy beef patty, fresh toppings, and artisan bun.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-orange-50 py-12 px-6 md:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold">What Our Guests Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">"Absolutely loved the food and the cozy environment. Perfect place for a date night!"</p>
            <div className="mt-4 font-semibold text-right">– Riya Sharma</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">"Their grilled salmon is to die for! Staff was friendly and helpful too."</p>
            <div className="mt-4 font-semibold text-right">– Arjun Mehta</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Restorent;
