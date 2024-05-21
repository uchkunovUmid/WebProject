import { setSeederFactory } from "typeorm-extension";
import { ArtistEntities } from "../../entities/artist.entities";
import path from "path";
import config from "../../config";
import fs from "fs";

export const ArtistFactory = setSeederFactory(ArtistEntities, (faker) => {
    const artist = new ArtistEntities();
    artist.artist_name = faker.commerce.productName();
    artist.description = faker.lorem.text();


    const artistImagePath = path.join(config.artistPath);
    const imageFiles = fs.readdirSync(artistImagePath);
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const randomImagePath = imageFiles[randomIndex];
        artist.artist_image = `${randomImagePath.toString()}`;


    return artist;
});
