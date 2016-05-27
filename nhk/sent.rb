require 'faraday'
require 'json'
require 'nokogiri'
require 'erb'
require 'yaml'
require 'pry'
require 'twitter'


BASE_HOME    = __dir__

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


send_list = IO.read(File.join(BASE_HOME, "sent_list.txt")).split(",").each do |news|
  sent_twi_with_image("#NHK check this News:", File.join(BASE_HOME, "png", "#{news}.png"))
  sleep(2)
end
