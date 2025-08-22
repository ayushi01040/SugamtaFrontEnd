// import { NavLink } from "react-router-dom";

// const Item = ({ to, children }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       "block px-3 py-2 rounded-xl text-sm " +
//       (isActive
//         ? "bg-blue-600 text-white"
//         : "text-slate-200 hover:bg-slate-700/60")
//     }
//   >
//     {children}
//   </NavLink>
// );

// export default function Sidebar() {
//   return (
//     <aside className="h-full w-64 bg-slate-800 text-slate-100 flex flex-col">
//       <div className="px-4 py-4 border-b border-slate-700">
//         <div className="flex items-center gap-2">
//           <div className="size-7 rounded-lg bg-blue-600 grid place-items-center text-white font-bold">S</div>
//           <div>
//             <div className="font-semibold">Sugamta</div>
//             <div className="text-xs text-blue-300">SuperAdmin</div>
//           </div>
//         </div>
//       </div>

//       <nav className="p-3 space-y-1">
//         <Item to="/dashboard">Dashboard</Item>
//         <Item to="/clients">Clients</Item>
//         <Item to="/services">Services</Item>
//         <Item to="/profile">Profile</Item>
//         <Item to="/logout">Logout</Item>
//       </nav>

//       <div className="mt-auto p-3 text-xs text-slate-400">v1.0</div>
//     </aside>
//   );
// }

import { NavLink } from "react-router-dom";

const Item = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "block px-3 py-2 rounded-xl text-sm " +
      (isActive
        ? "bg-blue-600 text-white"
        : "text-slate-200 hover:bg-slate-700/60")
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="h-full w-64 bg-slate-800 text-slate-100 flex flex-col">
      <div className="px-4 py-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-blue-600 grid place-items-center text-white font-bold">S</div>
          <div>
            <div className="font-semibold">Sugamta</div>
            <div className="text-xs text-blue-300">SuperAdmin</div>
          </div>
        </div>
      </div>

      <nav className="p-3 space-y-1">
        <Item to="/admin/dashboard">Dashboard</Item>
        <Item to="/admin/clients">Clients</Item>
        <Item to="/admin/services">Services</Item>
        <Item to="/admin/profile">Profile</Item>
        <Item to="/admin/logout">Logout</Item>
      </nav>

      <div className="mt-auto p-3 text-xs text-slate-400">v1.0</div>
    </aside>
  );
}
