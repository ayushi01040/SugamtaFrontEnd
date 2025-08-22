export default function Sidebar() {
  const menuItems = [
    "Dashboard",
    "My Plans",
    "Secondary Clients",
    "Providers",
    "Agency Details",
    "Invoices",
    "Profile",
  ];

  return (
    <aside className="h-screen bg-slate-900 text-white w-64 flex flex-col">
      <div className="p-4 text-2xl font-bold">Sugamta</div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item, i) => (
            <li key={i} className="px-4 py-2 hover:bg-slate-800 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
