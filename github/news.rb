require 'nokogiri'
require 'net/http'
require 'uri'
require 'pry'
require 'date'
require 'imgkit'
require 'erb'
require 'faraday'
require 'json'
require 'yaml'
require 'twitter'


TODAY     = Date.today.to_s
BASE_HOME = __dir__
LANGUAGE  = ["ruby", "java", "javascript", "elixir", "python", "unknown"]
FREQUENT  = ["daily", "weekly", "monthly"]


twi_hsh = []

LANGUAGE.each do |language|
  FREQUENT.each do |frequent|
    url                                  = "https://github.com/trending/#{language}?since=#{frequent}"
    uri                                  = URI.parse(url)
    request                              = Net::HTTP::Get.new(uri)
    request["Pragma"]                    = "no-cache"
    request["Accept-Language"]           = "zh-CN,zh;q=0.8,ja;q=0.6,en-US;q=0.4,en;q=0.2"
    request["Upgrade-Insecure-Requests"] = "1"
    request["User-Agent"]                = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
    request["Accept"]                    = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    request["Referer"]                   = "https://github.com/trending/ruby?since=monthly"
    request["Cookie"]                    = "_octo=GH1.1.1854692104.1435903055; logged_in=yes; dotcom_user=xiangzhuyuan; _gh_sess=eyJzZXNzaW9uX2lkIjoiMDlkMjhlYTAwYmUxNzk1ODZjNmU1ZDA2OTUxMTBlMzUiLCJzcHlfcmVwbyI6ImpvbmRvdC9hd2Vzb21lLXJlYWN0LW5hdGl2ZSIsInNweV9yZXBvX2F0IjoxNDg2MTAwMDQ3LCJsYXN0X3dyaXRlIjoxNDg2MDk5ODk1NDQ2fQ%3D%3D--8422047dccd19f25c4c76d82962c01df517f0924; user_session=OqPqOW9CKEG3OVoClQTEfRmnBgnMi5bpzOhuQ0PkD9ZYaJ70; __Host-user_session_same_site=OqPqOW9CKEG3OVoClQTEfRmnBgnMi5bpzOhuQ0PkD9ZYaJ70; _ga=GA1.2.423066090.1435903054; tz=Asia%2FTokyo"

    req_options = {
        use_ssl: uri.scheme == "https",
    }

    begin
      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end

    rescue => e
      puts e.message
    end

    begin
      @doc = Nokogiri::HTML(response.body)

    rescue => e
      puts e.message
    end

    language = "all language" if language == ""
    title    = "#{TODAY}'s #{frequent} #{language} TOP 5 trending"

    content = @doc.css(".list-item")[0..5].to_s

    renderer = ERB.new(File.read(File.join(BASE_HOME, "template.html.erb")))

    result = renderer.result(binding)

    html_file = File.join(BASE_HOME, "/html/", "#{TODAY}_#{language}_#{frequent}.html")
    img_file  = File.join(BASE_HOME, "/img/", "#{TODAY}_#{language}_#{frequent}.png")

    File.open(html_file, 'w:UTF-8') do |f|
      puts "Start write #{html_file} start"
      f.write(result)
      puts "done"
    end


    kit = IMGKit.new(File.new(html_file), :width => 500)
    kit.to_file(img_file)

    twi_hsh << {
        content: "#{title}, check more detail here #{url}",
        img:     img_file
    }
  end
end


# twit

def twi_conn
  begin
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "btG5JPLEdRzmv43L7fxwdeb3e" #ENV['CONSUMER_KEY']
      config.consumer_secret     = "ZPn8NhNdNF1axi6j5KfHD35hkIwlC2GmDvhfhBmooj2beJAz10" #ENV['CONSUMER_SECRET']
      config.access_token        = "791502039096266752-NTu3mI7MW5In04srg8n0IunlYddBvbG" #ENV['ACCESS_TOKEN']
      config.access_token_secret = "3ZeHqVsIsl73ykE0BuUmt6hNnvkf38wGHVkruwdLCymMd" #ENV['ACCESS_TOKEN_SECRET']
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

twi_hsh.each do |twi|
  sent_twi_with_image("#{twi[:content]}", twi[:img])
  sleep 1
end
