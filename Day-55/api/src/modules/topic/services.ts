import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TopicI, TopicReqI } from '@/shares';

@Injectable()
export class TopicService {
  constructor(
    @Inject('TOPIC_REPOSITORY')
    private topicRepository: Repository<TopicI>,
  ) {}

  // GET all
  async get(): Promise<TopicI[]> {
    return await this.topicRepository.find();
  }

  // POST (create)
  async create(payload: TopicReqI): Promise<TopicI> {
    const newTopic: TopicI = this.topicRepository.create(payload);
    return await this.topicRepository.save(newTopic);
  }
}
