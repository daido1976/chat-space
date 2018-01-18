class GroupsController < ApplicationController

  def new
    @group = Group.new
  end

  def create
    @group.save
    redirect_to :root
  end

  def edit
  end

  def update
  end

end
