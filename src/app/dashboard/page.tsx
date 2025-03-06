"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeviceList from "../../components/dashboard/DeviceList";
import NetworkStatus from "../../components/dashboard/NetworkStatus";
import ThreatDetection from "../../components/dashboard/ThreatDetection";
import SecurityMetrics from "../../components/dashboard/SecurityMetrics";
import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";

// Import the Device interface
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

// Start with a dummy device for demonstration
const mockDevices: Device[] = [{
  id: "dev-00e04c680001",
  name: "MacBook Pro",
  ip: "192.168.1.105",
  mac: "00:E0:4C:68:00:01",
  status: "normal",
  lastActive: new Date().toISOString(),
  type: "Computer",
  manufacturer: "Apple Inc.",
  risk: "low"
}];

export default function Dashboard() {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [activeView, setActiveView] = useState("overview");
  const [isScanning, setIsScanning] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [router]);
  
  // Function to perform actual network scanning
  const scanNetwork = async () => {
    setIsScanning(true);
    window.dispatchEvent(new Event('scan-start'));
    
    try {
      const response = await fetch('/api/network/scan');
      const data = await response.json();
      //pew pew pew
      if (response.ok) {
        setDevices(data.devices);
      } else {
        console.error('Failed to scan network:', data.error);
      }
    } catch (error) {
      console.error('Network scan failed:', error);
    } finally {
      setIsScanning(false);
      window.dispatchEvent(new Event('scan-end'));
      window.dispatchEvent(new Event('network-scan'));
    }
  };

  const handleDeviceUpdate = (updatedDevices: Device[]) => {
    console.log('Updating devices in dashboard:', updatedDevices);
    setDevices(updatedDevices);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    
    // Clear the authentication cookie
    document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    
    // Redirect to login page
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onScan={scanNetwork} isScanning={isScanning} onLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Sidemen Security Dashboard
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <NetworkStatus devices={devices} />
            <ThreatDetection devices={devices} />
            <SecurityMetrics devices={devices} />
          </div>
          
          <DeviceList devices={devices} onDeviceUpdate={handleDeviceUpdate} />
        </main>
      </div>
    </div>
  );
} 