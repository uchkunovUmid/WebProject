import {setSeederFactory} from "typeorm-extension";
import {TrackHistoryEntity} from "../../entities/track.history.entity";

export const TrackHistoryFactory = setSeederFactory(TrackHistoryEntity,(faker) => {
    const trackHistory = new TrackHistoryEntity()
     trackHistory.userId = faker.number.int({ min: 1, max: 5 });
     trackHistory.trackId = faker.number.int({ min: 1, max: 7 });
     trackHistory.datetime = faker.date.recent().toString()
    return trackHistory
})