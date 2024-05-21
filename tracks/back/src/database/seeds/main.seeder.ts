import {Seeder, SeederFactoryManager} from "typeorm-extension";
import {DataSource} from "typeorm";
import {User} from "../../entities/user.entity";
import {ArtistEntities} from "../../entities/artist.entities";
import {TrackEntities} from "../../entities/track.entities";
import {TrackHistoryEntity} from "../../entities/track.history.entity";
import {AlbumEntities} from "../../entities/album.entities";
import {ar, faker} from "@faker-js/faker";
import * as wasi from "wasi";



export default class MainSeeder implements Seeder {
   async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userFactory =factoryManager.get(User)
        const trackFactory = factoryManager.get(TrackEntities)
       const albumFactory = factoryManager.get(AlbumEntities)
        const trackHistoryFactory = factoryManager.get(TrackHistoryEntity)
       const albumRepository =dataSource.getRepository(AlbumEntities)
        const trackRepository = dataSource.getRepository(TrackEntities)
        const trackHistoryRepository = dataSource.getRepository(TrackHistoryEntity)
      const user =  await userFactory.saveMany(2)


       const artistFactory = factoryManager.get(ArtistEntities)

     const artists =  await artistFactory.saveMany(2)

        await Promise.all(artists.map(async (artist) => {
            const albums = await albumFactory.saveMany(2,{artist:artist})
            await Promise.all(
                albums.map(async (album) => {
                    const tracks = await trackFactory.saveMany(6, { album });
                    await trackRepository.save(tracks);

                    const history = await trackHistoryFactory.saveMany(1,{
                        users:faker.helpers.arrayElement(user),
                        track:faker.helpers.arrayElement(tracks)
                    })

                    await trackHistoryRepository.save(history)

                    return;
                })
            );
            return await albumRepository.save(albums)
        }))





    }
}


