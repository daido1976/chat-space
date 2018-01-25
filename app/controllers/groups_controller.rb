class GroupsController < ApplicationController

  before_action :set_group, only: [:edit, :update]

  def index
  end

  def new
    @group = Group.new
    @users = User.where.not(id:current_user.id)
  end

  def create
    @group = Group.new(group_params)
    @group.users << current_user
    if @group.save
      redirect_to :root, notice: "グループを作成しました"
    else
      render :new
    end
  end

  def edit
    @users = User.where.not(id:current_user.id)
  end

  def update
    if @group.update(group_params)
      @group.users << current_user
      redirect_to :root, notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private

  def set_group
    @group = Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:name, user_ids: [])

  end

end
