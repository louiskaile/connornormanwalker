export type GalleryItem = {
  id: number;
  title: string;
  src?: string;
  ratio: "portrait" | "landscape" | "square";
  size?: "wide" | "standard" | "narrow";
};

const imageSources = [
  "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=960&q=84",
  "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=960&q=84",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=960&q=84",
  "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=960&q=84",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=960&q=84",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=960&q=84",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=960&q=84",
  "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=960&q=84",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=720&q=84",
  "https://images.unsplash.com/photo-1524255684952-d7185b509571?auto=format&fit=crop&w=960&q=84",
  "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=720&q=84",
];

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
  src: imageSources[index],
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
  ...baseGalleryItems.slice(0, 10).map((item) => ({
    ...item,
    id: item.id + baseGalleryItems.length,
    title: `Untitled ${String(item.id + baseGalleryItems.length).padStart(2, "0")}`,
  })),
];

export const galleryColours = [
  "#dededb",
];
