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

export const getVideoID = (url: string) => {
  if (!url) {
    throw new Error("URL is required");
  }
  const rex = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return rex[2] !== undefined ? rex[2].split(/[^0-9a-z_\-]/i)[0] : rex[0];
};
