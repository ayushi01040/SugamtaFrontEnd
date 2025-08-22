export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <div>
        <h1 className="text-xl font-bold">Hello, Ayushi</h1>
        <p className="text-sm text-gray-500">
          Member ID #123456 | Last Login: April 24, 2024
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          A
        </div>
        <span>Ayushi</span>
      </div>
    </header>
  );
}
