export const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const surroundingPostions = (x: number, y: number, size: number): [number,number][] =>{
    return [
        [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
        [x, y - 1], [x, y + 1],
        [x + 1, y - 1], [x + 1, y], [x + 1, y + 1],
    ].filter(([a, b]) => a >= 0 && b >= 0 && a < size && b < size) as [number, number][];
}
export const formatTime = (seconds:number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
}