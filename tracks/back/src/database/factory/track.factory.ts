import {setSeederFactory} from 'typeorm-extension'
import { TrackEntities } from '../../entities/track.entities'
import { Faker } from '@faker-js/faker'

export const TrackFactory = setSeederFactory(TrackEntities,(faker:Faker) => {
			const tracks = new TrackEntities();

			tracks.track_name = faker.commerce.productName();
			tracks.track_number = faker.number.int({min:1,max:10});
			tracks.duration = faker.number.int({min:60,max:300});


			return tracks

})