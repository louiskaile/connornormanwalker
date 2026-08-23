export type GalleryItem = {
  id: number;
  title: string;
  src?: string;
  ratio: "portrait" | "landscape" | "square";
  size?: "wide" | "standard" | "narrow";
};

const ratios: GalleryItem["ratio"][] = [
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "landscape",
  "portrait",
  "portrait",
  "landscape",
  "portrait",
  "landscape",
  "portrait",
  "square",
  "landscape",
  "portrait",
  "portrait",
  "landscape",
  "portrait",
  "landscape",
  "portrait",
  "portrait",
  "landscape",
  "portrait",
  "portrait",
  "square",
  "portrait",
  "landscape",
  "portrait",
  "landscape",
  "portrait",
];

const baseGalleryItems: GalleryItem[] = ratios.map((ratio, index) => ({
  id: index + 1,
  ratio,
  size:
    ratio === "portrait"
      ? "narrow"
      : ratio === "landscape" && [9, 14, 19, 22, 29].includes(index + 1)
        ? "wide"
        : "standard",
  title: `Untitled ${String(index + 1).padStart(2, "0")}`,
}));

export const galleryItems = [
  ...baseGalleryItems,
  ...baseGalleryItems.map((item) => ({
    ...item,
    id: item.id + baseGalleryItems.length,
    title: `Untitled ${String(item.id + baseGalleryItems.length).padStart(2, "0")}`,
  })),
];

export const galleryColours = [
  "#848383",
  "#0c7171",
  "#b1b1b1",
  "#444444",
  "#bf201f",
  "#452d28",
  "#888888",
  "#8f8f8f",
  "#dc1321",
  "#2d4739",
  "#08334c",
  "#04242c",
  "#5c2404",
  "#bcbcbc",
  "#5b3a5b",
  "#6c140e",
  "#2b2b4d",
  "#7a1111",
  "#7f7f7f",
  "#044464",
  "#713b0f",
  "#7e7e7e",
  "#8f8a7e",
  "#641412",
  "#fbe404",
  "#3b614d",
  "#524332",
  "#841218",
  "#7c7c7c",
  "#2d4739",
];
