"use client";

import { useState, useEffect } from 'react';
import { FiWifi, FiShield, FiActivity } from 'react-icons/fi';

interface NetworkStats {
  connectedDevices: number;
  activeThreats: number;
  bandwidth: string;
  bandwidthIn: string;
  bandwidthOut: string;
  uptime: string;
  uptimeRaw: string;
  status: string;
  securityScore: number;
}

export default function NetworkStatus() {
  const [networkData, setNetworkData] = useState<NetworkStats>({
    connectedDevices: 0,
    activeThreats: 0,
    bandwidth: "0 Mbps",
    bandwidthIn: "0 Mbps",
    bandwidthOut: "0 Mbps",
    uptime: "0%",
    uptimeRaw: "unknown",
    status: "Loading",
    securityScore: 0
  });

  const fetchNetworkStats = async () => {
    try {
      const response = await fetch('/api/network/stats');
      if (response.ok) {
        const data = await response.json();
        setNetworkData(data);
      } else {
        console.error('Failed to fetch network stats');
      }
    } catch (error) {
      console.error('Error fetching network stats:', error);
    }
  };

  useEffect(() => {
    fetchNetworkStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchNetworkStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Network Status</h2>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          networkData.status === "Secure" 
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
        }`}>
          {networkData.status}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
            <FiWifi className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Connected Devices</p>
            <p className="font-semibold text-gray-800 dark:text-white">{networkData.connectedDevices}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
            <FiShield className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Active Threats</p>
            <p className="font-semibold text-gray-800 dark:text-white">{networkData.activeThreats}</p>
          </div>
        </div>
        
        <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
              <FiActivity className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Bandwidth</p>
              <div className="font-semibold text-gray-800 dark:text-white space-y-1">
                <p>{networkData.bandwidthIn.split('\n').join('\n')}</p>
                <p>{networkData.bandwidthOut.split('\n').join('\n')}</p>
              </div>
            </div>
          </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
            <FiActivity className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Uptime</p>
            <p className="font-semibold text-gray-800 dark:text-white">{networkData.uptime}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-300">Security Score</span>
          <span className="text-sm font-medium text-gray-800 dark:text-white">{networkData.securityScore}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${networkData.securityScore}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          System uptime: {networkData.uptimeRaw}
        </p>
      </div>
    </div>
  );
} 