export const BASE_API_URL = 'https://api.flickr.com/';
export interface ApiParamsObject {
    [key: string]: string | number | undefined
}
export interface ApiParams extends ApiParamsObject {
    text?: string;
    per_page?: number;
    page?: number;
    method: string;
    safe_search: number;
    format: string;
    nojsoncallback: number;
    api_key: string;
    content_type: number;
    is_getty: number;
}
export const DEFAULT_PARAMS: ApiParams = {
    method: 'flickr.photos.search',
    safe_search: 1,
    format: 'json',
    nojsoncallback: 1,
    api_key: '15b67c2a8b4288ff1fddf5eb56655cfb',
    content_type: 1,
    is_getty: 1,
    per_page: 48,
};

export const loadPhotosApi = async (searchText: string, page: number) => {
    const params: ApiParams = { ...DEFAULT_PARAMS, text: searchText, page };
    const paramsString: string = Object.keys(params).map((key: string) => `${key}=${params[key]}`).join('&');
    
    try {
        const response = await fetch(`${BASE_API_URL}services/rest/?${paramsString}`);
        const { photos } = await response.json();

        return photos;
    } catch(error) {
        // handle error check
        console.log(error);
    }
};
