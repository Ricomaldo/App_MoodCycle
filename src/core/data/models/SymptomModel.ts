import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class SymptomModel extends Model {
  static table = 'symptoms';

  @field('name') name;
  @field('intensity') intensity;
  @field('notes') notes;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
}
