declare const transformFileData: ({ excludeElements, dir, paletteSize, replaceThreshold }: {
    excludeElements: any;
    dir: any;
    paletteSize: any;
    replaceThreshold: any;
}) => (filePath: any) => Promise<{
    updatedFileData: string;
    updates: any;
}>;
export default transformFileData;
