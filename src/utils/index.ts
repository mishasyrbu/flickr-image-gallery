export const getImageUrl = (farm: number, server: string, id: string, secret: string): string =>
    `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
