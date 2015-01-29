class ImagesController < ApplicationController
  def index
    @images = Image.all
  end

  def create
    @image = Image.new(images_params)
    if @image.save
      render json: @image
    else
      head 500
    end
  end

  def destroy
    @image = Image.find(params[:id])
    if @image.destroy
      head 200
    else
      head 500
    end
  end

  private

  def images_params
    params.require(:image).permit(:url, :title, :username)
  end
end
