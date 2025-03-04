"use client";

import { FiHome, FiServer, FiShield, FiAlertTriangle, FiSettings, FiActivity } from 'react-icons/fi';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <FiHome size={20} /> },
    { id: 'devices', label: 'Devices', icon: <FiServer size={20} /> },
    { id: 'security', label: 'Security', icon: <FiShield size={20} /> },
    { id: 'threats', label: 'Threats', icon: <FiAlertTriangle size={20} /> },
    { id: 'monitoring', label: 'Monitoring', icon: <FiActivity size={20} /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings size={20} /> },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Sidemen Security</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">IoT Protection System</p>
      </div>
      
      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-1">
              <button
                onClick={() => setActiveView(item.id)}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeView === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            K
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Karthik M</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Network Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
} 