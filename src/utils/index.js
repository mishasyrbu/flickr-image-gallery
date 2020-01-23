export const getImageUrl = ({ farm = 1, server, id, secret }) =>
    `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
