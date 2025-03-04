"use client";

import { useState, useEffect } from 'react';
import { FiWifi, FiShield, FiAlertTriangle, FiClock, FiMoreVertical, FiSearch } from 'react-icons/fi';

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

interface DeviceListProps {
  devices: Device[];
  onScan?: () => void;
}

export default function DeviceList({ devices, onScan }: DeviceListProps) {
  const [filter, setFilter] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredDevices = filter === 'all' 
    ? devices 
    : devices.filter(device => device.status === filter);

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    setShowDeviceDetails(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <FiWifi className="text-green-500" />;
      case 'warning':
        return <FiAlertTriangle className="text-yellow-500" />;
      case 'critical':
        return <FiAlertTriangle className="text-red-500" />;
      default:
        return <FiWifi className="text-gray-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getRiskClass = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Connected Devices</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === 'all' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('normal')}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === 'normal' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Normal
          </button>
          <button 
            onClick={() => setFilter('warning')}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === 'warning' 
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Warning
          </button>
          <button 
            onClick={() => setFilter('critical')}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === 'critical' 
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Critical
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Device</th>
              <th className="px-4 py-3 text-left">IP Address</th>
              <th className="px-4 py-3 text-left">MAC Address</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Risk Level</th>
              <th className="px-4 py-3 text-left">Last Active</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredDevices.map((device) => (
              <tr 
                key={device.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer"
                onClick={() => handleDeviceClick(device)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {getStatusIcon(device.status)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{device.name}</p>
                      <p className="text-xs text-gray-500">{device.manufacturer}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{device.ip}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{device.mac}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(device.status)}`}>
                    {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-medium ${getRiskClass(device.risk)}`}>
                    {device.risk.charAt(0).toUpperCase() + device.risk.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <FiClock className="mr-1 text-gray-400" size={14} />
                    {isClient ? new Date(device.lastActive).toLocaleTimeString() : ''}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <FiMoreVertical className="text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showDeviceDetails && selectedDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                <span className="text-blue-600 dark:text-blue-400">Sidemen Security</span> - Device Details
              </h2>
              <button 
                onClick={() => setShowDeviceDetails(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <span className="text-gray-500">×</span>
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  {getStatusIcon(selectedDevice.status)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{selectedDevice.name}</h3>
                  <p className="text-sm text-gray-500">{selectedDevice.manufacturer}</p>
                </div>
                <div className="ml-auto">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(selectedDevice.status)}`}>
                    {selectedDevice.status.charAt(0).toUpperCase() + selectedDevice.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">IP Address</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedDevice.ip}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">MAC Address</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedDevice.mac}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Device Type</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedDevice.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Risk Level</p>
                  <p className={`text-sm font-medium ${getRiskClass(selectedDevice.risk)}`}>
                    {selectedDevice.risk.charAt(0).toUpperCase() + selectedDevice.risk.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Last Active</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {new Date(selectedDevice.lastActive).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Security Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Firmware</span>
                    <span className="text-xs font-medium text-green-500">Up to date</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Authentication</span>
                    <span className="text-xs font-medium text-green-500">Verified</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Encryption</span>
                    <span className="text-xs font-medium text-green-500">AES-256</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Blockchain ID</span>
                    <span className="text-xs font-medium text-gray-800 dark:text-white">0x7F3a...9B2d</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Actions</h4>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    Isolate Device
                  </button>
                  <button className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                    Run Security Scan
                  </button>
                  <button className="px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700">
                    Update Firmware
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 