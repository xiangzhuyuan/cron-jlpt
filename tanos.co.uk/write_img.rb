require 'RMagick'
include Magick

f = Image.new(100, 100) { self.background_color = "red" }

img = Image.read("caption:My very long caption which should wrap at 200pixels") do
  self.pointsize = 50
  self.font = "Tahoma"
  self.stroke = "none"
end



canvas = Magick::Image.new(300, 100) do
  self.background_color = 'yellow'
  self.font = 'default'
end

gc = Magick::Draw.new
gc.pointsize(50)
gc.text(30,70, "TEXT".center(14))

gc.draw(canvas)
canvas.write('tst.png')