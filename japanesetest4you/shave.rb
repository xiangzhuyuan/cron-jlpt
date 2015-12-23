require 'mini_magick'
require 'pry'


SOURCE      = File.join(__dir__, 'img')
DESTINATION = File.join(__dir__, 'new_img')
#取得宽度和高度

images      = Dir["#{SOURCE}/**/*.jpg"]

begin
  images.each_with_index do |image, index|

    puts "handling the #{index + 1}"
    img = MiniMagick::Image.open image
    img.shave "0x#{50}" #此处表示宽度上左右各截取256个像素，高度上截取0像素
    img.write "#{DESTINATION}/#{File.basename(image)}"

  end
rescue => e
  e.message
end
