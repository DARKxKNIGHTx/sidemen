"use client";

import { FiLock, FiCheckCircle, FiDatabase } from 'react-icons/fi';

export default function SecurityMetrics() {
  // In a real application, this data would come from your backend
  const securityData = {
    blockchainStatus: "Active",
    lastBlockTime: "2 minutes ago",
    totalTransactions: 1458,
    verifiedDevices: 12,
    encryptionStatus: "AES-256",
    zeroTrustScore: 95,
    aiDetectionStatus: "Active",
    selfHealingStatus: "Ready",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Sidemen Security</h2>
        <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          Protected
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Blockchain Protection</h3>
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
            <FiDatabase className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
              <p className="text-xs font-medium text-gray-800 dark:text-white">{securityData.blockchainStatus}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">Last Block</p>
              <p className="text-xs font-medium text-gray-800 dark:text-white">{securityData.lastBlockTime}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">Transactions</p>
              <p className="text-xs font-medium text-gray-800 dark:text-white">{securityData.totalTransactions}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Encryption Status</h3>
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
            <FiLock className="text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">Method</p>
              <p className="text-xs font-medium text-gray-800 dark:text-white">{securityData.encryptionStatus}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">Verified Devices</p>
              <p className="text-xs font-medium text-gray-800 dark:text-white">{securityData.verifiedDevices}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Zero-Trust Security</h3>
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
            <FiCheckCircle className="text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Score</p>
              <p className="text-xs font-medium text-gray-800 dark:text-white">{securityData.zeroTrustScore}%</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-green-600 h-1.5 rounded-full" 
                style={{ width: `${securityData.zeroTrustScore}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <p className="text-xs text-gray-600 dark:text-gray-400">AI Detection: {securityData.aiDetectionStatus}</p>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Self-Healing: {securityData.selfHealingStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 