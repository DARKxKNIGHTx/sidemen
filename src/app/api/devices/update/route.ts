import { NextResponse } from 'next/server';

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

// Initial dummy device data
const initialDevice: Device = {
  id: "dev-00e04c680001",
  name: "MacBook Pro",
  ip: "192.168.1.105",
  mac: "00:E0:4C:68:00:01",
  status: "normal",
  lastActive: new Date().toISOString(),
  type: "Computer",
  manufacturer: "Apple Inc.",
  risk: "low"
};

export async function POST(request: Request) {
  try {
    console.log('Received update request');
    const { deviceId, status, risk, device: inputDevice } = await request.json();
    console.log('Update params:', { deviceId, status, risk, inputDevice });

    let baseDevice: Device;

    // Check if this is the dummy device or a scanned device
    if (deviceId === initialDevice.id) {
      baseDevice = initialDevice;
    } else if (inputDevice) {
      // For scanned devices, use the provided device data
      baseDevice = inputDevice;
    } else {
      console.error('Device not found and no device data provided:', deviceId);
      return NextResponse.json(
        { error: 'Device not found' },
        { status: 404 }
      );
    }

    // Create updated device
    const updatedDevice: Device = {
      ...baseDevice,
      status,
      risk,
      lastActive: new Date().toISOString()
    };

    console.log('Updated device:', updatedDevice);

    return NextResponse.json({ 
      success: true,
      device: updatedDevice
    });
  } catch (error) {
    console.error('Detailed error updating device:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update device status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 