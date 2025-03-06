import { NextResponse } from 'next/server';

// In a real application, this would interact with a database
let devices = new Map();

export async function POST(request: Request) {
  try {
    const { deviceId, status, risk } = await request.json();

    // Update device status and risk level
    // In a real application, this would update a database
    const device = devices.get(deviceId);
    if (device) {
      device.status = status;
      device.risk = risk;
      devices.set(deviceId, device);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating device:', error);
    return NextResponse.json(
      { error: 'Failed to update device status' },
      { status: 500 }
    );
  }
} 