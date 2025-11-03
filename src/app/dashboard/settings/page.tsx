"use client";

export default function SettingsPage() {
  return (
    <main
      className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white 
                 transition-all duration-300 
                 ml-0 sm:ml-10 md:ml-20 px-4 sm:px-8 md:px-16"
    >
      {/* 🔹 Header */}
      <div className="mt-20 mb-10 sm:mb-12 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Account Settings
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base md:text-lg max-w-2xl mx-auto md:mx-0">
          Update your preferences, password, and notification settings.
        </p>
      </div>

      {/* 🔹 Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl mx-auto pb-20">
        {/* Security */}
        <div
          className="flex flex-col justify-between bg-white/10 border border-white/10 rounded-2xl 
                     p-5 sm:p-6 md:p-8 shadow-md hover:shadow-violet-600/30 hover:-translate-y-1 
                     transition-all duration-300 text-center md:text-left"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-violet-400 mb-2">🔐 Security</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Change your password and enable 2-step verification.
            </p>
          </div>
          <button
            className="mt-4 w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-violet-500 hover:shadow-lg hover:shadow-violet-500/30 
                       text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300"
          >
            Manage Security
          </button>
        </div>

        {/* Notifications */}
        <div
          className="flex flex-col justify-between bg-white/10 border border-white/10 rounded-2xl 
                     p-5 sm:p-6 md:p-8 shadow-md hover:shadow-violet-600/30 hover:-translate-y-1 
                     transition-all duration-300 text-center md:text-left"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-violet-400 mb-2">📩 Notifications</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Control how you receive updates and reminders.
            </p>
          </div>
          <button
            className="mt-4 w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-violet-500 hover:shadow-lg hover:shadow-violet-500/30 
                       text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300"
          >
            Edit Notifications
          </button>
        </div>

        {/* Appearance */}
        <div
          className="flex flex-col justify-between bg-white/10 border border-white/10 rounded-2xl 
                     p-5 sm:p-6 md:p-8 shadow-md hover:shadow-violet-600/30 hover:-translate-y-1 
                     transition-all duration-300 text-center md:text-left"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-violet-400 mb-2">🎨 Appearance</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Switch between light and dark mode themes.
            </p>
          </div>
          <button
            className="mt-4 w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-violet-500 hover:shadow-lg hover:shadow-violet-500/30 
                       text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300"
          >
            Customize Theme
          </button>
        </div>

        {/* Data */}
        <div
          className="flex flex-col justify-between bg-white/10 border border-white/10 rounded-2xl 
                     p-5 sm:p-6 md:p-8 shadow-md hover:shadow-red-600/30 hover:-translate-y-1 
                     transition-all duration-300 text-center md:text-left"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-red-400 mb-2">💾 Data</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              View or delete your account data securely.
            </p>
          </div>
          <button
            className="mt-4 w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-700 hover:shadow-lg hover:shadow-red-600/40 
                       text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300"
          >
            Manage Data
          </button>
        </div>
      </div>
    </main>
  );
}
