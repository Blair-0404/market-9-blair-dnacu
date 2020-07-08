export const convertTimeFormatter = (sec) => {
    const minutes = Math.floor(sec / 60).toString().padStart(2, '0');
    const seconds = (sec % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`
};