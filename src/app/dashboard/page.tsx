"use client";

export default function DashboardHome() {
  return (
    <section
      className="relative mt-10 lg:ml-40 px-4 sm:px-6 lg:pr-10 min-h-screen
      flex justify-center lg:justify-start"
    >
      <div
        className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 
        border border-white/10 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 
        backdrop-blur-sm w-full max-w-6xl min-h-screen"
      >
        {/* 🌟 Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-white drop-shadow-sm text-center lg:text-left">
          Welcome to Your Dashboard
        </h1>

        <p className="text-gray-300 text-base sm:text-lg mb-6 max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
          Manage your activities, track performance, and access your teaching or admin tools — all in one place.
        </p>

        {/* 🧩 Dashboard Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8"
        >
          {/* 📚 Curriculum */}
          <div
            className="bg-white/10 p-5 sm:p-6 rounded-xl hover:bg-white/20 transition-all 
            duration-200 shadow-md text-center lg:text-left"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              📚 Curriculum
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              View and assign course materials to your teachers and students.
            </p>
          </div>

          {/* 👩‍🏫 Teachers */}
          <div
            className="bg-white/10 p-5 sm:p-6 rounded-xl hover:bg-white/20 transition-all 
            duration-200 shadow-md text-center lg:text-left"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              👩‍🏫 Teachers
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Manage teacher accounts, schedules, and session availability.
            </p>
          </div>

          {/* 📊 Reports */}
          <div
            className="bg-white/10 p-5 sm:p-6 rounded-xl hover:bg-white/20 transition-all 
            duration-200 shadow-md text-center lg:text-left"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              📊 Reports
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Analyze performance and engagement data to improve learning outcomes.
            </p>
          </div>
        </div>

        {/* 💡 Tip Section */}
        <div className="mt-10 text-xs sm:text-sm text-gray-400 text-center lg:text-left">
          💡 Tip: Use the sidebar to navigate through modules and access detailed pages.
        </div>
      </div>
    </section>
  );
}
