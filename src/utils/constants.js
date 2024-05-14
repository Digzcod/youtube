
const GOOGLE_API_KEY = "AIzaSyCnqZg2FWmkaeRqmBaGUsRtiWas-dPawaI"

export const YOUTUBE_API_URL = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=AU&key="+ GOOGLE_API_KEY;

console.log(YOUTUBE_API_URL)

//auto complete search r
export const YT_AUTOCOMPLETE_SEARCH_QUERY_API = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='


export const  VIDEO_SNIPPET_YT = '&type=video&part=snippet'
export const YOUTUBE_SEARCH_RESULT_API =`https://youtube.googleapis.com/youtube/v3/search?key=${GOOGLE_API_KEY}&q=`


