require 'twitter'


def twi_conn
  begin
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['CONSUMER_KEY']
      config.consumer_secret     = ENV['CONSUMER_SECRET']
      config.access_token        = ENV['ACCESS_TOKEN']
      config.access_token_secret = ENV['ACCESS_TOKEN_SECRET']
    end
  rescue => e
    puts "Get twi conection failed with #{e.message}"
  end
end

def sent_twi_with_image(content, image_path)
  begin
    puts "#{content}->#{image_path}"
    twi_conn.update_with_media(content, File.new(image_path))
  rescue Twitter::Error::Forbidden => e
    puts e.message
  end
end

DESTINATION = File.join(__dir__, 'new_img')

images = Dir["#{DESTINATION}/**/*.jpg"]

begin
  images.sample(5).each_with_index do |image, index|

    puts "handling the #{index + 1}"
    sent_twi_with_image("#VOCABULARY Check this vocabulary, resource from: japanesetest4you.com®", image)
  end
rescue => e
  e.message
end