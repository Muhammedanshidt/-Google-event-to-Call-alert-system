export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 p-8 bg-white rounded-2xl shadow-xl max-w-lg">
        <h1 className="text-3xl font-bold text-gray-900">
          📞 Calendar Call Reminder
        </h1>

        <p className="text-gray-600">
          Never miss a meeting again.  
          We call you automatically 5 minutes before every Google Calendar event.
        </p>


        <div className="space-y-4">
          <a
            href='/login'
            className="inline-block w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
        Start

          </a>

          {/* <p className="text-xs text-gray-400">
            Secure Google OAuth • No passwords stored
          </p> */}
        </div>
      </div>
    </div>
  );
}
