export const readAndResizeImageFile = (
  file: File,
  maxWidth = 3000,
  outputType: "image/webp" | "image/jpeg" | "image/png" = "image/webp",
  quality: number = 0.8 // Quality param is applicable for formats like JPEG/WebP
): Promise<{ previewFile: string; newFile: File }> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const img = new Image();
      img.src = fileReader.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const scaleFactor = maxWidth / img.width;
        const width = img.width > maxWidth ? maxWidth : img.width;
        const height = scaleFactor > 1 ? img.height : img.height * scaleFactor;

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        // Generate a preview image (JPEG with 70% quality)
        const previewFile = canvas.toDataURL("image/jpeg", 0.5);

        // Convert the canvas to a Blob and then create the file with the desired type
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFile = new File(
                [blob],
                replaceExtensionWithNewType(file.name, outputType),
                {
                  type: outputType,
                  lastModified: Date.now(),
                }
              );
              resolve({ previewFile, newFile });
            } else {
              reject(new Error("Failed to convert canvas to Blob."));
            }
          },
          outputType,
          outputType === "image/jpeg" || outputType === "image/webp"
            ? quality
            : undefined // Quality for specific types
        );
      };

      img.onerror = () => reject(new Error("Failed to load image."));
    };

    fileReader.onerror = () => reject(new Error("Failed to read file."));
    fileReader.readAsDataURL(file);
  });
};

// const { previewFile, newFile } = await readAndResizeImageFile(
//     file,      // The file selected by the user
//     2000,      // Maximum width of 2000px
//     'image/jpeg', // Desired output type: JPEG
//     0.9        // Quality of 0.9 for JPEG
//   );

// Utility function to replace the file extension based on the output type
export const replaceExtensionWithNewType = (
  filename: string,
  outputType: string
) => {
  const extensionMap: { [key: string]: string } = {
    "image/webp": ".webp",
    "image/jpeg": ".jpeg",
    "image/png": ".png",
  };
  const extension = extensionMap[outputType] || ".webp"; // Default to .webp
  return filename.replace(/\.[^/.]+$/, "") + extension;
};
