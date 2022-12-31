import { AvatarImageMetadata } from "types/types";

export const AvatarWidth = 400;
export const AvatarHeight = 475;

const MiniAvatarScale = 0.2;
export const MiniAvatarWidth = AvatarWidth * MiniAvatarScale;
export const MiniAvatarHeight = AvatarHeight * MiniAvatarScale;

export const BaseAvatarImagePath = "/images/avatars";
export const AvatarImagesMetadata: Record<string, AvatarImageMetadata> = {
  accessories: { count: 13, path: `${BaseAvatarImagePath}/accessories`, alt: "accessory" },
  colors: { count: 15, path: `${BaseAvatarImagePath}/colors`, alt: "color" },
  faces: { count: 11, path: `${BaseAvatarImagePath}/faces`, alt: "face" },
};
