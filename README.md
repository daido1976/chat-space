# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|mail|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages

---

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

---

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

---

## massagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|---|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
