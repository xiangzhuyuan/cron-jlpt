require 'mini_magick'
require 'pry'


SOURCE = File.join(__dir__, 'new_img')
N1     = File.join(__dir__, 'new_img', 'n1')
N2     = File.join(__dir__, 'new_img', 'n2')
N3     = File.join(__dir__, 'new_img', 'n3')
N4     = File.join(__dir__, 'new_img', 'n4')
N5     = File.join(__dir__, 'new_img', 'n5')
images = Dir["#{SOURCE}/**/*.jpg"]

begin
  images.each_with_index do |image, index|

    puts "handling the #{index + 1}"
    case File.basename image
      when /n1/
        FileUtils.cp(image, N1)
      when /n2/
        FileUtils.cp(image, N2)
      when /n3/
        FileUtils.cp(image, N3)
      when /n4/
        FileUtils.cp(image, N4)
      when /n5/
        FileUtils.cp(image, N5)
      else
        puts "no level tag, keep stay"
    end
  end
rescue => e
  e.message
end
