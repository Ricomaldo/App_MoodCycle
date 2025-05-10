import { Model } from '@nozbe/watermelondb';
import { field, date, children } from '@nozbe/watermelondb/decorators';
import { Cycle, CyclePhase } from '@core/domain/entities/Cycle';
import DailyEntryModel from './DailyEntryModel';

export default class CycleModel extends Model {
  static table = 'cycles';

  @field('user_id') userId!: string;
  @date('start_date') startDate!: Date;
  @date('end_date') endDate?: Date;
  @field('phase') phase!: CyclePhase;
  @field('average_length') averageLength?: number;
  @field('is_current') isCurrent!: boolean;
  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;

  @children('daily_entries') entries!: DailyEntryModel[];
} 