import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Dumbbell, Calendar, CreditCard, ArrowRight, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import MainFeature from "../components/MainFeature";

// Mock data
const mockStats = [
  { 
    id: 1, 
    title: "Active Members", 
    value: 248, 
    change: 12, 
    icon: <Users size={20} className="text-blue-500" />,
    color: "bg-blue-50 dark:bg-blue-900/20"
  },
  { 
    id: 2, 
    title: "Equipment Available", 
    value: 42, 
    change: -3, 
    icon: <Dumbbell size={20} className="text-purple-500" />,
    color: "bg-purple-50 dark:bg-purple-900/20"
  },
  { 
    id: 3, 
    title: "Today's Check-ins", 
    value: 87, 
    change: 24, 
    icon: <Calendar size={20} className="text-green-500" />,
    color: "bg-green-50 dark:bg-green-900/20"
  },
  { 
    id: 4, 
    title: "Pending Payments", 
    value: 15, 
    change: -5, 
    icon: <CreditCard size={20} className="text-red-500" />,
    color: "bg-red-50 dark:bg-red-900/20"
  }
];

const mockRecentActivity = [
  { id: 1, type: "check-in", user: "Alex Johnson", time: "2 minutes ago" },
  { id: 2, type: "payment", user: "Maria Garcia", amount: "$45.00", time: "15 minutes ago" },
  { id: 3, type: "equipment", name: "Treadmill #3", status: "maintenance", time: "1 hour ago" },
  { id: 4, type: "check-in", user: "James Wilson", time: "2 hours ago" },
  { id: 5, type: "payment", user: "Sarah Miller", amount: "$120.00", time: "3 hours ago" },
];

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-surface-500 dark:text-surface-400">
            Welcome back! Here's what's happening at your gym today.
          </p>
        </div>
        
        <div className="flex gap-2">
          <button className="btn btn-outline">
            Export Data
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <span>Quick Actions</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-surface-200 dark:border-surface-700">
        <div className="flex space-x-8">
          {["overview", "members", "equipment", "finances"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`py-2 px-1 font-medium capitalize border-b-2 transition-colors ${
                selectedTab === tab
                  ? "border-primary text-primary dark:text-primary-light"
                  : "border-transparent text-surface-500 hover:text-surface-800 dark:hover:text-surface-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {isLoading ? (
        // Loading skeleton
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockStats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: stat.id * 0.1 }}
                className="card"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div className={`flex items-center text-sm ${
                      stat.change > 0 
                        ? "text-green-500" 
                        : "text-red-500"
                    }`}>
                      {stat.change > 0 ? (
                        <TrendingUp size={16} className="mr-1" />
                      ) : (
                        <TrendingDown size={16} className="mr-1" />
                      )}
                      <span>{Math.abs(stat.change)}%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-surface-500 dark:text-surface-400">{stat.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="card lg:col-span-1">
              <div className="p-5 border-b border-surface-200 dark:border-surface-700">
                <h2 className="font-semibold text-lg">Recent Activity</h2>
              </div>
              <div className="p-5 space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === "check-in" 
                        ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400" 
                        : activity.type === "payment" 
                        ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                    }`}>
                      {activity.type === "check-in" ? (
                        <Users size={16} />
                      ) : activity.type === "payment" ? (
                        <CreditCard size={16} />
                      ) : (
                        <Dumbbell size={16} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {activity.type === "check-in" && `${activity.user} checked in`}
                        {activity.type === "payment" && `${activity.user} made a payment of ${activity.amount}`}
                        {activity.type === "equipment" && `${activity.name} marked for ${activity.status}`}
                      </p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 text-primary dark:text-primary-light hover:underline flex items-center justify-center gap-1">
                  <span>View all activity</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Main Feature */}
            <div className="lg:col-span-2">
              <MainFeature />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Home;