export const getImageUrl = ({ server, id, secret }) => {
    const FARM_ID = 1;

    return `https://farm${FARM_ID}.staticflickr.com/${server}/${id}_${secret}.jpg`;
};
