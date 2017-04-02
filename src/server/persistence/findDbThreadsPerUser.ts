import {Thread} from "../../../shared/model/thread";
import * as _ from 'lodash';
import {dbThreads} from "../db-data";
export function findDbThreadsPerUser(participantId: number){
  const allThreads: Thread[] = _.values(dbThreads);
  return _.filter(
    allThreads, threads => _.includes(_.keys(allThreads), participantId.toString())
  )
}
