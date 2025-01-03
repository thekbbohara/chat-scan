import axios from "axios";
import { type AuthorDetails, type Snippet } from "../types/youtube.js";

export const getLiveChatMessages = async (
  liveChatId: string,
  pagetoken?: string,
) => {
  const { YOUTUBE_API_KEY } =
    process.env ?? "AIzaSyB5p-Kc-nZEg8yIm9Uv4jHUoYr_v4ghQ9Y";
  console.log(YOUTUBE_API_KEY);
  if (!YOUTUBE_API_KEY) console.log("Undefined YOUTUBE_API_KEY");
  let url = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&key=${YOUTUBE_API_KEY}`;
  if (pagetoken) {
    url += `&pageToken=${pagetoken}`;
  }
  // console.log(url);
  try {
    const { data } = await axios.get(url);
    const { nextPageToken } = data;
    const comments = data.items.map(
      (item: {
        id: string;
        authorDetails: AuthorDetails;
        snippet: Snippet;
      }) => ({
        id: item.id,
        author: item.authorDetails.displayName,
        message: item.snippet.displayMessage,
        profileImageUrl: item.authorDetails.profileImageUrl,
      }),
    );
    // console.log(messages);
    return { nextPageToken, comments };
  } catch (error: any) {
    console.error(
      "Error fetching live chat messages:",
      error.response?.data || error.message,
    );
  }
};

const selectedComments = [];

export async function getComments(url: string, pageToken?: string) {
  const res = await getLiveChatMessages(url);
  if (!res) return;
  const { nextPageToken, comments } = res;
  // filterComment(comments)
  if (nextPageToken) {
    setTimeout(async () => {
      await getComments(url, nextPageToken);
    }, 10000);
  }
}
