import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Dumbbell, Users, Calendar, CreditCard, BarChart2 } from "lucide-react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    // Close sidebar on route change on mobile
    setSidebarOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Dashboard", icon: <BarChart2 size={20} />, path: "/" },
    { name: "Equipment", icon: <Dumbbell size={20} />, path: "/equipment" },
    { name: "Members", icon: <Users size={20} />, path: "/members" },
    { name: "Attendance", icon: <Calendar size={20} />, path: "/attendance" },
    { name: "Payments", icon: <CreditCard size={20} />, path: "/payments" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-1.5">
                <Dumbbell size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FitTrackPro
              </h1>
            </div>
          </div>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 z-50 lg:hidden pt-16"
              >
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-3 right-3 p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                >
                  <X size={20} />
                </button>
                <nav className="p-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.path}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${
                            location.pathname === item.path
                              ? "bg-primary/10 text-primary dark:bg-primary/20"
                              : "hover:bg-surface-100 dark:hover:bg-surface-700"
                          }`}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                        : "hover:bg-surface-100 dark:hover:bg-surface-700"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;