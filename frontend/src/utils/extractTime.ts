export function extractTime(dateString: string): string{
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`
}

function padZero(number: number) : string{
    return number.toString().padStart(2, "0");
}