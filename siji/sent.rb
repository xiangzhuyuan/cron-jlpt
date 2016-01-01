require 'twitter'


BASE_HOME = __dir__

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


def sent_twi(twi)

  begin
    twi_conn.update(twi)
    sleep(1)
  rescue Twitter::Error::Forbidden => e
    puts e.message
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

lists = []
f = File.open(File.join(__dir__, 'list.txt'), "r:UTF-8")
f.each_line do |line|
    lists << line
end
f.close

lists.sample(5).each { |item|
  sent_twi("#四字熟語 " + item)
}
