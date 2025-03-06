
"use client";

import { FiAlertTriangle, FiShield } from 'react-icons/fi';

interface Device {
  id: string;
  name: string;
  ip: string;
  mac: string;
  status: string;
  lastActive: string;
  type: string;
  manufacturer: string;
  risk: string;
}

interface ThreatDetectionProps {
  devices: Device[];
}

export default function ThreatDetection({ devices }: ThreatDetectionProps) {
  const criticalDevices = devices.filter(device => device.status === 'critical');
  const warningDevices = devices.filter(device => device.status === 'warning');
  
  // In a real application, this data would come from your backend
  const threatData = {
    totalThreats: criticalDevices.length + warningDevices.length,
    criticalThreats: criticalDevices.length,
    warningThreats: warningDevices.length,
    blockedAttacks: 142,
    lastAttackTime: "2 hours ago",
    threatTypes: [
      { type: "MITM Attempts", count: 23 },
      { type: "Brute Force", count: 45 },
      { type: "DDoS", count: 12 },
      { type: "DNS Spoofing", count: 8 },
    ]
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Threat Detection</h2>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          threatData.totalThreats === 0 
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
            : threatData.criticalThreats > 0
              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
        }`}>
          {threatData.totalThreats === 0 
            ? "All Clear" 
            : threatData.criticalThreats > 0
              ? "Critical Threats"
              : "Warnings"
          }
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
            <FiAlertTriangle className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Critical Threats</p>
            <p className="font-semibold text-gray-800 dark:text-white">{threatData.criticalThreats}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
            <FiAlertTriangle className="text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Warnings</p>
            <p className="font-semibold text-gray-800 dark:text-white">{threatData.warningThreats}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
            <FiShield className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Blocked Attacks</p>
            <p className="font-semibold text-gray-800 dark:text-white">{threatData.blockedAttacks}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
            <FiShield className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Last Scan</p>
            <p className="font-semibold text-gray-800 dark:text-white">{threatData.lastAttackTime}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Threat Types</h3>
        <div className="space-y-2">
          {threatData.threatTypes.map((threat, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">{threat.type}</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${(threat.count / threatData.blockedAttacks) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-800 dark:text-white">{threat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 