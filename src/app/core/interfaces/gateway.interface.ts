export interface Gateway {
    id: number;
    ip: string;
    serialNumber: string;
    gatewayName: string;
    devices: Device[];
}

interface Device {
    id: number;
    deviceId: number;
    vendor: string;
    createdDate: string;
    status: string;
}
