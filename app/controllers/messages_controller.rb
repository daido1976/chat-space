class MessagesController < ApplicationController

  before_action :set_group, :set_messages, :set_members

  def index
    @message = Message.new
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      flash.now[:notice] = 'メッセージが送信されました'
      respond_to do |format|
        format.json
      end
    else
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def set_messages
    @messages = @group.messages.includes(:user)
  end

  def set_members
    @members = User.where(id:@group.user_ids)
  end

end
