import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Search, Plus, X, Check, AlertCircle, User, Clock, Dumbbell } from "lucide-react";
import { format } from "date-fns";

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState("attendance");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberId: "",
    memberName: "",
    checkInTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    equipmentUsed: []
  });
  const [formErrors, setFormErrors] = useState({});
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, memberId: "M001", memberName: "Alex Johnson", checkInTime: "2023-06-15T09:30", checkOutTime: "2023-06-15T11:15", equipmentUsed: ["Treadmill", "Bench Press"] },
    { id: 2, memberId: "M045", memberName: "Sarah Miller", checkInTime: "2023-06-15T10:15", checkOutTime: null, equipmentUsed: ["Rowing Machine"] },
    { id: 3, memberId: "M112", memberName: "James Wilson", checkInTime: "2023-06-15T08:00", checkOutTime: "2023-06-15T09:30", equipmentUsed: ["Squat Rack", "Dumbbells"] },
    { id: 4, memberId: "M078", memberName: "Maria Garcia", checkInTime: "2023-06-15T11:45", checkOutTime: null, equipmentUsed: ["Elliptical"] },
  ]);
  
  const [availableEquipment] = useState([
    "Treadmill", "Elliptical", "Rowing Machine", "Stationary Bike", 
    "Squat Rack", "Bench Press", "Dumbbells", "Leg Press", "Cable Machine"
  ]);
  
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };
  
  const toggleEquipment = (equipment) => {
    if (selectedEquipment.includes(equipment)) {
      setSelectedEquipment(selectedEquipment.filter(item => item !== equipment));
    } else {
      setSelectedEquipment([...selectedEquipment, equipment]);
    }
    
    setFormData({
      ...formData,
      equipmentUsed: selectedEquipment.includes(equipment) 
        ? formData.equipmentUsed.filter(item => item !== equipment)
        : [...formData.equipmentUsed, equipment]
    });
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.memberId.trim()) {
      errors.memberId = "Member ID is required";
    }
    
    if (!formData.memberName.trim()) {
      errors.memberName = "Member name is required";
    }
    
    if (!formData.checkInTime) {
      errors.checkInTime = "Check-in time is required";
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Add new attendance record
    const newRecord = {
      id: attendanceRecords.length + 1,
      memberId: formData.memberId,
      memberName: formData.memberName,
      checkInTime: formData.checkInTime,
      checkOutTime: null,
      equipmentUsed: selectedEquipment
    };
    
    setAttendanceRecords([newRecord, ...attendanceRecords]);
    
    // Reset form
    setFormData({
      memberId: "",
      memberName: "",
      checkInTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      equipmentUsed: []
    });
    setSelectedEquipment([]);
    setShowForm(false);
    
    // Show success message
    setSuccessMessage("Member checked in successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
  
  const handleCheckOut = (id) => {
    setAttendanceRecords(
      attendanceRecords.map(record => 
        record.id === id 
          ? { ...record, checkOutTime: format(new Date(), "yyyy-MM-dd'T'HH:mm") } 
          : record
      )
    );
    
    setSuccessMessage("Member checked out successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
  
  const filteredRecords = attendanceRecords.filter(record => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      record.memberName.toLowerCase().includes(query) ||
      record.memberId.toLowerCase().includes(query)
    );
  });

  return (
    <div className="card overflow-visible">
      <div className="p-5 border-b border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg">Gym Activity Tracker</h2>
          <div className="flex">
            <button
              onClick={() => setActiveTab("attendance")}
              className={`px-3 py-1 text-sm rounded-l-lg ${
                activeTab === "attendance"
                  ? "bg-primary text-white"
                  : "bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
              }`}
            >
              Attendance
            </button>
            <button
              onClick={() => setActiveTab("equipment")}
              className={`px-3 py-1 text-sm rounded-r-lg ${
                activeTab === "equipment"
                  ? "bg-primary text-white"
                  : "bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
              }`}
            >
              Equipment
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-lg bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary flex items-center gap-1 py-2"
          >
            <Plus size={16} />
            <span>Check In</span>
          </button>
        </div>
      </div>
      
      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-5 mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg flex items-center gap-2"
          >
            <Check size={18} />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Check-in Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-surface-200 dark:border-surface-700 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">New Check-in</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                >
                  <X size={18} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="memberId" className="label">
                      Member ID
                    </label>
                    <div className="relative">
                      <input
                        id="memberId"
                        name="memberId"
                        type="text"
                        value={formData.memberId}
                        onChange={handleInputChange}
                        className={`input pl-9 ${formErrors.memberId ? "border-red-500 dark:border-red-500" : ""}`}
                        placeholder="Enter member ID"
                      />
                      <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
                    </div>
                    {formErrors.memberId && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} />
                        <span>{formErrors.memberId}</span>
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="memberName" className="label">
                      Member Name
                    </label>
                    <input
                      id="memberName"
                      name="memberName"
                      type="text"
                      value={formData.memberName}
                      onChange={handleInputChange}
                      className={`input ${formErrors.memberName ? "border-red-500 dark:border-red-500" : ""}`}
                      placeholder="Enter member name"
                    />
                    {formErrors.memberName && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} />
                        <span>{formErrors.memberName}</span>
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="checkInTime" className="label">
                    Check-in Time
                  </label>
                  <div className="relative">
                    <input
                      id="checkInTime"
                      name="checkInTime"
                      type="datetime-local"
                      value={formData.checkInTime}
                      onChange={handleInputChange}
                      className={`input pl-9 ${formErrors.checkInTime ? "border-red-500 dark:border-red-500" : ""}`}
                    />
                    <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
                  </div>
                  {formErrors.checkInTime && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      <span>{formErrors.checkInTime}</span>
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="label flex items-center gap-2">
                    <Dumbbell size={16} />
                    <span>Equipment Used</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableEquipment.map((equipment) => (
                      <button
                        key={equipment}
                        type="button"
                        onClick={() => toggleEquipment(equipment)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          selectedEquipment.includes(equipment)
                            ? "bg-primary/10 border-primary text-primary dark:bg-primary/20"
                            : "border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700"
                        }`}
                      >
                        {equipment}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Check In Member
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Attendance Records */}
      <div className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-700">
                <th className="py-3 px-4 text-left font-medium text-surface-500 dark:text-surface-400">Member</th>
                <th className="py-3 px-4 text-left font-medium text-surface-500 dark:text-surface-400">Check In</th>
                <th className="py-3 px-4 text-left font-medium text-surface-500 dark:text-surface-400">Check Out</th>
                <th className="py-3 px-4 text-left font-medium text-surface-500 dark:text-surface-400">Equipment</th>
                <th className="py-3 px-4 text-right font-medium text-surface-500 dark:text-surface-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr 
                    key={record.id} 
                    className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800/50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <User size={16} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{record.memberName}</div>
                          <div className="text-xs text-surface-500 dark:text-surface-400">{record.memberId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-surface-400" />
                        <span>
                          {new Date(record.checkInTime).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {record.checkOutTime ? (
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-surface-400" />
                          <span>
                            {new Date(record.checkOutTime).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {record.equipmentUsed.map((equipment, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-100 dark:bg-surface-700"
                          >
                            {equipment}
                          </span>
                        ))}
                        {record.equipmentUsed.length === 0 && (
                          <span className="text-surface-400 text-sm">None</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {!record.checkOutTime && (
                        <button
                          onClick={() => handleCheckOut(record.id)}
                          className="btn btn-outline py-1 px-3 text-sm"
                        >
                          Check Out
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-surface-500 dark:text-surface-400">
                    {searchQuery ? (
                      <div className="flex flex-col items-center">
                        <Search size={24} className="mb-2" />
                        <p>No members found matching "{searchQuery}"</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Calendar size={24} className="mb-2" />
                        <p>No attendance records available</p>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;