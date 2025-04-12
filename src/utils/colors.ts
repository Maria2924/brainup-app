export const simpleStringHash = (str: string): number => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return hash;
};

export const generateHSLColorFromText = (str: string): string => {
    const hash = simpleStringHash(str);
    const hue = Math.abs(hash) % 360;
    const saturation = 50 + (Math.abs(hash >> 8) % 31);
    const lightness = 75 + (Math.abs(hash >> 16) % 16);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
