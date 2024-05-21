import path from "path";


const rootPath = path.resolve(__dirname,'..','..');

const config = {
        rootPath,
        albumPath:path.join(rootPath,'public/album'),
        artistPath:path.join(rootPath,'public/artist')
}

export default config;