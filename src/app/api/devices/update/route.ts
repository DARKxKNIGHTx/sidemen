import { NextResponse } from 'next/server';

// Initialize with our dummy device
const devices = new Map([
  ["dev-00e04c680001", {
    id: "dev-00e04c680001",
    name: "MacBook Pro",
    ip: "192.168.1.105",
    mac: "00:E0:4C:68:00:01",
    status: "normal",
    lastActive: new Date().toISOString(),
    type: "Computer",
    manufacturer: "Apple Inc.",
    risk: "low"
  }]
]);

export async function POST(request: Request) {
  try {
    const { deviceId, status, risk } = await request.json();

    // Update device status and risk level
    const device = devices.get(deviceId);
    if (device) {
      device.status = status;
      device.risk = risk;
      device.lastActive = new Date().toISOString();
      devices.set(deviceId, device);

      return NextResponse.json({ 
        success: true,
        device: device // Return updated device data
      });
    } else {
      return NextResponse.json(
        { error: 'Device not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating device:', error);
    return NextResponse.json(
      { error: 'Failed to update device status' },
      { status: 500 }
    );
  }
} 