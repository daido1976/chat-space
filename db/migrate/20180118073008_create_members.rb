class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.references :user, foreign_key: true, index: true
      # group_idにnotnull入れるとエラーになるので消しました！
      t.references :group, foreign_key: true, index: true
      t.timestamps
    end
  end
end
