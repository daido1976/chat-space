class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.references :user, null: false,foreign_key: true
      # group_idにnotnull入れるとエラーになるので消しました！
      t.references :group, foreign_key: true
      t.timestamps
    end
  end
end
