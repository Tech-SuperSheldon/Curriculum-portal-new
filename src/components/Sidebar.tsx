"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User, BookOpen, Settings, Shield } from "lucide-react"; // ✅ Added Shield for admin icon

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  // ✅ Allowed admin Gmail accounts
  const adminEmails = [
    "admin@supersheldon.com",
    "hello.supersheldon@gmail.com",
    "teacher@example.com",
  ];

  // Auto collapse when visiting Curriculum
  useEffect(() => {
    if (pathname === "/dashboard/curriculum") {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }

    // ✅ Load user email from sessionStorage (set at login)
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, [pathname]);

  // Default sidebar items
  const items = [
    { name: "Profile", path: "/dashboard/profile", icon: <User size={18} /> },
    { name: "Curriculum", path: "/dashboard/curriculum", icon: <BookOpen size={18} /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={18} /> },
  ];

  // ✅ Add Admin Portal only if user email is authorized
  if (email && adminEmails.includes(email)) {
    items.push({
      name: "Admin Portal",
      path: "/dashboard/admin",
      icon: <Shield size={18} />,
    });
  }

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {items.map((item) => (
        <button
          key={item.path}
          onClick={() => router.push(item.path)}
          className={`sidebar-btn ${pathname === item.path ? "active" : ""}`}
          data-label={item.name}
        >
          <span className="icon">{item.icon}</span>
          {!collapsed && <span className="label">{item.name}</span>}
        </button>
      ))}
    </aside>
  );
}
