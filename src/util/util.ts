// Constants for conversion factors
const MM_TO_INCH = 0.0393701;
const INCH_TO_MM = 25.4;

// Function to convert mm to inch
export function mmToInch(mm: number): number {
    return mm / MM_TO_INCH;
}

// Function to convert inch to mm
export function inchToMm(inch: number): number {
    return inch * INCH_TO_MM;
}