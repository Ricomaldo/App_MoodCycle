import { Model } from '@nozbe/watermelondb';
import { field, date, json, relation } from '@nozbe/watermelondb/decorators';
import { DailyEntry, MoodType } from '@core/domain/entities/Cycle';
import CycleModel from './CycleModel';

export default class DailyEntryModel extends Model {
  static table = 'daily_entries';

  @relation('cycles', 'cycle_id') cycle!: CycleModel;
  @date('date') date!: Date;
  @field('mood') mood?: MoodType;
  @json('symptoms', json => json || []) symptoms?: Array<{
    type: string;
    intensity: number;
    notes?: string;
  }>;
  @field('notes') notes?: string;
  @field('flow') flow?: number;
  @field('temperature') temperature?: number;
  @field('cervical_mucus') cervicalMucus?: 'dry' | 'sticky' | 'creamy' | 'egg-white' | 'watery';
  @field('intercourse') intercourse?: boolean;
  @field('contraception') contraception?: boolean;
} 