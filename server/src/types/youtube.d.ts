export type AuthorDetails = {
  channelId: string;
  channelUrl: string;
  displayName: string;
  profileImageUrl: string;
  isVerified: boolean;
  isChatOwner: boolean;
  isChatSponsor: boolean;
  isChatModerator: boolean;
};
export type Snippet = {
  type: "textMessageEvent";
  liveChatId: string;
  authorChannelId: string;
  publishedAt: Date;
  hasDisplayContent: boolean;
  displayMessage: string;
  textMessageDetails: {
    messageText: string;
  };
};

export type Comment = {
  id: string;
  author: string;
  message: string;
  profileImageUrl: string;
};
