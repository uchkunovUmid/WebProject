import {setSeederFactory} from "typeorm-extension";
import {AlbumEntities} from "../../entities/album.entities";
import path from "path";
import config from "../../config";
import * as fs from "fs";

export const AlbumFactory = setSeederFactory(AlbumEntities,(faker) => {
        const album = new AlbumEntities();

        album.album_name = faker.commerce.productName()
        album.year = faker.number.int({min:2000,max:2023})
        album.album_image = faker.image.url();
        const artistImagePath = path.join(config.albumPath);
        const imageFiles = fs.readdirSync(artistImagePath);
        const randomIndex = Math.floor(Math.random() * imageFiles.length);
        const randomImagePath = imageFiles[randomIndex];
        album.album_image = `${randomImagePath.toString()}`;

        return album;

})