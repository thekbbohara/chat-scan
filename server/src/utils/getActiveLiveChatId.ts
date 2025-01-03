import axios from "axios";

export const getActiveLiveChatId = async (videoId: string) => {
  const { YOUTUBE_API_KEY } =
    process.env ?? "AIzaSyB5p-Kc-nZEg8yIm9Uv4jHUoYr_v4ghQ9Y";
  if (!YOUTUBE_API_KEY) console.log("Undefined YOUTUBE_API_KEY");
  const url = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
  const { data } = await axios.get(url);
  const { activeLiveChatId } = data.items[0].liveStreamingDetails;
  return activeLiveChatId;
};
// getActiveLiveChatId("jfKfPfyJRdk");
