require 'faraday'
require 'json'
require 'nokogiri'
require 'erb'
require 'yaml'
require 'pry'
require 'twitter'


BASE_HOME = "/Users/zhuyuan.xiang/workspace/cron-jlpt/nhk"
NEWS_LST = []


def twi_conn
  begin
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "A92HuuC2zgIBDbwWteMlQX3hK"
      config.consumer_secret     = "O6YLt1u3mIQOaBGw3LY91pQbpfdzpz5OdpnGyjzxkFhTmrIR26"
      config.access_token        = "143062296-A9bdsRSqe9xb6iPcuTY6xZLFhTCfozQ5zIFc6rJZ"
      config.access_token_secret = "oFAJxfhXG73Bqi8icTa4glKkGd1SErLjcMgunNV0m7i4Y"
    end
  rescue => e
    puts "Get twi conection failed with #{e.message}"
  end
end

def sent_twi_with_image(content, image_path)
  begin
    puts "#{content}->#{image_path}"
    # twi_conn.update_with_media(content, File.new(image_path))
  rescue Twitter::Error::Forbidden => e
    puts e.message
  end
end

def get_news_list
  @connection                      = Faraday.new('http://www3.nhk.or.jp/news/easy/') do |builder|
    builder.request :url_encoded
    builder.response :logger
    builder.adapter Faraday.default_adapter
  end
  @connection.headers[:user_agent] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like
 Gecko) Version/7.0.3 Safari/7046A194A Safari 6.0"

  begin
    response = @connection.get('news-list.json')
    body     = response.body.encode('utf-8', {invalid: :replace, undef: :replace, replace: ''})
    json     = JSON.parse(body)
    # puts json
    json.each do |item|
      item.each do |key, news_list|
        news_list.each do |news|
          NEWS_LST.push({
                           id:           news["news_id"],
                           ony_title:    news["title"],
                           title:        news["title_with_ruby"],
                           publish_date: news["news_publication_time"],
                           full_url:     news["news_web_url"]
                         })
        end
      end
    end
  rescue => e
    puts e.message
  end
end

def get_existed_file_list(extension)
  Dir["#{BASE_HOME}/**/*.#{extension}"].map { |item| File.basename(item, ".#{extension}") }
end

def generate_html(store_place, news_list)
  sent_list    = []
  existed_list = get_existed_file_list("html")
  begin
    news_list.each { |news|
      if !existed_list.include? news[:id]
        sent_list << news[:id]
        # read all, get each id
        web_url    = "#{news[:id]}/#{news[:id]}.html"
        response   = @connection.get(web_url)
        page       = Nokogiri::HTML(response.body)
        title      = page.css("#newstitle")
        content    = page.css("#newsarticle")
        full_post  = news[:full_url]
        only_title = news[:only_title]

        puts "start read erb, and create html file ...."
        renderer = ERB.new(File.read("index.html.erb"))
        result   = renderer.result(binding)

        html_file = "#{news[:id]}.html"

        File.open(html_file, 'w') do |f|
          puts "write #{html_file} start"
          f.write(result)
        end
      end
    }
    puts "just pick up existed random"
    sent_list << existed_list.sample(3)
  rescue => e
    puts e.message
  end
  sent_list
end


def sent_twitter(send_list)
  send_list.each do |xxx|
    content = "Read this #{xxx}"
    png     = "#{BASE_HOME}/#{xxx}.png"
    sent_twi_with_image(content, png)
    #sleep(3)
  end
end

get_news_list
sent_twitter(generate_html(BASE_HOME, NEWS_LST))

