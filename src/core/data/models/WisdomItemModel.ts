import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class WisdomItemModel extends Model {
  static table = 'wisdom_items';

  @field('title') title;
  @field('content') content;
  @field('category') category;
  @field('tags') tags;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
}
