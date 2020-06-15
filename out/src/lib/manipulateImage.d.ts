declare const manipulateImage: (image: any, { dir, paletteSize, filePath, replaceThreshold }: {
    dir: any;
    paletteSize: any;
    filePath: any;
    replaceThreshold: any;
}) => Promise<(void | {
    url: any;
    fileSize: number;
} | null)[]>;
export default manipulateImage;
